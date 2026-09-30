/** 旅行地点唯一配置入口。缺字段的模块自动不显示。 */
export type TrafficIcon = 'train' | 'plane' | 'car' | 'ship' | 'bus'

export interface TravelTraffic {
  number: string
  time: string
  area?: string
}

/** 三维模型默认视角与缩放锁定；缺字段用 TravelModelViewer 内置默认值。 */
export interface TravelModelView {
  /** 相机位置 [x, y, z] */
  camera?: [number, number, number]
  /** 注视点 [x, y, z] */
  target?: [number, number, number]
  /** 适配基准距离（再按画幅宽高比修正） */
  fitDistance?: number
  /** 最近距离 = fit * minDistanceScale */
  minDistanceScale?: number
  /** 最远距离 = fit * maxDistanceScale */
  maxDistanceScale?: number
  /** 俯仰角下限（弧度，自 +Y 向下） */
  minPolarAngle?: number
  /** 俯仰角上限（弧度） */
  maxPolarAngle?: number
}

export interface TravelModel {
  src: string
  label: string
  view?: TravelModelView
}

export interface TravelTrip {
  content?: string
  size?: string
  timestamp?: string
  type?: string
  icon?: TrafficIcon
  color?: string
  hollow?: boolean
  plan?: boolean
  poster?: string | string[]
  model?: TravelModel
  food?: string[]
  scenicSpots?: string[]
  trafficNumber?: TravelTraffic[]
}

export interface TravelPlace {
  id: string
  name: string
  shortName: string
  overviewPrefix?: string
  lng?: number
  lat?: number
  polygon?: string
  overview?: { src: string; video?: string }
  trips?: TravelTrip[]
}

export const travelPlaces: TravelPlace[] = [
  {
    id: "杭州",
    name: "浙江省杭州市",
    shortName: "杭州",
    lng: 120.210911,
    lat: 30.252333,
    polygon: "浙江省杭州市",
    overview: {
      src: "journey/overview/hz.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "宁波",
    name: "浙江省宁波市",
    shortName: "宁波",
    lng: 121.62452,
    lat: 29.865818,
    polygon: "浙江省宁波市",
    overview: {
      src: "journey/overview/nb.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "北京",
    name: "北京市",
    shortName: "北京",
    trips: [
      {
        content: "北京",
        size: "large",
        timestamp: "2025-09-20 - 2025-09-21",
        type: "primary",
        icon: "train",
        poster: "https://cdn.sanghangning.cn/ai-images/cnbj2.png",
        food: ["南门涮肉(天坛总店)", "卤煮", "便宜坊烤鸭(和平里店)", "老北京冰棍"],
        scenicSpots: ["天坛", "天安门广场", "鸟巢", "陶喆演唱会", "龚王府"],
        trafficNumber: [
          {
            number: "G32",
            time: "09.20 07:47 - 09.20 12:20",
            area: "杭州东 - 北京南"
          },
          {
            number: "G195",
            time: "09.21 04:17 - 09.2 22:20",
            area: "北京南 - 杭州东"
          }
        ]
      }
    ],
    lng: 116.404763,
    lat: 39.916901,
    polygon: "北京市",
    overview: {
      src: "journey/overview/bj.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "上海",
    name: "上海市",
    shortName: "上海",
    lng: 121.476516,
    lat: 31.23667,
    polygon: "上海市",
    overview: {
      src: "journey/overview/sh.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "广州",
    name: "广东省广州市",
    shortName: "广州",
    trips: [
      {
        content: "广州",
        size: "large",
        timestamp: "2023-10-02",
        type: "primary",
        icon: "plane",
        poster: "https://cdn.sanghangning.cn/ai-images/cngdgz.png",
        food: [
          "早茶（陶陶居）",
          "粤菜（小荔园）",
          "顺德菜（大榕树下）",
          "西士多",
          "牛杂",
          "奶茶",
          "咖喱鱼蛋",
          "烤乳鸽",
          "煲仔饭",
          "烧鸭",
          "养生汤",
          "鱼皮",
          "肠粉",
          "红米肠",
          "大油条配粥",
          "双皮奶",
          "叉烧包",
          "凤爪",
          "蒸排骨",
          "干炒牛河",
          "黑叉烧",
          "白切鸡"
        ],
        scenicSpots: ["夜游珠江", "城中村", "广州塔", "海心桥", "广东省博物馆"],
        trafficNumber: [
          {
            number: "CZ3522(波音787)",
            time: "10.2 11:35 - 10.2 13:40",
            area: "杭州萧山 - 广州白云"
          }
        ],
        color: "#0bbd87"
      }
    ],
    lng: 113.271431,
    lat: 23.135336,
    polygon: "广东省广州市",
    overview: {
      src: "journey/overview/gdgz.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "深圳",
    name: "广东省深圳市",
    shortName: "深圳",
    trips: [
      {
        content: "深圳",
        size: "large",
        timestamp: "2023-10-06",
        type: "primary",
        icon: "train",
        food: ["叉烧包", "猪脚饭", "粥底火锅"],
        scenicSpots: ["盐田坐车游", "中英街", "深圳湾公园"],
        trafficNumber: [
          {
            number: "G6004",
            time: "10.6 06:51 - 10.6 09:02",
            area: "汕头 - 深圳北"
          }
        ],
        color: "#0bbd87"
      }
    ],
    lng: 114.064552,
    lat: 22.548457,
    polygon: "广东省深圳市",
    overview: {
      src: "journey/overview/gdsz.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "河内",
    name: "越南河内",
    shortName: "河内",
    trips: [
      {
        content: "越南河内市",
        size: "large",
        timestamp: "2019",
        type: "primary",
        icon: "train",
        color: "#0bbd87",
        poster: "https://cdn.sanghangning.cn/ai-images/vnhn.png",
        food: ["越南河粉", "越南法棍", "越南咖啡"],
        scenicSpots: ["36行古街", "还剑湖", "越南胡志明主席陵墓", "文庙"],
        trafficNumber: []
      }
    ],
    lng: 105.84009,
    lat: 21.03438,
    overviewPrefix: "VN",
    overview: {
      src: "journey/overview/hn.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "岘港",
    name: "越南岘港",
    shortName: "岘港",
    trips: [
      {
        content: "越南岘港市",
        size: "large",
        timestamp: "2019",
        type: "primary",
        icon: "plane",
        color: "#0bbd87",
        poster: "https://cdn.sanghangning.cn/ai-images/vnxg.png",
        food: ["越南春卷", "越南河粉", "烤鸡爪"],
        scenicSpots: ["巴拿山", "岘港美溪沙滩", "岘港夜市", "岘港粉红大教堂", "岘港龙桥"],
        trafficNumber: []
      }
    ],
    lng: 108.1716007,
    lat: 16.0472484,
    overviewPrefix: "VN",
    overview: {
      src: "journey/overview/xg.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "胡志明",
    name: "越南胡志明",
    shortName: "胡志明",
    trips: [
      {
        content: "越南胡志明市",
        size: "large",
        timestamp: "2019",
        type: "primary",
        icon: "plane",
        color: "#0bbd87",
        poster: "https://cdn.sanghangning.cn/ai-images/vnhzm.png",
        food: ["麦当劳", "越南河粉", "咖啡"],
        scenicSpots: ["西贡中心邮局", "胡志明咖啡公寓", "胡志明市美术馆"],
        trafficNumber: []
      }
    ],
    lng: 106.4143502,
    lat: 10.7553405,
    overviewPrefix: "VN",
    overview: {
      src: "journey/overview/hzm.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "曼谷",
    name: "泰国曼谷",
    shortName: "曼谷",
    trips: [
      {
        content: "泰国曼谷",
        size: "large",
        timestamp: "2019",
        type: "primary",
        icon: "plane",
        color: "#0bbd87",
        poster: "https://cdn.sanghangning.cn/ai-images/thmg.png",
        food: ["冬阴功汤", "泰国炸鸡", "泰国菜", "泰国方便面"],
        scenicSpots: ["大皇宫", "玉佛寺", "湄南河", "郑王庙", "四面佛"],
        trafficNumber: []
      }
    ],
    lng: 100.4926821,
    lat: 13.7248934,
    overviewPrefix: "TH",
    overview: {
      src: "journey/overview/mg.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "芭提雅",
    name: "泰国芭提雅",
    shortName: "芭提雅",
    trips: [
      {
        content: "泰国芭提雅",
        size: "large",
        timestamp: "2019",
        type: "primary",
        icon: "car",
        color: "#0bbd87",
        poster: "https://cdn.sanghangning.cn/ai-images/thbty.png",
        food: ["芒果糯米饭", "海鲜大餐"],
        scenicSpots: ["芭提雅海滩", "东方公主号人妖秀", "海上拖伞", "芭提雅红灯区", "芭提雅大象村"],
        trafficNumber: []
      }
    ],
    lng: 100.8525478,
    lat: 12.8868533,
    overviewPrefix: "TH",
    overview: {
      src: "journey/overview/bty.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "济州岛",
    name: "韩国济州岛",
    shortName: "济州岛",
    trips: [
      {
        content: "济州岛",
        size: "large",
        timestamp: "2024-07-27 - 2024-07-30",
        type: "primary",
        icon: "plane",
        color: "#0bbd87",
        poster: "https://cdn.sanghangning.cn/ai-images/krjzd.png",
        food: ["一品豆腐锅", "烤带鱼", "海女包饭", "紫菜包饭", "泡菜", "花生冰淇淋", "bhc炸鸡"],
        scenicSpots: ["济州市区", "西归浦市", "柱状理节带", "偶来市场", "东门市场", "牛岛助力自行车/快艇", "咸德海滨浴场", "七星街", "免税店"],
        trafficNumber: [
          {
            number: "长龙航空 GJ8940",
            time: "07.27 18:50 - 07.27 22:20",
            area: "杭州萧山国际机场 - 韩国济州岛国际机场"
          },
          {
            number: "春秋航空 9C8623",
            time: "07.30 22:35 - 07.30 23:05",
            area: "韩国济州岛国际机场 - 杭州萧山国际机场"
          }
        ]
      }
    ],
    lng: 126.382934,
    lat: 33.515783,
    overviewPrefix: "KR",
    overview: {
      src: "journey/overview/hgjzd.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "东京",
    name: "日本东京",
    shortName: "东京",
    trips: [
      {
        content: "日本东京",
        size: "large",
        timestamp: "2025-07-25",
        type: "primary",
        icon: "plane",
        color: "#0bbd87",
        poster: "https://cdn.sanghangning.cn/ai-images/jpdj.png",
        food: ["一兰拉面", "各种711快餐", "駅弁车站便当", "烧鸟", "TsuruTonTan UDON NOODLE Brasserie SHIBUYA（乌冬面）", "神楽坂茶寮"],
        scenicSpots: ["东京铁塔", "歌舞伎町", "涩谷sky", "浅草寺", "秋叶原"],
        trafficNumber: [
          {
            number: "春秋航空9C6131",
            time: "07.25 06:10 - 07.25 10:05",
            area: "上海浦东国际机场 - 东京成田机场"
          },
          {
            number: "春秋航空9C6998",
            time: "07.29 01:05 - 07.29 03:10",
            area: "东京羽田机场 - 上海浦东国际机场"
          },
          {
            number: "[E]大江户线",
            time: "07.25"
          },
          {
            number: "[JY]山手线",
            time: "07.25"
          },
          {
            number: "[A]浅草线",
            time: "07.26"
          },
          {
            number: "[G]银座线",
            time: "07.26"
          }
        ]
      }
    ],
    lng: 139.652832,
    lat: 35.652832,
    overviewPrefix: "JP",
    overview: {
      src: "journey/overview/jpdj.jpg?imageMogr2/auto-orient",
      video: "https://cdn.sanghangning.cn/journey/blog/JP_TOKYO_202507.mov"
    }
  },
  {
    id: "镰仓",
    name: "日本镰仓",
    shortName: "镰仓",
    trips: [
      {
        content: "日本镰仓",
        size: "large",
        timestamp: "2025-07-28",
        type: "primary",
        icon: "train",
        color: "#0bbd87",
        poster: "https://cdn.sanghangning.cn/ai-images/jplc.png",
        food: ["海花亭（咖喱饭）"],
        scenicSpots: ["镰仓高校前站", "江之岛", "七里滨"],
        trafficNumber: [
          {
            number: "[JD]京滨急行线",
            time: "07.28"
          },
          {
            number: "[🚠]湘南单轨列车",
            time: "07.28"
          },
          {
            number: "[小绿车]江之岛电铁列",
            time: "07.28"
          }
        ]
      }
    ],
    lng: 139.549444,
    lat: 35.319167,
    overviewPrefix: "JP",
    overview: {
      src: "journey/overview/jplc.heic?imageMogr2/auto-orient"
    }
  },
  {
    id: "横滨",
    name: "日本横滨",
    shortName: "横滨",
    trips: [
      {
        content: "日本横滨",
        size: "large",
        timestamp: "2025-07-28",
        type: "primary",
        icon: "train",
        color: "#0bbd87",
        poster: "https://cdn.sanghangning.cn/ai-images/jphb.png",
        food: ["Yakiniku Watami（烧肉）"],
        scenicSpots: ["中华街", "红砖仓库", "空中缆车", "友都八喜", "爱电王"],
        trafficNumber: [
          {
            number: "[JK]根岸线",
            time: "07.28"
          }
        ]
      }
    ],
    lng: 139.443707,
    lat: 35.443707,
    overviewPrefix: "JP",
    overview: {
      src: "journey/overview/jphb.heic?imageMogr2/auto-orient"
    }
  },
  {
    id: "大阪",
    name: "日本大阪",
    shortName: "大阪",
    trips: [
      {
        content: "日本大阪",
        size: "large",
        timestamp: "2025-03-21 - 2025-03-24",
        type: "primary",
        icon: "plane",
        color: "#0bbd87",
        poster: "https://cdn.sanghangning.cn/ai-images/jpdb.png",
        food: [
          "乌冬面（天下茶屋地铁站）",
          "章鱼小丸子（道顿堀）",
          "大興寿司（寿司）",
          "元祖炸串（炸串）",
          "环球影城路易斯纽约披萨饼屋",
          "环球影城奇诺比奥咖啡店",
          "Yakiniku Sukiyaki Jun（神户和牛）",
          "机场T2咖喱猪排饭与大阪烧"
        ],
        scenicSpots: ["心斋桥", "道顿堀", "通天阁", "USJ大阪环球影城", "梅田商圈", "天守城"],
        trafficNumber: [
          {
            number: "春秋航空9C8589",
            time: "03.21 08:05 - 03.24 11:20",
            area: "上海浦东国际机场 - 大阪关西国际机场"
          },
          {
            number: "春秋航空9C6998",
            time: "03.24 19:30 - 03.24 21:20",
            area: "大阪关西国际机场 - 上海浦东国际机场"
          }
        ]
      }
    ],
    lng: 135.486908,
    lat: 34.694175,
    overviewPrefix: "JP",
    overview: {
      src: "journey/overview/jpdb.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "京都",
    name: "日本京都",
    shortName: "京都",
    trips: [
      {
        content: "日本京都",
        size: "large",
        timestamp: "2025-03-23",
        type: "primary",
        icon: "train",
        color: "#0bbd87",
        poster: "https://cdn.sanghangning.cn/ai-images/jpjd.png",
        food: ["本格炭火焼うなぎ えん 京都三条店（鳗鱼饭）", "Sumiyagura Kyoto（拉面）"],
        scenicSpots: ["鸭川", "伏见稻荷大社", "清水寺", "三年坂二年坂"],
        trafficNumber: [
          {
            number: "坂急京都线",
            time: "2025-03-23 10:40 - 2025-03-23 12:13",
            area: "梅田 - 京都"
          }
        ]
      }
    ],
    lng: 135.761557,
    lat: 35.005874,
    overviewPrefix: "JP",
    overview: {
      src: "journey/overview/jpjd.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "富士山",
    name: "日本富士山",
    shortName: "富士山",
    trips: [
      {
        content: "日本富士山河口湖",
        size: "large",
        timestamp: "2025-07-27",
        type: "primary",
        icon: "train",
        color: "#0bbd87",
        poster: "https://cdn.sanghangning.cn/ai-images/jpfss.png",
        food: ["猪排饭"],
        scenicSpots: ["河口湖", "富士急乐园（遇到了路演的女团）", "大石公园"],
        trafficNumber: [
          {
            number: "富士洄游号81",
            time: "07.27 09:02 - 07.25 11:21",
            area: "新宿 - 河口湖"
          },
          {
            number: "河口湖 RED LINE 旅游巴士",
            time: "07.27"
          },
          {
            number: "[🗻]富士急行线",
            time: "07.27"
          },
          {
            number: "[JC]中央线",
            time: "07.27"
          },
          {
            number: "[JK]京滨东北线",
            time: "07.27"
          }
        ]
      }
    ],
    lng: 138.7253,
    lat: 35.3548,
    overviewPrefix: "JP",
    overview: {
      src: "journey/overview/jpfss.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "新加坡",
    name: "新加坡",
    shortName: "新加坡",
    trips: [
      {
        content: "新加坡",
        size: "large",
        timestamp: "2026-02-11 - 2026-02-14",
        type: "primary",
        icon: "plane",
        color: "#0bbd87",
        poster: "https://cdn.sanghangning.cn/ai-images/singapore.png",
        food: [
          "亚坤",
          "松发肉骨茶",
          "友吉海南鸡饭",
          "Kiliney Kopitiam - Lucky Plaza",
          "Nasi Lemak Ayam Taliwang",
          "Muthu's Curry",
          "南南咖喱娘惹料理",
          ""
        ],
        scenicSpots: ["牛车水", "鱼尾狮公园", "克拉码头", "滨海湾花园", "花穹", "云雾林", "夜间动物园（Night Safiri）", "乌节路", "City Tours", "苏丹回教堂", "小印度", "星耀樟宜"],
        trafficNumber: [
          {
            number: "春秋航空9C8549",
            time: "02.11 17:30 - 02.11 23:10",
            area: "上海浦东国际机场 - 新加坡樟宜机场"
          }
        ]
      }
    ],
    lng: 103.842037,
    lat: 1.290765,
    overviewPrefix: "SG",
    overview: {
      src: "journey/overview/singapore.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "吉隆坡",
    name: "马来西亚吉隆坡",
    shortName: "吉隆坡",
    trips: [
      {
        content: "马来西亚吉隆坡",
        size: "large",
        timestamp: "0206-02-14 - 2026-02-16",
        type: "primary",
        icon: "plane",
        color: "#0bbd87",
        poster: "https://cdn.sanghangning.cn/ai-images/myjlp.png",
        food: ["海脚人", "榴莲：老树猫山王、黑刺、红肉、小甜甜", "肥肥蟹", ""],
        scenicSpots: ["中央艺术坊", "独立广场", "双子塔"],
        trafficNumber: [
          {
            number: "埃塞俄比亚航空ET638",
            time: "02.14 15:50 - 02.14 17:15",
            area: "新加坡樟宜机场 - 吉隆坡国际机场"
          },
          {
            number: "亚洲航空XD7302",
            time: "02.16 07:45 - 02.16 13:10",
            area: "吉隆坡国际机场 - 杭州萧山国际机场"
          }
        ]
      }
    ],
    lng: 101.70551,
    lat: 3.152319,
    overviewPrefix: "MYS",
    overview: {
      src: "journey/overview/mysjlp.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "澳门",
    name: "澳门特别行政区",
    shortName: "澳门",
    trips: [
      {
        content: "澳门",
        size: "large",
        timestamp: "2025-02-02",
        type: "primary",
        icon: "ship",
        poster: "https://cdn.sanghangning.cn/ai-images/cnam2.png",
        food: ["牛杂", "咖喱鱼蛋", "兰香阁", "盈晖海鲜酒家", "安德鲁蛋挞"],
        scenicSpots: ["永利大皇宫", "伦敦人", "威尼斯人", "新葡京", "葡京", "美高梅", "美高梅美狮", "大三巴", "大炮台", "老永利发财树"],
        trafficNumber: [
          {
            number: "",
            time: "02.02 08:30 - 02.02 09:30",
            area: "深圳蛇口 - 澳门凼仔"
          },
          {
            number: "",
            time: "02.02 20:30 - 02.02 21:30",
            area: "澳门凼仔 - 深圳蛇口"
          }
        ],
        color: "#0bbd87"
      },
      {
        content: "澳门",
        size: "large",
        timestamp: "2023-10-07",
        type: "primary",
        icon: "ship",
        poster: "https://cdn.sanghangning.cn/ai-images/cnam.png",
        food: ["招牌蒲国鸡饭", "柠檬车露雪糕", "安德鲁蛋挞", "旺记咖啡奶茶"],
        scenicSpots: ["永利大皇宫", "伦敦人", "威尼斯人", "新葡京", "老普京", "议事厅前地广场", "玫瑰圣母堂", "关前老街", "大三巴", "大炮台", "疯堂斜巷", "老永利发财树", "官也街", "银河综合度假城"],
        trafficNumber: [
          {
            number: "迅隆7",
            time: "10.7 08:00 - 10.7 09:00",
            area: "深圳蛇口 - 澳门凼仔"
          }
        ],
        color: "#0bbd87"
      }
    ],
    lng: 113.549464,
    lat: 22.19292,
    polygon: "澳门特别行政区",
    overviewPrefix: "CN",
    overview: {
      src: "journey/overview/am.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "香港",
    name: "香港特别行政区",
    shortName: "香港",
    trips: [
      {
        content: "香港",
        size: "large",
        timestamp: "2025-02-03 - 2025-02-05",
        type: "primary",
        icon: "train",
        color: "#0bbd87",
        poster: "https://cdn.sanghangning.cn/ai-images/hk2.png",
        food: ["好盛冰室", "一乐烧鹅", "柠檬冰室", "迪士尼皇家宴会餐厅", "迪士尼火箭餐厅", "迪士尼冰条"],
        scenicSpots: ["H2观光线", "铜锣湾", "星光大道", "维多利亚港", "中环", "香港迪士尼", "香港机场"],
        trafficNumber: [
          {
            number: "G5615 复兴号",
            time: "02.03 09:17 - 02.03 09:43",
            area: "深圳北 - 香港西九龙"
          },
          {
            number: "国泰航空CX962",
            time: "02.05 16:00 - 02.05 18:17",
            area: "香港国际机场 - 杭州萧山国际机场"
          }
        ]
      },
      {
        content: "香港",
        size: "large",
        timestamp: "2023-10-08 - 2023-10-09",
        type: "primary",
        icon: "train",
        color: "#0bbd87",
        poster: "https://cdn.sanghangning.cn/ai-images/hk1.png",
        food: ["九龙冰室", "叉烧包"],
        scenicSpots: ["H1观光线", "铜锣湾", "星光大道", "维多利亚港"],
        trafficNumber: [
          {
            number: "G5639 动感号",
            time: "10.8 09:33 - 10.8 09:52",
            area: "深圳北 - 香港西九龙"
          }
        ]
      }
    ],
    lng: 114.171533,
    lat: 22.281155,
    polygon: "香港特别行政区",
    overviewPrefix: "CN",
    overview: {
      src: "journey/overview/xg.heic?imageMogr2/auto-orient"
    }
  },
  {
    id: "天津",
    name: "天津市",
    shortName: "天津",
    lng: 117.21499,
    lat: 39.094015,
    polygon: "天津市",
    overview: {
      src: "journey/overview/tj.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "重庆",
    name: "重庆市",
    shortName: "重庆",
    lng: 106.549155,
    lat: 29.571212,
    polygon: "重庆市",
    overview: {
      src: "journey/overview/cq.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "成都",
    name: "四川省成都市",
    shortName: "成都",
    lng: 104.072745,
    lat: 30.663277,
    polygon: "四川省成都市",
    overview: {
      src: "journey/overview/cd.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "南宁",
    name: "广西省南宁市",
    shortName: "南宁",
    lng: 108.36943,
    lat: 22.821275,
    polygon: "广西省南宁市",
    overview: {
      src: "journey/overview/nn.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "西安",
    name: "陕西省西安市",
    shortName: "西安",
    lng: 108.94359,
    lat: 34.347984,
    polygon: "陕西省西安市",
    overview: {
      src: "journey/overview/xa.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "南京",
    name: "江苏省南京市",
    shortName: "南京",
    lng: 118.800697,
    lat: 32.065876,
    polygon: "江苏省南京市",
    overview: {
      src: "journey/overview/nj.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "苏州",
    name: "江苏省苏州市",
    shortName: "苏州",
    trips: [
      {
        content: "苏州",
        size: "large",
        timestamp: "2023-12-30",
        type: "primary",
        icon: "car",
        poster: "https://cdn.sanghangning.cn/ai-images/cnjssz.png",
        color: "#0bbd87",
        food: ["苏城家宴", "醉蟹", "狮子头", "烧汁茄子", "烤鸭", "熏鱼"],
        scenicSpots: ["拙政园", "狮子林", "平江路", "平江路摇橹船"],
        trafficNumber: []
      }
    ],
    lng: 120.629781,
    lat: 31.335894,
    polygon: "江苏省苏州市",
    overview: {
      src: "journey/overview/sz.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "常州",
    name: "江苏省常州市",
    shortName: "常州",
    trips: [
      {
        content: "常州",
        size: "large",
        timestamp: "2023-09-30",
        type: "primary",
        food: ["卜記家常菜(土城路店)"],
        scenicSpots: ["太湖音乐节", "灵山大佛"],
        icon: "car",
        color: "#0bbd87"
      }
    ],
    lng: 119.979759,
    lat: 31.81555,
    polygon: "江苏省常州市",
    overview: {
      src: "journey/overview/cz.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "无锡",
    name: "江苏省无锡市",
    shortName: "无锡",
    lng: 120.323756,
    lat: 31.501519,
    polygon: "江苏省无锡市",
    overview: {
      src: "journey/overview/wx.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "溧阳",
    name: "江苏省溧阳市",
    shortName: "溧阳",
    trips: [
      {
        content: "溧阳",
        scenicSpots: ["南山竹海", "溧阳一号公路"],
        size: "large",
        timestamp: "2023-05-02",
        type: "primary",
        icon: "car",
        color: "#0bbd87"
      }
    ],
    lng: 119.489778,
    lat: 31.421856,
    overview: {
      src: "journey/overview/jsly.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "扬州",
    name: "江苏省扬州市",
    shortName: "扬州",
    trips: [
      {
        content: "扬州",
        scenicSpots: ["澡堂", "瘦西湖", "中国大运河博物馆", "搓脚"],
        food: ["扬州炒饭", "大煮干丝", "扬大酸奶"],
        size: "large",
        timestamp: "2023-05-02 - 2023-05-03",
        type: "primary",
        poster: "https://cdn.sanghangning.cn/ai-images/cnjsyz.png",
        icon: "car",
        color: "#0bbd87"
      }
    ],
    lng: 119.423447,
    lat: 32.402383,
    polygon: "江苏省扬州市",
    overview: {
      src: "journey/overview/jsyz.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "绍兴",
    name: "浙江省绍兴市",
    shortName: "绍兴",
    lng: 120.590023,
    lat: 30.059909,
    polygon: "浙江省绍兴市",
    overview: {
      src: "journey/overview/zjsx.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "台州",
    name: "浙江省台州市",
    shortName: "台州",
    lng: 121.423408,
    lat: 28.663968,
    polygon: "浙江省台州市",
    overview: {
      src: "journey/overview/zjtz.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "象山",
    name: "浙江省宁波市象山市",
    shortName: "象山",
    lng: 121.876136,
    lat: 29.483026,
    overview: {
      src: "journey/overview/xs.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "衢州",
    name: "浙江省衢州市",
    shortName: "衢州",
    lng: 118.870047,
    lat: 28.974788,
    polygon: "浙江省衢州市",
    overview: {
      src: "journey/overview/qz.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "金华",
    name: "浙江省金华市",
    shortName: "金华",
    lng: 119.653441,
    lat: 29.091458,
    polygon: "浙江省金华市",
    overview: {
      src: "journey/overview/zjjh.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "丽水",
    name: "浙江省丽水市",
    shortName: "丽水",
    lng: 119.926121,
    lat: 28.476072,
    polygon: "浙江省丽水市",
    overview: {
      src: "journey/overview/zjls.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "桐庐",
    name: "浙江省杭州市桐庐县",
    shortName: "桐庐",
    lng: 119.697601,
    lat: 29.800841,
    overview: {
      src: "journey/overview/zjtl.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "湖州",
    name: "浙江省湖州市",
    shortName: "湖州",
    trips: [
      {
        content: "湖州",
        size: "large",
        timestamp: "2023-12-17",
        type: "primary",
        icon: "car",
        color: "#0bbd87",
        food: ["羊肉面", "周生记鸡爪"],
        scenicSpots: ["莫干山", "状元街", "小西街", "衣裳街"],
        trafficNumber: []
      }
    ],
    lng: 120.09452,
    lat: 30.89896,
    polygon: "浙江省湖州市",
    overview: {
      src: "journey/overview/zjhuz.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "厦门",
    name: "福建省厦门市",
    shortName: "厦门",
    lng: 118.099884,
    lat: 24.488302,
    polygon: "厦门市",
    overview: {
      src: "journey/overview/fjxm.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "福州",
    name: "福建省福州市",
    shortName: "福州",
    trips: [
      {
        content: "福州",
        size: "large",
        timestamp: "2023-10-27 - 2023-10-29",
        type: "primary",
        icon: "train",
        poster: "https://cdn.sanghangning.cn/ai-images/cnfz.png",
        color: "#0bbd87",
        food: ["鱼丸", "肉片", "福屿伟榕捞化", "朱富贵海鲜火锅", "花生汤", "花生浆", "锅边糊"],
        scenicSpots: ["福州国家森林公园", "三坊七巷"],
        trafficNumber: [
          {
            number: "G1641",
            time: "10.27 19:03 - 10.27 22:49",
            area: "杭州南 - 福州"
          }
        ]
      }
    ],
    lng: 119.308644,
    lat: 26.082765,
    polygon: "福建省福州市",
    overview: {
      src: "journey/overview/fjfz.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "泉州",
    name: "福建省泉州市",
    shortName: "泉州",
    trips: [
      {
        content: "泉州",
        size: "large",
        timestamp: "2025-02-01",
        type: "primary",
        icon: "train",
        color: "#0bbd87",
        poster: "https://cdn.sanghangning.cn/ai-images/cnfjqz2.png",
        food: ["面线糊", "牛肉馆", "姜母鸭"],
        scenicSpots: ["开元寺", "钟楼", "天后宫"],
        trafficNumber: [
          {
            number: "G1353",
            time: "01.31 15:55 - 01.31 16:07",
            area: "玉山南 - 上饶"
          },
          {
            number: "G321",
            time: "01.31 16:36 - 01.31 18:21",
            area: "上饶 - 泉州"
          }
        ]
      }
    ],
    lng: 118.683594,
    lat: 24.880214,
    polygon: "福建省泉州市",
    overview: {
      src: "journey/overview/fjqz.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "龙岩",
    name: "福建省龙岩市",
    shortName: "龙岩",
    lng: 117.025745,
    lat: 25.079911,
    polygon: "福建省龙岩市",
    overview: {
      src: "journey/overview/fjly.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "莆田",
    name: "福建省莆田市",
    shortName: "莆田",
    trips: [
      {
        content: "莆田",
        size: "large",
        timestamp: "2026-02-21 - 2026-02-23",
        type: "primary",
        icon: "train",
        poster: "https://cdn.sanghangning.cn/ai-images/cnpt.png",
        color: "#0bbd87",
        food: ["吃席", "卤面", "炝肉", "炖罐"],
        scenicSpots: ["东吴村", "湄洲岛"],
        trafficNumber: [
          {
            number: "G1673",
            time: "02.21 11:25 - 02.21 15:30",
            area: "台州 - 莆田"
          },
          {
            number: "D3212",
            time: "02.23 18:17 - 02.23 22:52",
            area: "莆田 - 杭州东"
          }
        ]
      }
    ],
    lng: 119.128259,
    lat: 25.064372,
    polygon: "福建省莆田市",
    overview: {
      src: "journey/overview/fjpt.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "赣州",
    name: "江西省赣州市",
    shortName: "赣州",
    lng: 114.938208,
    lat: 25.839078,
    polygon: "江西省赣州市",
    overview: {
      src: "journey/overview/jxgz.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "景德镇",
    name: "江西省景德镇市",
    shortName: "景德镇",
    trips: [
      {
        content: "景德镇",
        size: "large",
        timestamp: "2024-11-07 - 2024-11-09",
        type: "primary",
        icon: "bus",
        color: "#0bbd87",
        poster: "https://cdn.sanghangning.cn/ai-images/cnjxjdz.png",
        food: ["回家吃饭", "小黄鱼", "欧记排挡", "兄弟记"],
        scenicSpots: ["陶溪川", "中国陶瓷博物馆", "做陶瓷"],
        trafficNumber: []
      }
    ],
    lng: 117.190323,
    lat: 29.275508,
    polygon: "江西省景德镇",
    overview: {
      src: "journey/overview/jxjdz.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "南昌",
    name: "江西省南昌市",
    shortName: "南昌",
    trips: [
      {
        content: "南昌",
        size: "large",
        timestamp: "2024-03-23 - 2024-03-24",
        type: "primary",
        poster: "https://cdn.sanghangning.cn/ai-images/cnnc.png",
        icon: "train",
        color: "#0bbd87",
        food: ["白糖糕", "三杯鸡", "香辣鱼尾", "帝皇烤卤", "茼蒿炒腊肉", "黄豆鸡脚", "洪都大拇指", "瓦罐汤", "拌粉", "炒粉"],
        scenicSpots: ["滕王阁", "江西博物馆", "八一广场", "万寿宫"],
        trafficNumber: [
          {
            number: "G1641",
            time: "03.23 08:06 - 03.23 11:00",
            area: "杭州东 - 南昌西"
          }
        ]
      }
    ],
    lng: 120.209,
    lat: 30.2471,
    polygon: "江西省南昌市",
    overview: {
      src: "journey/overview/jxnc.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "长沙",
    name: "湖南省长沙市",
    shortName: "长沙",
    lng: 112.948919,
    lat: 28.236672,
    polygon: "湖南省长沙市",
    overview: {
      src: "journey/overview/hncs.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "郑州",
    name: "河南省郑州市",
    shortName: "郑州",
    trips: [
      {
        content: "河南郑州",
        size: "large",
        timestamp: "2026-05-09 - 2026-05-10",
        type: "primary",
        icon: "train",
        poster: "https://cdn.sanghangning.cn/ai-images/cnhnzz.png",
        food: ["烩面", "逍遥镇胡辣汤", "牛肉水煎包", "黄河大鲤鱼"],
        scenicSpots: ["郑州奥体中心：汪苏泷演唱会", "河南省博物院", "蜜雪冰城总部"],
        trafficNumber: [
          {
            number: "GJ8781",
            time: "05.09 07:45 - 05.09 09:40",
            area: "杭州萧山国际机场 - 郑州新郑国际机场"
          },
          {
            number: "G1959",
            time: "05.10 13:15 - 05.10 17:48",
            area: "郑州东 - 杭州东"
          }
        ]
      }
    ],
    lng: 113.672186,
    lat: 34.788416,
    polygon: "河南省郑州市",
    overview: {
      src: "journey/overview/cnhnzz.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "三亚",
    name: "海南省三亚市",
    shortName: "三亚",
    trips: [
      {
        content: "三亚",
        size: "large",
        timestamp: "2025-09-06 - 2025-09-07",
        type: "primary",
        icon: "train",
        color: "#0bbd87",
        poster: "https://cdn.sanghangning.cn/ai-images/cnsy.png",
        food: ["岛上椰林·东方烤乳猪·海鲜餐厅", "糟粕醋火锅", "椰子饭"],
        scenicSpots: ["亚特兰蒂斯水世界", "亚特兰蒂斯水族馆"],
        trafficNumber: [
          {
            number: "C7873",
            time: "09.06 09:17 - 09.06 09:50",
            area: "神州 - 亚龙湾"
          },
          {
            number: "首都航空JD5969",
            time: "09.07 22:50 - 09.08 01:00",
            area: "海口美兰国际机场 - 杭州萧山国际机场"
          }
        ]
      }
    ],
    lng: 109.51856,
    lat: 18.260109,
    polygon: "海南省三亚市",
    overview: {
      src: "journey/overview/sy.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "万宁",
    name: "海南省万宁市",
    shortName: "万宁",
    trips: [
      {
        content: "万宁",
        size: "large",
        timestamp: "2025-09-05",
        type: "primary",
        icon: "plane",
        color: "#0bbd87",
        poster: "https://cdn.sanghangning.cn/ai-images/cnwn.png",
        food: ["香草鸭", "海南粉"],
        scenicSpots: ["神州半岛", "石梅湾", "日月湾"],
        trafficNumber: [
          {
            number: "成都航空EU2264",
            time: "09.05 12:25 - 09.05 15:20",
            area: "杭州萧山国际机场 - 海口美兰国际机场"
          },
          {
            number: "C7861",
            time: "09.05 16:32 - 09.05 17:36",
            area: "美兰 - 神州"
          }
        ]
      }
    ],
    lng: 110.345137,
    lat: 18.675669,
    polygon: "海南省万宁市",
    overview: {
      src: "journey/overview/hnwn.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "武汉",
    name: "湖北省武汉市",
    shortName: "武汉",
    trips: [
      {
        content: "武汉",
        scenicSpots: ["黄鹤楼"],
        food: ["牛肉粉", "藕汤"],
        size: "large",
        timestamp: "2023-07-21 20:15 - 2023-07-22",
        type: "primary",
        icon: "train",
        color: "#0bbd87"
      },
      {
        content: "武汉",
        scenicSpots: ["江汉路步行街", "汉口江滩", "长江轮渡", "武汉长江大桥", "户部巷", "夜游长江游船"],
        food: ["热干面", "豆皮", "茶颜悦色", "周黑鸭"],
        size: "large",
        timestamp: "2023-07-20 10:10 - 2023-07-20 14:43",
        type: "primary",
        icon: "train",
        color: "#0bbd87"
      }
    ],
    lng: 114.301812,
    lat: 30.598716,
    polygon: "湖北省武汉市",
    overview: {
      src: "journey/overview/hbwh.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "宜昌",
    name: "湖北省宜昌市",
    shortName: "宜昌",
    trips: [
      {
        content: "宜昌",
        scenicSpots: ["两坝一峡游船", "三峡大坝"],
        food: ["凉虾", "奶汤肥鱼", "矮子馅饼"],
        size: "large",
        timestamp: "2023-07-21 04:56 - 2023-07-21 07:07",
        type: "primary",
        poster: "https://cdn.sanghangning.cn/ai-images/cnhbyc.png",
        icon: "train",
        color: "#0bbd87"
      }
    ],
    lng: 111.296001,
    lat: 30.697694,
    polygon: "湖北省宜昌市",
    overview: {
      src: "journey/overview/hbyc.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "潮州",
    name: "广东省潮州市",
    shortName: "潮州",
    lng: 116.62947,
    lat: 23.662623,
    polygon: "广东省潮州市",
    overview: {
      src: "journey/overview/gdcz.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "汕头",
    name: "广东省汕头市",
    shortName: "汕头",
    lng: 116.688529,
    lat: 23.359092,
    polygon: "广东省汕头市",
    overview: {
      src: "journey/overview/gdst.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "贵阳",
    name: "贵州省贵阳市",
    shortName: "贵阳",
    lng: 106.630001,
    lat: 26.6476,
    polygon: "贵州省贵阳市",
    overview: {
      src: "journey/overview/gzgy.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "荔波",
    name: "贵州省荔波县",
    shortName: "荔波",
    lng: 107.887,
    lat: 25.4108,
    polygon: "贵州省黔南布依族苗族自治州荔波县",
    overview: {
      src: "journey/overview/gzlb.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "织金",
    name: "贵州省织金县",
    shortName: "织金",
    lng: 105.771,
    lat: 26.663501,
    polygon: "贵州省毕节市织金县",
    overview: {
      src: "journey/overview/gzzj.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "安顺",
    name: "贵州省安顺市",
    shortName: "安顺",
    lng: 105.947999,
    lat: 26.253001,
    polygon: "贵州省安顺市",
    overview: {
      src: "journey/overview/gzas.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "大连",
    name: "辽宁省大连市",
    shortName: "大连",
    trips: [
      {
        content: "辽宁大连",
        size: "large",
        timestamp: "2026-09-25 - 2026-09-28",
        type: "primary",
        icon: "ship",
        poster: [
          "https://cdn.sanghangning.cn/ai-images/cnlndl.png",
          "https://cdn.sanghangning.cn/ai-images/渤海钻珠.png",
          "https://cdn.sanghangning.cn/ai-images/渤海海浪.png",
          "https://cdn.sanghangning.cn/ai-images/渤海日落.png"
        ],
        food: ["大连海鲜水饺", "于迟百川豆腐脑", "佰家鳗鱼饭", "日月晟渔家菜:海肠捞饭、葱油鲍鱼、三鲜焖子、黄瓜蛰皮", "盘锦小卷饼", "海胆", "小船渔村:飞蟹、鲍鱼炒鸡、辣炒蛏子"],
        scenicSpots: ["中山广场", "星海广场", "自然博物馆", "亲海栈道小岗海滩", "201路百年电车"],
        trafficNumber: [
          {
            number: "渤海钻珠",
            time: "09.25 13:50 - 09.25 20:20",
            area: "烟台港客运站 - 辽渔大连湾航运中心"
          },
          {
            number: "CA8951",
            time: "09.28 06:40 - 09.28 08:50",
            area: "大连周子水机场 - 杭州萧山国际机场"
          }
        ]
      }
    ],
    lng: 121.643943,
    lat: 38.92284,
    polygon: "辽宁省大连市",
    overview: {
      src: "journey/overview/cnlndl.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "威海",
    name: "山东省威海市",
    shortName: "威海",
    trips: [
      {
        content: "山东威海",
        size: "large",
        timestamp: "2026-09-24 - 2026-09-25",
        type: "primary",
        icon: "plane",
        poster: "https://cdn.sanghangning.cn/ai-images/cnsdwh.png",
        model: {
          src: "/models/blueways/blueways.glb",
          label: "布鲁威斯号",
          // 调参：日历页 URL 加 ?debug=1，拖动后点「复制 view 配置」贴回此处
          view: {
            camera: [220.437, 101.363, 221.581],
            target: [18.604, -6.193, 6.828],
            fitDistance: 318,
            // 竖图画幅下该相机距离约 0.60×fit；低于旧默认 0.78 时会被夹走
            minDistanceScale: 0.6,
            maxDistanceScale: 1.35,
            minPolarAngle: 0.349,
            maxPolarAngle: 1.361,
          },
        },
        food: ["巧克力渔家:海肠捞饭、海胆水饺、蒸海鲜", "鲅鱼水饺", "海菜包子", "园宝炸酱面", "Mumou·0l0|^冰奶", "吴草鸡爪"],
        scenicSpots: ["布鲁维斯号", "那香海", "孤独公约", "海源公园", "火炬八街"],
        trafficNumber: [
          {
            number: "GJ8685",
            time: "09.24 06:30 - 09.24 08:35",
            area: "杭州萧山国际机场 - 威海大水泊机场"
          }
        ]
      }
    ],
    lng: 122.127842,
    lat: 37.501507,
    polygon: "山东省威海市",
    overview: {
      src: "journey/overview/cbsdwh.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "济南",
    name: "山东省济南市",
    shortName: "济南",
    trips: [
      {
        content: "山东济南",
        size: "large",
        timestamp: "2026-06-27 - 2026-06-28",
        type: "primary",
        icon: "train",
        poster: "https://cdn.sanghangning.cn/ai-images/cnsdjn.png",
        food: ["闫府私房菜", "九转大肠", "把子肉", "肥蛤", "向民炒鸡", "小山羊功夫串"],
        scenicSpots: ["大明湖", "趵突泉", "黑虎泉", "泰山"],
        trafficNumber: []
      }
    ],
    lng: 117.119906,
    lat: 36.652268,
    polygon: "山东省济南市",
    overview: {
      src: "journey/overview/cnsdjn.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "黄果树大瀑布",
    name: "黄果树大瀑布",
    shortName: "黄果树大瀑布",
    overview: {
      src: "journey/overview/gzhgs.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "千户苗寨",
    name: "贵州省千户苗寨",
    shortName: "千户苗寨",
    lng: 108.17315,
    lat: 26.494537,
    polygon: "贵州省黔东南苗族侗族自治州雷山县",
    overview: {
      src: "journey/overview/gzqhmz.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "东极岛",
    name: "浙江舟山市东极岛",
    shortName: "东极岛",
    lng: 122.701536,
    lat: 30.200436,
    overview: {
      src: "journey/overview/djd.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "千岛湖",
    name: "浙江省淳安县",
    shortName: "千岛湖",
    lng: 119.05357,
    lat: 29.609172,
    overview: {
      src: "journey/overview/qdh.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "雁荡山",
    name: "浙江省温州市雁荡山",
    shortName: "雁荡山",
    lng: 121.071166,
    lat: 28.385854,
    overview: {
      src: "journey/overview/yds.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "泰山",
    name: "山东省泰安市",
    shortName: "泰山",
    lng: 117.061155,
    lat: 36.21352,
    polygon: "山东省泰安市",
    overview: {
      src: "journey/overview/cnsdts.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "华山",
    name: "陕西省华阴市",
    shortName: "华山",
    lng: 110.09573,
    lat: 34.573465,
    polygon: "陕西省华阴市",
    overview: {
      src: "journey/overview/hs.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "大明山",
    name: "大明山",
    shortName: "大明山",
    overview: {
      src: "journey/overview/dms.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "武功山",
    name: "江西省萍乡市",
    shortName: "武功山",
    lng: 114.215647,
    lat: 27.470308,
    polygon: "江西省萍乡市",
    overview: {
      src: "journey/overview/jxwgs.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "龙虎山",
    name: "江西省鹰潭市龙虎山",
    shortName: "龙虎山",
    lng: 117.005055,
    lat: 28.094106,
    polygon: "江西省鹰潭市",
    overview: {
      src: "journey/overview/jxlhs.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "网易",
    name: "网易",
    shortName: "网易",
    overview: {
      src: "journey/overview/netease.png?imageMogr2/auto-orient"
    }
  },
  {
    id: "整数智能",
    name: "整数智能",
    shortName: "整数智能",
    overview: {
      src: "journey/overview/zszn.jpg?imageMogr2/auto-orient"
    }
  },
  {
    id: "哈尔滨",
    name: "哈尔滨",
    shortName: "哈尔滨",
    trips: [
      {
        content: "哈尔滨",
        food: [],
        scenicSpots: [],
        trafficNumber: []
      }
    ]
  },
  {
    id: "延吉",
    name: "延吉",
    shortName: "延吉",
    trips: [
      {
        content: "延吉",
        food: [],
        scenicSpots: [],
        trafficNumber: []
      }
    ]
  },
  {
    id: "青岛",
    name: "青岛",
    shortName: "青岛",
    trips: [
      {
        content: "青岛",
        food: [],
        scenicSpots: [],
        trafficNumber: []
      }
    ]
  },
  {
    id: "仙本那",
    name: "马来西亚仙本那",
    shortName: "仙本那",
    trips: [
      {
        content: "马来西亚仙本那",
        food: [],
        scenicSpots: [],
        trafficNumber: []
      }
    ]
  },
  {
    id: "拉斯维加斯",
    name: "美国拉斯维加斯",
    shortName: "拉斯维加斯",
    trips: [
      {
        content: "美国拉斯维加斯",
        food: [],
        scenicSpots: [],
        trafficNumber: []
      }
    ]
  },
  {
    id: "旧金山",
    name: "美国旧金山",
    shortName: "旧金山",
    trips: [
      {
        content: "美国旧金山",
        food: [],
        scenicSpots: [],
        trafficNumber: []
      }
    ]
  },
  {
    id: "洛杉矶",
    name: "美国洛杉矶",
    shortName: "洛杉矶",
    trips: [
      {
        content: "美国洛杉矶",
        food: [],
        scenicSpots: [],
        trafficNumber: []
      }
    ]
  },
  {
    id: "墨尔本",
    name: "澳大利亚墨尔本",
    shortName: "墨尔本",
    trips: [
      {
        content: "澳大利亚墨尔本",
        food: [],
        scenicSpots: [],
        trafficNumber: []
      }
    ]
  },
  {
    id: "悉尼",
    name: "澳大利亚悉尼",
    shortName: "悉尼",
    trips: [
      {
        content: "澳大利亚悉尼",
        food: [],
        scenicSpots: [],
        trafficNumber: []
      }
    ]
  },
  {
    id: "烟台",
    name: "山东省烟台市",
    shortName: "烟台",
    trips: [
      {
        content: "山东烟台",
        size: "large",
        timestamp: "2026-09-25 - 2026-09-25",
        type: "primary",
        icon: "train",
        food: [],
        scenicSpots: ["渤海钻珠渤海渡轮"],
        trafficNumber: [
          {
            number: "C6597",
            time: "09.25 11:08 - 02.21 11:21",
            area: "威海北站 - 牟平站"
          }
        ]
      }
    ],
    lng: 121.377082,
    lat: 37.556517,
    polygon: "山东省烟台市"
  },
  {
    id: "温州",
    name: "浙江省温州市五马街",
    shortName: "温州",
    trips: [
      {
        content: "温州",
        size: "large",
        timestamp: "2025-09-14",
        type: "primary",
        icon: "car",
        color: "#0bbd87",
        food: ["老温州·温州菜"],
        scenicSpots: ["五马街"],
        trafficNumber: []
      }
    ],
    lng: 120.658243,
    lat: 28.011802,
    polygon: "浙江省温州市"
  },
  {
    id: "埼玉县春日部",
    name: "日本埼玉县春日部",
    shortName: "埼玉县春日部",
    trips: [
      {
        content: "日本埼玉县春日部",
        size: "large",
        timestamp: "2025-07-26",
        type: "primary",
        icon: "train",
        color: "#0bbd87",
        poster: "https://cdn.sanghangning.cn/ai-images/jpcrb.png",
        food: [],
        scenicSpots: ["蜡笔小新胜地巡礼", "情报发信站", "乡土资料馆", "lala garden商场（遇到了路演的男团）", "风间家", "春日部市役所"],
        trafficNumber: [
          {
            number: "[JJ]常磐线",
            time: "07.26"
          },
          {
            number: "[TS]东武晴空塔线",
            time: "07.26"
          }
        ]
      }
    ],
    lng: 139.752778,
    lat: 35.975556
  },
  {
    id: "贵州省",
    name: "贵州省",
    shortName: "贵州省",
    trips: [
      {
        content: "贵州省",
        size: "large",
        timestamp: "2024-10-01 - 2024-10-08",
        type: "primary",
        poster: "https://cdn.sanghangning.cn/ai-images/cngz.png",
        icon: "plane",
        color: "#0bbd87",
        food: ["羊肉粉", "牛肉粉", "烙锅", "丝娃娃", "牛瘪火锅", "酸汤鱼", "酸汤火锅", "1元猪肉串", "折耳根烤鱼", "香酥鸭", "火腿月饼", "爆炸土豆饼"],
        scenicSpots: ["黔灵山", "夜郎谷", "千户苗寨", "小七孔", "黄果树大瀑布", "万峰顶", "织金洞", "织金大侠谷"],
        trafficNumber: [
          {
            number: "G1331",
            time: "10.01 15:06 - 10.01 22:40",
            area: "杭州东 - 贵阳北"
          },
          {
            number: "河北航空 NS3280",
            time: "10.08 07:55 - 10.08 10:10",
            area: "贵阳龙洞堡机场 - 杭州萧山国际机场"
          }
        ]
      }
    ]
  },
  {
    id: "临海-仙居",
    name: "临海/仙居",
    shortName: "临海/仙居",
    trips: [
      {
        content: "临海/仙居",
        size: "large",
        timestamp: "2024-01-13 - 2024-01-14",
        type: "primary",
        icon: "car",
        color: "#0bbd87",
        food: ["蛋清羊尾", "海苔饼", "荣小馆", "轰炸大鱿鱼", "乌饭麻糍"],
        scenicSpots: ["紫阳街", "神仙居"],
        trafficNumber: []
      }
    ]
  },
  {
    id: "潮汕地区",
    name: "潮汕地区",
    shortName: "潮汕地区",
    trips: [
      {
        content: "潮汕地区",
        size: "large",
        timestamp: "2023-10-03 - 2023-10-05",
        type: "primary",
        poster: "https://cdn.sanghangning.cn/ai-images/cncs.png",
        icon: "train",
        trafficNumber: [
          {
            number: "D7165",
            time: "10.3 20:10 - 10.3 23:16",
            area: "广州东 - 潮汕"
          },
          {
            number: "D7157",
            time: "10.5 12:21 - 10.5 12:50",
            area: "潮汕 - 汕头"
          }
        ],
        food: [
          "潮汕牛肉火锅",
          "生腌",
          "杏仁茶",
          "芝麻茶",
          "腐乳鸡翅",
          "猪脚圈",
          "生腌",
          "牛肉炒粿条",
          "粿条汤",
          "卤鹅",
          "反沙",
          "油柑汁",
          "甘蔗汁",
          "天地壹号",
          "无米粿",
          "咸水粿",
          "笋粿",
          "水晶球",
          "芋泥粿",
          "沙茶粿",
          "红桃粿",
          "薯粿",
          "鼠壳粿",
          "萝卜粿",
          "黄豆粿",
          "鲎粿",
          "粽球",
          "龟苓膏",
          "白粥"
        ],
        scenicSpots: ["潮州石牌坊", "潮州广济桥", "汕头小公园"],
        color: "#0bbd87"
      }
    ]
  },
  {
    id: "嘉兴",
    name: "浙江省嘉兴市",
    shortName: "嘉兴",
    trips: [
      {
        content: "嘉兴",
        scenicSpots: ["海宁盐官观潮公园"],
        food: ["肉粽", "嘉兴冷饮"],
        size: "large",
        timestamp: "2023-08-05",
        type: "primary",
        icon: "car",
        color: "#0bbd87"
      }
    ],
    lng: 120.560029,
    lat: 30.4827,
    polygon: "浙江省嘉兴市"
  },
  {
    id: "todo",
    name: "待补充...",
    shortName: "待补充...",
    trips: [
      {
        content: "待补充...",
        size: "normal"
      }
    ]
  },
  {
    id: "玉山",
    name: "江西省玉山",
    shortName: "玉山",
    lng: 118.251563,
    lat: 28.691045,
    polygon: "江西省上饶市"
  },
  {
    id: "黄山",
    name: "安徽省黄山市",
    shortName: "黄山",
    lng: 118.345436,
    lat: 29.724649,
    polygon: "安徽省黄山市"
  },
  {
    id: "宁海",
    name: "浙江省宁海市",
    shortName: "宁海",
    lng: 121.433558,
    lat: 29.294065
  },
  {
    id: "奉化",
    name: "浙江省奉化市",
    shortName: "奉化",
    lng: 121.201382,
    lat: 29.693029
  },
  {
    id: "文昌",
    name: "海南省文昌市文昌站",
    shortName: "文昌",
    lng: 110.751541,
    lat: 19.611148,
    polygon: "海南省文昌市"
  },
  {
    id: "婺源",
    name: "江西省婺源市",
    shortName: "婺源",
    lng: 117.86787,
    lat: 29.254795
  },
  {
    id: "宁德",
    name: "福建省宁德市",
    shortName: "宁德",
    lng: 119.548,
    lat: 26.6662,
    polygon: "福建省宁德市"
  },
  {
    id: "舟山",
    name: "浙江省舟山市",
    shortName: "舟山",
    lng: 122.207233,
    lat: 29.99016,
    polygon: "浙江省舟山市"
  },
  {
    id: "义乌",
    name: "浙江省义乌市",
    shortName: "义乌",
    lng: 120.084457,
    lat: 29.310898
  },
  {
    id: "横店",
    name: "浙江省横店市",
    shortName: "横店",
    lng: 120.299243,
    lat: 29.163333
  },
  {
    id: "温岭",
    name: "浙江省温岭市",
    shortName: "温岭",
    lng: 121.393737,
    lat: 28.378418
  },
  {
    id: "宣城",
    name: "安徽省宣城市",
    shortName: "宣城",
    lng: 118.758654,
    lat: 30.940773,
    polygon: "安徽省宣城市"
  },
  {
    id: "黔东南苗族侗族自治州榕江",
    name: "贵州省黔东南苗族侗族自治州榕江县",
    shortName: "黔东南苗族侗族自治州榕江",
    polygon: "贵州省黔东南苗族侗族自治州榕江县"
  }
]

export const cities: [string, number, number][] = travelPlaces
  .filter((p): p is TravelPlace & { lng: number; lat: number } =>
    typeof p.lng === 'number' && typeof p.lat === 'number'
  )
  .map((p) => [p.name, p.lng, p.lat])

export const cityPolygons: { name: string }[] = travelPlaces
  .filter((p) => Boolean(p.polygon))
  .map((p) => ({ name: p.polygon! }))

/** 概览相册：有 overview 的条目，顺序与 travelPlaces 数组一致 */
export const overviewItems: { src: string; name: string; video?: string }[] =
  travelPlaces
    .filter((p) => Boolean(p.overview?.src))
    .map((p) => ({
      src: p.overview!.src,
      name: p.overviewPrefix ? `${p.overviewPrefix}${p.shortName}` : p.shortName,
      ...(p.overview!.video ? { video: p.overview!.video } : {}),
    }))

/** 解析行程开始时间；无 timestamp 的计划中排最前，「待补充」排最后 */
function tripStartTime(trip: { timestamp?: string; content?: string }): number {
  if (trip.content?.includes('待补充')) return Number.NEGATIVE_INFINITY
  const timestamp = trip.timestamp
  if (!timestamp?.trim()) return Number.POSITIVE_INFINITY
  // 区间用 " - " 分隔，避免拆开日期里的 -
  const start = timestamp.split(' - ')[0]?.trim() ?? timestamp.trim()
  // 修正笔误 0206-xx → 2026-xx
  const normalized = start.replace(/^0206-/, '2026-')
  const yearOnly = /^(\d{4})$/.exec(normalized)
  if (yearOnly) return Date.parse(`${yearOnly[1]}-01-01`)
  const parsed = Date.parse(normalized)
  return Number.isNaN(parsed) ? Number.NEGATIVE_INFINITY : parsed
}

export const travelCalendarActivities = travelPlaces
  .flatMap((place) =>
    (place.trips ?? []).map((trip) => ({
      ...trip,
      content: trip.content ?? place.shortName,
    }))
  )
  .slice()
  .sort((a, b) => tripStartTime(b) - tripStartTime(a))
