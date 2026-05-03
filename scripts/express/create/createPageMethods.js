const bodyParser = require('body-parser')
const render = require('json-templater/string')

const { getPinYinFirstChar } = require('../utils/utils_pinyin')

const { createFile } = require('../utils/utils_createFile.js')

const Crawler = require('crawler')
const { JSDOM } = require('jsdom')

function removeDom(dom, selector) {
  if (!dom) return
  const doms = dom.querySelectorAll(selector)
  for (let i = 0; i < doms.length; i++) {
    doms[i].parentNode.removeChild(doms[i])
  }
}

function replaceCode(dom) {
  if (!dom) return
  const doms = dom.querySelectorAll('pre')
  for (let i = 0; i < doms.length; i++) {
    const codeEl = doms[i].querySelector('code')
    if (!codeEl) continue
    const classs = codeEl.getAttribute('class') || ''
    const theClass = classs.split(' ').filter((item) => item.includes('language'))
    const type = theClass.length > 0 ? theClass[0].match(/\-(.*)/)[1] : ''
    doms[i].before(`

\`\`\`${type}
${doms[i].textContent}
\`\`\`

`)
    doms[i].parentNode.removeChild(doms[i])
  }
}

function replaceTitle(dom) {
  if (!dom) return
  const names = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']

  for (let i = 0, len = names.length; i < len; i++) {
    const doms = dom.querySelectorAll(names[i])
    const titleSymbol = new Array(i + 1)
      .fill(0)
      .map(() => '#')
      .join('')
    for (let j = 0, len2 = doms.length; j < len2; j++) {
      doms[j].before(`

${titleSymbol} ${doms[j].textContent}

            `)

      doms[j].parentNode.removeChild(doms[j])
    }
  }
}

module.exports = function (app) {
  app.post('/create/page', bodyParser.json(), (req, res) => {
    const form = req.body
    const fileName = `${getPinYinFirstChar(form.title || '文章标题')}.md`

    try {
      const outline = form.dirTag.map((item) => {
        return parseInt(item.replace(/[^0-9]/g, ''), 10)
      })
      createFile(
        `./docs${form.link}/${fileName}`,
        render(require(`./PAGE_TEMPLATE.js`), {
          title: form.title || '文章标题',
          date: form.date,
          summary: form.summary,
          top: form.top,
          dir: form.dir,
          dirTag: JSON.stringify(form.dirTag),
          valine: form.valine,
          valineId: form.valineId,
          tag: JSON.stringify(form.tag),
          password:
            form.password && form.passwordCus
              ? form.passwordCus
              : form.password,
          content: '',
          outline: JSON.stringify([
            Math.min(...outline),
            Math.max(...outline),
          ]).replace(/\"/g, ''),
        })
      )
      res.json({
        success: true,
        fileName: fileName,
      })
    } catch {
      res.json({
        success: false,
        fileName: fileName,
      })
    }
  })

  app.post('/forward/page', bodyParser.json(), (req, res) => {
    const form = req.body

    const c = new Crawler({
      maxConnections: 10,
      callback: function (error, _res, done) {
        const finish = () => {
          try {
            done()
          } catch {
            /* noop */
          }
        }

        const safeJson = (payload) => {
          if (!res.headersSent) {
            res.json(payload)
          }
          finish()
        }

        if (error) {
          console.log(error)
          safeJson({
            success: false,
            message: String(error),
          })
          return
        }

        let fileName = `${getPinYinFirstChar(form.title || '文章标题')}.md`

        try {
          const $ = _res.$
          const html = $('html').html()
          const dom = new JSDOM(html)
          const doc = dom.window.document
          const titleEl = doc.querySelector('.article-title')
          if (!titleEl) {
            safeJson({
              success: false,
              message: '无法解析文章标题',
              fileName,
            })
            return
          }
          const title = titleEl.textContent.trim()
          const artic =
            doc.querySelector('.article-content') ||
            doc.querySelector('#article-root')

          if (!artic) {
            safeJson({
              success: false,
              message: '无法解析正文容器',
              fileName,
            })
            return
          }

          removeDom(artic, 'style')
          removeDom(artic, '.copy-code-btn')
          replaceCode(artic)
          replaceTitle(artic)

          fileName = `${getPinYinFirstChar(title || '文章标题')}.md`

          const outline = form.dirTag.map((item) => {
            return parseInt(item.replace(/[^0-9]/g, ''), 10)
          })

          createFile(
            `./docs${form.link}/${fileName}`,
            render(require(`./PAGE_TEMPLATE.js`), {
              title: title || form.title || '文章标题',
              date: form.date,
              summary: form.summary,
              top: form.top,
              dir: form.dir,
              dirTag: JSON.stringify(form.dirTag),
              valine: form.valine,
              valineId: form.valineId,
              tag: JSON.stringify(form.tag),
              password:
                form.password && form.passwordCus
                  ? form.passwordCus
                  : form.password,
              content: `###### 原文 [掘金](${form.articLink})

${artic.innerHTML}`,
              outline: JSON.stringify([
                Math.min(...outline),
                Math.max(...outline),
              ]).replace(/\"/g, ''),
            })
          )

          safeJson({
            success: true,
            fileName: fileName,
          })
          console.log('create file success.')
        } catch (e) {
          console.error(e)
          safeJson({
            success: false,
            fileName: fileName,
            message: String(e),
          })
        }
      },
    })

    c.queue(form.articLink)
  })
}
