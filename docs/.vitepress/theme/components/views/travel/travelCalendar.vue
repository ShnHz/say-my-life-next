<template>
  <div class="travtel-calendar-wrap">
    <el-timeline>
      <el-timeline-item
        v-for="(activity, index) in activities"
        :key="index"
        :icon="activity.icon"
        :type="activity.type"
        :color="getActivityIconColor(activity)"
        :size="activity.size"
        :hollow="activity.hollow"
        :timestamp="activity.timestamp"
      >
        <span v-if="!activity.plan">{{ activity.content }}</span>
        <span></span>
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
  // @ts-nocheck — 行程数据条目字段不一致，运行时安全
  import { travelCalendarActivities as activities } from './travelCalendarData'

  const getActivityIconColor = (item) => {
    if (item.icon?.name === 'Car') {
      return '#2F2F2F	'
    } else if (item.icon?.name === 'TrainProfile') {
      return '#F7B507'
    } else if (item.icon?.name === 'PlaneDeparture') {
      return '#ADD8E6'
    } else if (item.icon?.name === 'Ship') {
      return '#003366'
    }
    return ''
  }
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
          left: -2px;
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
