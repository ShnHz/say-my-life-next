<template>
  <div class="travtel-calendar-wrap">
    <el-timeline>
      <el-timeline-item
        v-for="(activity, index) in activities"
        :key="index"
        :icon="activity.icon"
        :type="activity.type"
        :color="activity.color"
        :size="activity.size"
        :hollow="activity.hollow"
        :timestamp="activity.timestamp"
      >
        {{ activity.content }}
        <div
          class="scenic-spots-list"
          v-if="activity.scenicSpots && activity.scenicSpots.length > 0"
        >
          <span
            v-for="(item, index) in activity.scenicSpots"
            :key="activity.timestamp + index"
          >
            {{ item }}</span
          >
        </div>
        <div
          class="food-list"
          v-if="activity.food && activity.food.length > 0"
        >
          <span
            v-for="(item, index) in activity.food"
            :key="activity.timestamp + index"
          >
            {{ item }}</span
          >
        </div>
        <div
          class="traffic-list"
          v-if="activity.trafficNumber && activity.trafficNumber.length > 0"
        >
          <div v-for="(item, index) in activity.trafficNumber">
            <span>{{ item.number }} {{ item.area }}</span>
            <span>{{ item.time }}</span>
          </div>
        </div>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { TrainProfile as Train } from '@vicons/carbon'
  import { PlaneDeparture as Plane, Car, Ship, Bus } from '@vicons/tabler'

  const activities = [
    {
      content: '新加坡',
      // size: 'large',
      // timestamp: '2023-10-27 - 2023-10-29',
      // type: 'primary',
      // icon: Train,
      // color: '#0bbd87',
      food: [],
      scenicSpots: [],
      trafficNumber: [],
      // hollow: true,
    },
    {
      content: '马来西亚',
      // size: 'large',
      // timestamp: '2023-10-27 - 2023-10-29',
      // type: 'primary',
      // icon: Train,
      // color: '#0bbd87',
      food: [],
      scenicSpots: [],
      trafficNumber: [],
      // hollow: true,
    },
    {
      content: '哈尔滨',
      // size: 'large',
      // timestamp: '2023-10-27 - 2023-10-29',
      // type: 'primary',
      // icon: Train,
      // color: '#0bbd87',
      food: [],
      scenicSpots: [],
      trafficNumber: [],
      // hollow: true,
    },
    {
      content: '延吉',
      // size: 'large',
      // timestamp: '2023-10-27 - 2023-10-29',
      // type: 'primary',
      // icon: Train,
      // color: '#0bbd87',
      food: [],
      scenicSpots: [],
      trafficNumber: [],
      // hollow: true,
    },
    {
      content: '青岛',
      // size: 'large',
      // timestamp: '2023-10-27 - 2023-10-29',
      // type: 'primary',
      // icon: Train,
      // color: '#0bbd87',
      food: [],
      scenicSpots: [],
      trafficNumber: [],
      // hollow: true,
    },
    {
      content: '郑州',
      // size: 'large',
      // timestamp: '2023-10-27 - 2023-10-29',
      // type: 'primary',
      // icon: Train,
      // color: '#0bbd87',
      food: [],
      scenicSpots: [],
      trafficNumber: [],
      // hollow: true,
    },
    {
      content: '日本东京',
      // size: 'large',
      // timestamp: '2023-10-27 - 2023-10-29',
      // type: 'primary',
      // icon: Train,
      // color: '#0bbd87',
      food: [],
      scenicSpots: [],
      trafficNumber: [],
      // hollow: true,
    },
    {
      content: '日本大阪',
      // size: 'large',
      // timestamp: '2023-10-27 - 2023-10-29',
      // type: 'primary',
      // icon: Train,
      // color: '#0bbd87',
      food: [],
      scenicSpots: [],
      trafficNumber: [],
      // hollow: true,
    },
    {
      content: '香港',
      size: 'large',
      timestamp: '2025-02-03 - 2025-02-05',
      type: 'primary',
      icon: Train,
      color: '#0bbd87',
      food: [
        '好盛冰室',
        '一乐烧鹅',
        '柠檬冰室',
        '迪士尼皇家宴会餐厅',
        '迪士尼火箭餐厅',
        '迪士尼冰条',
      ],
      scenicSpots: [
        'H2观光线',
        '铜锣湾',
        '星光大道',
        '维多利亚港',
        '中环',
        '香港迪士尼',
        '香港机场',
      ],
      trafficNumber: [
        {
          number: 'G5615 复兴号',
          time: '02.03 09:17 - 02.03 09:43',
          area: '深圳北 - 香港西九龙',
        },
        {
          number: '国泰航空CX962',
          time: '02.05 16:00 - 02.05 18:17',
          area: '香港国际机场 - 杭州萧山国际机场',
        },
      ],
      // hollow: true,
    },
    {
      content: '澳门',
      size: 'large',
      timestamp: '2025-02-02',
      type: 'primary',
      icon: Ship,
      food: ['牛杂', '咖喱鱼蛋', '兰香阁', '盈晖海鲜酒家', '安德鲁蛋挞'],
      scenicSpots: [
        '永利大皇宫',
        '伦敦人',
        '威尼斯人',
        '新葡京',
        '葡京',
        '美高梅',
        '美高梅美狮',
        '大三巴',
        '大炮台',
        '老永利发财树',
      ],
      // hollow: true,
      trafficNumber: [
        {
          number: '',
          time: '02.02 08:30 - 02.02 09:30',
          area: '深圳蛇口 - 澳门凼仔',
        },
        {
          number: '',
          time: '02.02 20:30 - 02.02 21:30',
          area: '澳门凼仔 - 深圳蛇口',
        },
      ],
      color: '#0bbd87',
    },
    {
      content: '泉州',
      size: 'large',
      timestamp: '2025-02-01',
      type: 'primary',
      icon: Train,
      color: '#0bbd87',
      food: ['面线糊', '牛肉馆', '姜母鸭'],
      scenicSpots: ['开元寺', '钟楼', '天后宫'],
      trafficNumber: [
        {
          number: 'G1353',
          time: '01.31 15:55 - 01.31 16:07',
          area: '玉山南 - 上饶',
        },
        {
          number: 'G321',
          time: '01.31 16:36 - 01.31 18:21',
          area: '上饶 - 泉州',
        },
      ],
      // hollow: true,
    },
    {
      content: '景德镇',
      size: 'large',
      timestamp: '2024-11-07 - 2024-11-09',
      type: 'primary',
      icon: Bus,
      color: '#0bbd87',
      food: ['回家吃饭', '小黄鱼', '欧记排挡', '兄弟记'],
      scenicSpots: ['陶溪川', '中国陶瓷博物馆'],
      trafficNumber: [],
      // hollow: true,
    },
    {
      content: '贵州省',
      size: 'large',
      timestamp: '2024-10-01 - 2024-10-08',
      type: 'primary',
      icon: Plane,
      color: '#0bbd87',
      food: [
        '羊肉粉',
        '牛肉粉',
        '烙锅',
        '丝娃娃',
        '牛瘪火锅',
        '酸汤鱼',
        '酸汤火锅',
        '1元猪肉串',
        '折耳根烤鱼',
        '香酥鸭',
        '火腿月饼',
        '爆炸土豆饼',
      ],
      scenicSpots: [
        '黔灵山',
        '夜郎谷',
        '千户苗寨',
        '小七孔',
        '黄果树大瀑布',
        '万峰顶',
        '织金洞',
        '织金大侠谷',
      ],
      trafficNumber: [
        {
          number: 'G1331',
          time: '10.01 15:06 - 10.01 22:40',
          area: '杭州东 - 贵阳北',
        },
        {
          number: '河北航空 NS3280',
          time: '10.08 07:55 - 10.08 10:10',
          area: '贵阳龙洞堡机场 - 杭州萧山国际机场',
        },
      ],
      // hollow: true,
    },
    {
      content: '济州岛',
      size: 'large',
      timestamp: '2024-07-27 - 2024-07-30',
      type: 'primary',
      icon: Plane,
      color: '#0bbd87',
      food: [
        '一品豆腐锅',
        '烤带鱼',
        '海女包饭',
        '紫菜包饭',
        '泡菜',
        '花生冰淇淋',
        'bhc炸鸡',
      ],
      scenicSpots: [
        '济州市区',
        '西归浦市',
        '柱状理节带',
        '偶来市场',
        '东门市场',
        '牛岛助力自行车/快艇',
        '咸德海滨浴场',
        '七星街',
        '免税店',
      ],
      trafficNumber: [
        {
          number: '长龙航空 GJ8940',
          time: '07.27 18:50 - 07.27 22:20',
          area: '杭州萧山国际机场 - 韩国济州岛国际机场',
        },
        {
          number: '春秋航空 9C8623',
          time: '07.30 22:35 - 07.30 23:05',
          area: '韩国济州岛国际机场 - 杭州萧山国际机场',
        },
      ],
      // hollow: true,
    },
    {
      content: '南昌',
      size: 'large',
      timestamp: '2024-03-23 - 2024-03-24',
      type: 'primary',
      icon: Train,
      color: '#0bbd87',
      food: [
        '白糖糕',
        '三杯鸡',
        '香辣鱼尾',
        '帝皇烤卤',
        '茼蒿炒腊肉',
        '黄豆鸡脚',
        '洪都大拇指',
        '瓦罐汤',
        '拌粉',
        '炒粉',
      ],
      scenicSpots: ['滕王阁', '江西博物馆', '八一广场', '万寿宫'],
      trafficNumber: [
        {
          number: 'G1641',
          time: '03.23 08:06 - 03.23 11:00',
          area: '杭州东 - 南昌西',
        },
      ],
      // hollow: true,
    },
    {
      content: '临海/仙居',
      size: 'large',
      timestamp: '2024-01-13 - 2024-01-14',
      type: 'primary',
      icon: Car,
      color: '#0bbd87',
      food: ['蛋清羊尾', '海苔饼', '荣小馆', '轰炸大鱿鱼', '乌饭麻糍'],
      scenicSpots: ['紫阳街', '神仙居'],
      trafficNumber: [],
      // hollow: true,
    },
    {
      content: '苏州',
      size: 'large',
      timestamp: '2023-12-30',
      type: 'primary',
      icon: Car,
      color: '#0bbd87',
      food: ['苏城家宴', '醉蟹', '狮子头', '烧汁茄子', '烤鸭', '熏鱼'],
      scenicSpots: ['拙政园', '狮子林', '平江路', '平江路摇橹船'],
      trafficNumber: [],
      // hollow: true,
    },
    {
      content: '湖州',
      size: 'large',
      timestamp: '2023-12-17',
      type: 'primary',
      icon: Car,
      color: '#0bbd87',
      food: ['羊肉面', '周生记鸡爪'],
      scenicSpots: ['莫干山', '状元街', '小西街', '衣裳街'],
      trafficNumber: [],
      // hollow: true,
    },
    {
      content: '福州',
      size: 'large',
      timestamp: '2023-10-27 - 2023-10-29',
      type: 'primary',
      icon: Train,
      color: '#0bbd87',
      food: [
        '鱼丸',
        '肉片',
        '福屿伟榕捞化',
        '朱富贵海鲜火锅',
        '花生汤',
        '花生浆',
        '锅边糊',
      ],
      scenicSpots: ['福州国家森林公园', '三坊七巷'],
      trafficNumber: [
        {
          number: 'G1641',
          time: '10.27 19:03 - 10.27 22:49',
          area: '杭州南 - 福州',
        },
      ],
      // hollow: true,
    },
    {
      content: '福州',
      size: 'large',
      timestamp: '2023-10-27 - 2023-10-29',
      type: 'primary',
      icon: Train,
      color: '#0bbd87',
      food: [
        '鱼丸',
        '肉片',
        '福屿伟榕捞化',
        '朱富贵海鲜火锅',
        '花生汤',
        '花生浆',
        '锅边糊',
      ],
      scenicSpots: ['福州国家森林公园', '三坊七巷'],
      trafficNumber: [
        {
          number: 'G1641',
          time: '10.27 19:03 - 10.27 22:49',
          area: '杭州南 - 福州',
        },
      ],
      // hollow: true,
    },
    {
      content: '香港',
      size: 'large',
      timestamp: '2023-10-08 - 2023-10-09',
      type: 'primary',
      icon: Train,
      color: '#0bbd87',
      food: ['九龙冰室', '叉烧包'],
      scenicSpots: ['H1观光线', '铜锣湾', '星光大道', '维多利亚港'],
      trafficNumber: [
        {
          number: 'G5639 动感号',
          time: '10.8 09:33 - 10.8 09:52',
          area: '深圳北 - 香港西九龙',
        },
      ],
      // hollow: true,
    },
    {
      content: '澳门',
      size: 'large',
      timestamp: '2023-10-07',
      type: 'primary',
      icon: Ship,
      food: ['招牌蒲国鸡饭', '柠檬车露雪糕', '安德鲁蛋挞', '旺记咖啡奶茶'],
      scenicSpots: [
        '永利大皇宫',
        '伦敦人',
        '威尼斯人',
        '新葡京',
        '老普京',
        '议事厅前地广场',
        '玫瑰圣母堂',
        '关前老街',
        '大三巴',
        '大炮台',
        '疯堂斜巷',
        '老永利发财树',
        '官也街',
        '银河综合度假城',
      ],
      // hollow: true,
      trafficNumber: [
        {
          number: '迅隆7',
          time: '10.7 08:00 - 10.7 09:00',
          area: '深圳蛇口 - 澳门凼仔',
        },
      ],
      color: '#0bbd87',
    },
    {
      content: '深圳',
      size: 'large',
      timestamp: '2023-10-06',
      type: 'primary',
      icon: Train,
      food: ['叉烧包', '猪脚饭', '粥底火锅'],
      scenicSpots: ['盐田坐车游', '中英街', '深圳湾公园'],
      // hollow: true,
      trafficNumber: [
        {
          number: 'G6004',
          time: '10.6 06:51 - 10.6 09:02',
          area: '汕头 - 深圳北',
        },
      ],
      color: '#0bbd87',
    },
    {
      content: '潮汕地区',
      size: 'large',
      timestamp: '2023-10-03 - 2023-10-05',
      type: 'primary',
      icon: Train,
      trafficNumber: [
        {
          number: 'D7165',
          time: '10.3 20:10 - 10.3 23:16',
          area: '广州东 - 潮汕',
        },
        {
          number: 'D7157',
          time: '10.5 12:21 - 10.5 12:50',
          area: '潮汕 - 汕头',
        },
      ],
      // hollow: true,
      food: [
        '潮汕牛肉火锅',
        '生腌',
        '杏仁茶',
        '芝麻茶',
        '腐乳鸡翅',
        '猪脚圈',
        '生腌',
        '牛肉炒粿条',
        '粿条汤',
        '卤鹅',
        '反沙',
        '油柑汁',
        '甘蔗汁',
        '天地壹号',
        '无米粿',
        '咸水粿',
        '笋粿',
        '水晶球',
        '芋泥粿',
        '沙茶粿',
        '红桃粿',
        '薯粿',
        '鼠壳粿',
        '萝卜粿',
        '黄豆粿',
        '鲎粿',
        '粽球',
        '龟苓膏',
        '白粥',
      ],
      scenicSpots: ['潮州石牌坊', '潮州广济桥', '汕头小公园'],
      color: '#0bbd87',
      // https://zhuanlan.zhihu.com/p/51906896
    },
    {
      content: '广州',
      size: 'large',
      timestamp: '2023-10-02',
      type: 'primary',
      icon: Plane,
      food: [
        '早茶（陶陶居）',
        '粤菜（小荔园）',
        '顺德菜（大榕树下）',
        '西士多',
        '牛杂',
        '奶茶',
        '咖喱鱼蛋',
        '烤乳鸽',
        '煲仔饭',
        '烧鸭',
        '养生汤',
        '鱼皮',
        '肠粉',
        '红米肠',
        '大油条配粥',
        '双皮奶',
        '叉烧包',
        '凤爪',
        '蒸排骨',
        '干炒牛河',
        '黑叉烧',
        '白切鸡',
      ],
      scenicSpots: ['夜游珠江', '城中村', '广州塔', '海心桥', '广东省博物馆'],
      // hollow: true,
      trafficNumber: [
        {
          number: 'CZ3522(波音787)',
          time: '10.2 11:35 - 10.2 13:40',
          area: '杭州萧山 - 广州白云',
        },
      ],
      color: '#0bbd87',
    },
    {
      content: '常州',
      size: 'large',
      timestamp: '2023-09-30',
      type: 'primary',
      food: ['卜記家常菜(土城路店)'],
      scenicSpots: ['太湖音乐节', '灵山大佛'],
      icon: Car,
      color: '#0bbd87',
      // hollow: true,
    },
    // {
    //   content: '宣城',
    //   size: 'normal',
    //   timestamp: '2023-09',
    //   type: 'warning',
    //   // icon: Car,
    //   hollow: true,
    // },
    {
      content: '嘉兴',
      scenicSpots: ['海宁盐官观潮公园'],
      food: ['肉粽', '嘉兴冷饮'],
      size: 'large',
      timestamp: '2023-08-05',
      type: 'primary',
      icon: Car,
      color: '#0bbd87',
    },
    {
      content: '武汉',
      scenicSpots: ['黄鹤楼'],
      food: ['牛肉粉', '藕汤'],
      size: 'large',
      timestamp: '2023-07-21 20:15 - 2023-07-22',
      type: 'primary',
      icon: Train,
      color: '#0bbd87',
    },
    {
      content: '宜昌',
      scenicSpots: ['两坝一峡游船', '三峡大坝'],
      food: ['凉虾', '奶汤肥鱼', '矮子馅饼'],
      size: 'large',
      timestamp: '2023-07-21 04:56 - 2023-07-21 07:07',
      type: 'primary',
      icon: Train,
      color: '#0bbd87',
    },
    {
      content: '武汉',
      scenicSpots: [
        '江汉路步行街',
        '汉口江滩',
        '长江轮渡',
        '武汉长江大桥',
        '户部巷',
        '夜游长江游船',
      ],
      food: ['热干面', '豆皮', '茶颜悦色', '周黑鸭'],
      size: 'large',
      timestamp: '2023-07-20 10:10 - 2023-07-20 14:43',
      type: 'primary',
      icon: Train,
      color: '#0bbd87',
    },
    {
      content: '扬州',
      scenicSpots: ['澡堂', '瘦西湖', '中国大运河博物馆', '搓脚'],
      food: ['扬州炒饭', '大煮干丝', '扬大酸奶'],
      size: 'large',
      timestamp: '2023-05-02 - 2023-05-03',
      type: 'primary',
      icon: Car,
      color: '#0bbd87',
    },
    {
      content: '溧阳',
      scenicSpots: ['南山竹海', '溧阳一号公路'],
      size: 'large',
      timestamp: '2023-05-02',
      type: 'primary',
      icon: Car,
      color: '#0bbd87',
    },
    {
      content: '待补充...',
      size: 'normal',
    },
  ]
</script>

<style scoped lang="less">
  .travtel-calendar-wrap {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    :deep(.el-timeline) {
      --el-timeline-node-size-large: 20px;
      .el-timeline-item__content {
      }
      .el-timeline-item__tail {
        top: 8px;
      }
      .el-timeline-item__node {
        overflow: hidden;
      }
      .el-timeline-item__node--large {
        left: -5px;
        .el-timeline-item__icon {
          font-size: 18px;
          left: -4px;
        }
      }
      li {
        list-style: none;
        .food-list,
        .scenic-spots-list {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin: 4px 0;
          span {
            display: flex;
            align-items: center;
            &:first-child {
              &::before {
                display: none;
              }
            }
            &::before {
              content: '';
              display: block;
              height: 8px;
              width: 1px;
              background: var(--vp-c-text-1);
              margin-right: 10px;
            }
          }
        }
        .traffic-list {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          div {
            display: flex;
            flex-direction: column;
            position: relative;
            padding: 0 7px;
            background-color: var(--vp-c-bg-alt);
            border-radius: 2px;
            > span:last-child {
              margin-top: -8px;
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    .travtel-calendar-wrap {
    }
  }
</style>
