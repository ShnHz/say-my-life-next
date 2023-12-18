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
  import { PlaneDeparture as Plane, Car, Ship } from '@vicons/tabler'

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
      content: '川西',
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
      content: '济州岛',
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
      content: '苏州',
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
          area: '汕头 - 深圳北',
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
      food: '卜記家常菜(土城路店)',
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
