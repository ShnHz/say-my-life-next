// npm run dev -- --port 5177
// npx @playwright/cli open http://localhost:5177/views/travel/Calendar.html
// npx @playwright/cli run-code "$(cat scripts/check-travel-model.js)"
// Uses Vue's development-only setupState to check the actual camera, not copied constants.
async (page) => {
  const check = (condition, message) => { if (!condition) throw new Error(message) }
  const url = new URL('/views/travel/Calendar.html', page.url()).href
  const model = page.locator('.travel-model')
  const ready = async () => {
    await model.scrollIntoViewIfNeeded()
    await page.waitForFunction(() => {
      const el = document.querySelector('.travel-model')
      return el?.querySelector('canvas') && !el.querySelector('.model-status')
    })
  }
  const dimensions = async () => {
    await page.waitForFunction(() => document.querySelector('.travel-model')?.parentElement.style.getPropertyValue('--poster-ratio') === '400 / 500')
    return model.evaluate(el => {
      const image = el.previousElementSibling.getBoundingClientRect()
      const card = el.getBoundingClientRect()
      return { image: [image.width, image.height], card: [card.width, card.height] }
    })
  }
  const view = () => model.evaluate(el => {
    const { controls } = el.__vueParentComponent.setupState
    return { target: controls.target.toArray(), distance: controls.getDistance(), azimuth: controls.getAzimuthalAngle() }
  })
  // A non-2:3 poster verifies that the model follows the loaded image ratio.
  await page.route('**/ai-images/cnsdwh.png', route => route.fulfill({
    contentType: 'image/svg+xml',
    body: '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="500"><rect width="400" height="500" fill="#ddd"/></svg>',
  }))
  await page.goto(url)
  await ready()
  check(await model.count() === 1, 'Only Weihai should have a model')
  const desktop = await dimensions()
  check(desktop.card[1] === 250, 'Model should follow the poster aspect ratio, not a fixed 2:3')
  check(JSON.stringify(desktop.image) === JSON.stringify(desktop.card), 'Poster/model dimensions differ')

  const before = await view()
  const box = await model.boundingBox()
  await page.mouse.move(box.x + 90, box.y + 150)
  await page.mouse.down({ button: 'right' })
  await page.mouse.move(box.x + 130, box.y + 180, { steps: 4 })
  await page.mouse.up({ button: 'right' })
  check(JSON.stringify(before) === JSON.stringify(await view()), 'Right drag must not pan')
  await page.mouse.move(box.x + 90, box.y + 150)
  await page.mouse.down()
  await page.mouse.move(box.x + 140, box.y + 150, { steps: 4 })
  await page.mouse.up()
  check(Math.abs(before.azimuth - (await view()).azimuth) > 0.01, 'Left drag should rotate')
  const distance = (await view()).distance
  await page.mouse.wheel(0, -200)
  await page.waitForFunction(d => {
    return document.querySelector('.travel-model').__vueParentComponent.setupState.controls.getDistance() < d
  }, distance)

  const limits = await model.evaluate(el => {
    const { controls: c, camera } = el.__vueParentComponent.setupState
    const check = (condition, message) => { if (!condition) throw new Error(message) }
    const close = (a, b) => Math.abs(a - b) < 1e-6
    check(!c.enablePan, 'Pan must be disabled')
    check(c.minPolarAngle > 0 && c.maxPolarAngle < Math.PI / 2, 'Camera must stay above water')
    for (const radius of [1, 1e6]) {
      camera.position.copy(c.target).add(camera.position.clone().set(1, -1, 1).setLength(radius))
      c.update()
      check(close(c.getDistance(), radius === 1 ? c.minDistance : c.maxDistance), 'Zoom clamp failed')
      check(close(c.getPolarAngle(), c.maxPolarAngle), 'Lower orbit clamp failed')
    }
    camera.position.copy(c.target).add(camera.position.clone().set(0, c.minDistance, 0))
    c.update()
    check(close(c.getPolarAngle(), c.minPolarAngle), 'Upper orbit clamp failed')
    return { minDistance: c.minDistance, maxDistance: c.maxDistance, minPolarAngle: c.minPolarAngle, maxPolarAngle: c.maxPolarAngle }
  })

  await page.reload()
  await ready()
  await model.dblclick()
  await page.waitForFunction(() => document.fullscreenElement === document.querySelector('.travel-model'))
  await page.waitForFunction(() => {
    const el = document.querySelector('.travel-model')
    return el.clientWidth === innerWidth && el.clientHeight === innerHeight
  })
  await model.dblclick()
  await page.waitForFunction(() => !document.fullscreenElement)
  await page.waitForFunction(() => document.querySelector('.travel-model').clientWidth === 200)

  await page.setViewportSize({ width: 390, height: 844 })
  await ready()
  const mobile = await dimensions()
  check(JSON.stringify(mobile.image) === JSON.stringify(mobile.card), 'Mobile dimensions differ')
  await model.evaluate(el => { el.requestFullscreen = undefined })
  await model.getByRole('button', { name: '进入全屏' }).click()
  await page.waitForFunction(() => document.querySelector('.fullscreen-fallback')?.clientWidth === innerWidth)
  check(await page.evaluate(() => document.body.style.overflow === 'hidden'), 'Fallback must lock page scroll')
  await page.keyboard.press('Escape')
  check(await page.locator('.fullscreen-fallback').count() === 0, 'Escape should exit fallback')
  check(await page.evaluate(() => document.body.style.overflow !== 'hidden'), 'Fallback must restore scrolling')

  await page.route('**/models/blueways/blueways.glb', route => route.abort())
  await page.reload()
  await model.scrollIntoViewIfNeeded()
  await page.waitForFunction(() => document.querySelector('.model-status')?.textContent.includes('模型加载失败'))
  await page.unroute('**/models/blueways/blueways.glb')
  await page.unroute('**/ai-images/cnsdwh.png')
  await page.setViewportSize({ width: 1280, height: 720 })
  await page.reload()
  await ready()
  return { result: 'PASS: size, rotate, zoom, no pan, polar/distance limits, fullscreen, mobile fallback, load failure', desktop, mobile, limits }
}
