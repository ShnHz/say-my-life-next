// Run: node scripts/test-globe-lod.cjs (uses the project's existing TypeScript dependency).
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const ts = require('typescript')
function load(file) {
  const module = { exports: {} }
  const source = fs.readFileSync(path.join(__dirname, '..', file), 'utf8')
  new Function('module', 'exports', ts.transpile(source, { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 }))(module, module.exports)
  return module.exports
}
const { buildLodTree, selectLodMarkers, projectMarker, layoutLabels, chinaRegions } = load('docs/.vitepress/theme/components/views/travel/components/globeLod.ts')
const { travelPlaces } = load('docs/public/map/js/travelPlaces.ts')
const tree = buildLodTree(travelPlaces)
const valid = travelPlaces.filter(place => Number.isFinite(place.lng) && Number.isFinite(place.lat))
const markers = selectLodMarkers(tree, 600, 1)
assert(markers.length < valid.length / 2, 'default view must substantially reduce labels')
assert(markers.some(marker => marker.label === '华东' && marker.places.length > 20))
assert(markers.some(marker => marker.label === '曼谷' && !marker.children.length), 'sparse overseas cities stay individual')
assert(markers.some(marker => marker.label === '河内' && !marker.children.length), 'three overseas places are still sparse')
assert(markers.some(marker => marker.label === '日本' && marker.children.length), 'dense overseas cities may cluster')
for (const width of [320, 600, 1000]) {
  let previousCount = 0
  for (const zoom of [1, 2, 4, 8, 12]) {
    const selected = selectLodMarkers(tree, width, zoom)
    const ids = selected.flatMap(marker => marker.places.map(place => place.id))
    assert.equal(new Set(ids).size, valid.length, 'no location may be lost or duplicated during LOD')
    assert.equal(ids.length, valid.length)
    assert(selected.length >= previousCount, 'zooming in must not reduce detail')
    previousCount = selected.length
  }
}
assert(selectLodMarkers(tree, 320, 1).length <= selectLodMarkers(tree, 1000, 1).length)
assert(selectLodMarkers(tree, 600, 12).length > markers.length)
assert.equal(new Set(Object.values(chinaRegions).flat()).size, 34)
assert.equal(buildLodTree([{ id: 'bad', name: 'bad', shortName: 'bad', lat: NaN, lng: 0 }]).length, 0)
const south = tree.find(marker => marker.label === '华南')
assert(south.places.some(place => place.shortName === '香港'))
assert(!south.places.some(place => place.name.startsWith('越南')))
const location = [30, 120]
const phi = Math.PI * 1.5 - location[1] * Math.PI / 180
const theta = location[0] * Math.PI / 180
const center = projectMarker(location, phi, theta, 1)
assert(center.visible && Math.abs(center.x - 0.5) < 1e-10 && Math.abs(center.y - 0.5) < 1e-10)
assert(!projectMarker([-30, -60], phi, theta, 1).visible)
const layout = layoutLabels(markers, 600, phi, theta, 1)
assert(Object.values(layout).some(item => item.visible))
const twins = [0, 1].map(id => ({ ...markers[0], id: String(id), location }))
const twinLayout = layoutLabels(twins, 600, phi, theta, 1)
assert(twinLayout['0'].visible && twinLayout['1'].visible)
assert.notEqual(twinLayout['0'].offset, twinLayout['1'].offset, 'coincident labels must be separated')
console.log(`LOD checks passed: ${valid.length} places → ${markers.length} default labels; ${selectLodMarkers(tree, 600, 12).length} at 12×`)
console.log(markers.map(marker => `${marker.label}(${marker.places.length})`).join(' / '))
