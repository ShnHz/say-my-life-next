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
        <p
          class="scenic-spots-list"
          v-if="activity.scenicSpots && activity.scenicSpots.length > 0"
        >
          <span
            v-for="(item, index) in activity.scenicSpots"
            :key="activity.timestamp + index"
          >
            {{ item }}</span
          >
        </p>
        <p
          class="food-list"
          v-if="activity.food && activity.food.length > 0"
        >
          <span
            v-for="(item, index) in activity.food"
            :key="activity.timestamp + index"
          >
            {{ item }}</span
          >
        </p>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { TrainProfile as Train } from '@vicons/carbon'
  import { PlaneDeparture as Plane, Car } from '@vicons/tabler'

  const activities = [
    {
      content: '香港',
      size: 'normal',
      timestamp: '2023-11',
      type: 'warning',
      // icon: Train,
      hollow: true,
    },
    {
      content: '深圳',
      size: 'normal',
      timestamp: '2023-10',
      type: 'warning',
      // icon: Train,
      hollow: true,
    },
    {
      content: '潮汕',
      size: 'normal',
      timestamp: '2023-10',
      type: 'warning',
      // icon: Train,
      hollow: true,
    },
    {
      content: '佛山',
      size: 'normal',
      timestamp: '2023-10',
      type: 'warning',
      // icon: Train,
      hollow: true,
    },
    {
      content: '广州',
      size: 'normal',
      timestamp: '2023-10',
      type: 'warning',
      // icon: Plane,
      hollow: true,
    },
    {
      content: '常州',
      size: 'normal',
      timestamp: '2023-10',
      type: 'warning',
      // icon: Car,
      hollow: true,
    },
    {
      content: '宣城',
      size: 'normal',
      timestamp: '2023-09',
      type: 'warning',
      // icon: Car,
      hollow: true,
    },
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
      }
    }
  }

  @media screen and (max-width: 768px) {
    .travtel-calendar-wrap {
    }
  }
</style>
