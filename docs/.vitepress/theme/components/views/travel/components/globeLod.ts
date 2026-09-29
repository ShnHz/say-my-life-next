import type { TravelPlace } from '../../../../../../public/map/js/travelPlaces'

// 七大地理分区（非行政区划）；公开分类参考：https://zhuanlan.zhihu.com/p/682732352
// 采用港澳归华南、台湾归华东的口径；按名称而非经纬度归类，避免误收邻国。
export const chinaRegions: Record<string, string[]> = {
  华北: ['北京', '天津', '河北', '山西', '内蒙古'],
  东北: ['辽宁', '吉林', '黑龙江'],
  华东: ['上海', '江苏', '浙江', '安徽', '福建', '江西', '山东', '台湾'],
  华中: ['河南', '湖北', '湖南'],
  华南: ['广东', '广西', '海南', '香港', '澳门'],
  西南: ['重庆', '四川', '贵州', '云南', '西藏'],
  西北: ['陕西', '甘肃', '青海', '宁夏', '新疆'],
}

export interface LodMarker {
  id: string
  label: string
  location: [number, number]
  size: number
  places: TravelPlace[]
  children: LodMarker[]
}

function cluster(id: string, label: string, children: LodMarker[]): LodMarker {
  const places = children.flatMap(child => child.places)
  return {
    id, label, children, places,
    location: [
      places.reduce((sum, place) => sum + place.lat!, 0) / places.length,
      places.reduce((sum, place) => sum + place.lng!, 0) / places.length,
    ],
    size: 0.02,
  }
}

export function buildLodTree(places: TravelPlace[]): LodMarker[] {
  const regions = new Map<string, Map<string, LodMarker[]>>()
  const overseas = new Map<string, LodMarker[]>()
  for (const [index, place] of places.entries()) {
    if (!Number.isFinite(place.lat) || !Number.isFinite(place.lng)
      || Math.abs(place.lat!) > 90 || Math.abs(place.lng!) > 180) continue
    const marker: LodMarker = {
      id: `place-${index}`, label: place.shortName, location: [place.lat!, place.lng!],
      size: 0.015, places: [place], children: [],
    }
    const region = Object.entries(chinaRegions).find(([, provinces]) =>
      provinces.some(province => place.name.startsWith(province)))
    if (region) {
      const province = region[1].find(province => place.name.startsWith(province))!
      if (!regions.has(region[0])) regions.set(region[0], new Map())
      const groups = regions.get(region[0])!
      groups.set(province, [...(groups.get(province) ?? []), marker])
    } else {
      // 现有海外地点以「国家 + 简称」命名；无法识别的名称独立保留，不猜国界。
      const country = place.name.endsWith(place.shortName)
        ? place.name.slice(0, -place.shortName.length) || place.name : place.name
      overseas.set(country, [...(overseas.get(country) ?? []), marker])
    }
  }
  return [
    ...Array.from(regions, ([region, provinces], index) => cluster(
      `region-${index}`, region,
      Array.from(provinces, ([province, markers], childIndex) =>
        cluster(`province-${index}-${childIndex}`, province, markers)),
    )),
    ...Array.from(overseas).flatMap(([country, markers], index) =>
      markers.length < 4 ? markers : [cluster(`overseas-${index}`, country, markers)]),
  ]
}

export function markerText(marker: LodMarker): string {
  return marker.children.length ? `${marker.label} · ${marker.places.length}` : marker.label
}

function labelWidth(marker: LodMarker): number {
  return Math.min(140, Array.from(markerText(marker)).reduce((width, char) => width + (/[^\x00-\x7F]/.test(char) ? 11 : 6.5), 14))
}

/** 在分组正面估计标签的像素密度，不随自转反复跳级；窄屏更早聚合。 */
export function selectLodMarkers(tree: LodMarker[], width: number, zoom: number): LodMarker[] {
  return tree.flatMap(node => {
    if (!node.children.length) return [node]
    const children = selectLodMarkers(node.children, width, zoom)
    if (node.places.length < 3 || children.length < 2) return children
    const pixelsPerDegree = width * 0.405 * zoom * Math.PI / 180
    const longitudeScale = Math.cos(node.location[0] * Math.PI / 180)
    // ponytail: O(n²) 足够当前百级地点；达到千级时改为空间网格索引。
    const crowded = children.filter((a, i) => children.some((b, j) => i !== j
      && Math.abs(a.location[1] - b.location[1]) * longitudeScale * pixelsPerDegree
        < (labelWidth(a) + labelWidth(b)) / 2 + 8
      && Math.abs(a.location[0] - b.location[0]) * pixelsPerDegree < 26))
    return crowded.length / children.length >= 0.35 ? [node] : children
  })
}

/** 与已安装 COBE v2 的正交投影一致，供可见性和标签避让使用。 */
export function projectMarker(location: [number, number], phi: number, theta: number, zoom: number) {
  const lat = location[0] * Math.PI / 180
  const lng = location[1] * Math.PI / 180 - Math.PI
  const x = -Math.cos(lat) * Math.cos(lng) * 0.81
  const y = Math.sin(lat) * 0.81
  const z = Math.cos(lat) * Math.sin(lng) * 0.81
  const rx = Math.cos(phi) * x + Math.sin(phi) * z
  const ry = Math.sin(phi) * Math.sin(theta) * x + Math.cos(theta) * y - Math.cos(phi) * Math.sin(theta) * z
  const depth = -Math.sin(phi) * Math.cos(theta) * x + Math.sin(theta) * y + Math.cos(phi) * Math.cos(theta) * z
  return { x: (rx * zoom + 1) / 2, y: (-ry * zoom + 1) / 2, visible: depth >= 0 || rx * rx + ry * ry >= 0.64 }
}

export function layoutLabels(markers: LodMarker[], width: number, phi: number, theta: number, zoom: number) {
  const occupied: { x: number; y: number; width: number }[] = []
  const layout: Record<string, { visible: boolean; offset: number }> = {}
  // 聚合标签优先，避免华中等区域被周边单地点标签挤掉。
  for (const marker of [...markers].sort((a, b) => b.places.length - a.places.length)) {
    const point = projectMarker(marker.location, phi, theta, zoom)
    const x = point.x * width
    const y = point.y * width - 18
    const w = labelWidth(marker)
    const offset = [0, -26, 26, -52, 52, -78, 78].find(offset =>
      x >= w / 2 && x <= width - w / 2 && y + offset >= 12 && y + offset <= width - 12
      && !occupied.some(box => Math.abs(box.x - x) < (box.width + w) / 2 + 6
        && Math.abs(box.y - y - offset) < 24))
    const visible = point.visible && offset !== undefined
    layout[marker.id] = { visible, offset: offset ?? 0 }
    if (visible) occupied.push({ x, y: y + offset!, width: w })
  }
  return layout
}
