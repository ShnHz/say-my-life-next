export interface PolaroidItem {
  id: string
  location: [number, number]
  image: string
  caption: string
  rotate: number
}

export const polaroidMarkers: PolaroidItem[] = [
  {
    id: 'polaroid-hangzhou',
    location: [30.252333, 120.210911],
    image: '/map/polaroids/hangzhou.jpg',
    caption: '杭州',
    rotate: -4,
  },
  {
    id: 'polaroid-hanoi',
    location: [21.03438, 105.84009],
    image: '/map/polaroids/hanoi.jpg',
    caption: '河内',
    rotate: 3,
  },
  {
    id: 'polaroid-osaka',
    location: [34.694175, 135.486908],
    image: '/map/polaroids/osaka.jpg',
    caption: '大阪',
    rotate: -6,
  },
  {
    id: 'polaroid-tokyo',
    location: [35.652832, 139.652832],
    image: '/map/polaroids/tokyo.jpg',
    caption: '东京',
    rotate: 5,
  },
  {
    id: 'polaroid-singapore',
    location: [1.290765, 103.842037],
    image: '/map/polaroids/singapore.jpg',
    caption: '新加坡',
    rotate: -2,
  },
  {
    id: 'polaroid-chongqing',
    location: [29.571212, 106.549155],
    image: '/map/polaroids/chongqing.jpg',
    caption: '重庆',
    rotate: 4,
  },
]
