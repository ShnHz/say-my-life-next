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
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { TrainProfile } from '@vicons/carbon'
  import { PlaneDeparture, Car } from '@vicons/tabler'

  const activities = [
    {
      content: '嘉兴',
      size: 'normal',
      timestamp: '2023-08',
      type: 'warning',
      // icon: Car,
      hollow: true,
    },
    {
      content: '宣城',
      size: 'normal',
      timestamp: '2023-08',
      type: 'warning',
      // icon: Car,
      hollow: true,
    },
    {
      content: '武汉',
      size: 'large',
      timestamp: '2023-07-21 20:15 - 2023-07-21 22:05',
      type: 'primary',
      icon: TrainProfile,
      color: '#0bbd87',
    },
    {
      content: '宜昌',
      size: 'large',
      timestamp: '2023-07-21 04:56 - 2023-07-21 07:07',
      type: 'primary',
      icon: TrainProfile,
      color: '#0bbd87',
    },
    {
      content: '武汉',
      size: 'large',
      timestamp: '2023-07-20 10:10 - 2023-07-20 14:43',
      type: 'primary',
      icon: TrainProfile,
      color: '#0bbd87',
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
      .el-timeline-item__node--large {
        left: -5px;
        .el-timeline-item__icon {
          font-size: 18px;
          left: -4px;
        }
      }
      li {
        list-style: none;
      }
    }
  }

  @media screen and (max-width: 768px) {
    .travtel-calendar-wrap {
    }
  }
</style>
