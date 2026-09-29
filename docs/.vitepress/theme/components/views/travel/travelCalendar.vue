<template>
  <div class="travtel-calendar-wrap">
    <el-timeline>
      <el-timeline-item
        v-for="(activity, index) in timelineActivities"
        :key="index"
        :icon="activity.icon"
        :type="activity.type"
        :color="getActivityIconColor(activity)"
        :size="activity.size"
        :hollow="activity.hollow"
        :timestamp="activity.timestamp"
      >
        <span v-if="!activity.plan">{{ activity.content }}</span>
        <div
          class="scenic-spots-list"
          v-if="activity.scenicSpots && activity.scenicSpots.length > 0"
        >
          <span
            v-for="(item, spotIndex) in activity.scenicSpots"
            :key="(activity.timestamp ?? '') + spotIndex"
          >
            {{ item }}</span
          >
        </div>
        <div
          class="food-list"
          v-if="activity.food && activity.food.length > 0"
        >
          <span
            v-for="(item, foodIndex) in activity.food"
            :key="(activity.timestamp ?? '') + foodIndex"
          >
            {{ item }}</span
          >
        </div>
        <div
          class="traffic-list"
          v-if="activity.trafficNumber && activity.trafficNumber.length > 0"
        >
          <div
            v-for="(item, trafficIndex) in activity.trafficNumber"
            :key="activity.timestamp + '-traffic-' + trafficIndex"
          >
            <span>{{ item.number }} {{ item.area }}</span>
            <span>{{ item.time }}</span>
          </div>
        </div>

        <div
          class="poster-wrap"
          v-if="getPosterList(activity).length"
          :style="posterWrapStyle(activity)"
        >
          <el-image
            v-for="(src, posterIndex) in getPosterList(activity)"
            :key="activity.timestamp + '-poster-' + posterIndex"
            :src="src"
            :initial-index="posterIndex"
            :preview-src-list="getPosterList(activity)"
            fit="cover"
            preview-teleported
            lazy
            @load="(e) => onPosterLoad(activity, posterIndex, e)"
          />
        </div>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script setup lang="ts">
  import { computed, reactive, type Component, type CSSProperties } from 'vue'
  import { TrainProfile as Train } from '@vicons/carbon'
  import { PlaneDeparture as Plane, Car, Ship, Bus } from '@vicons/tabler'
  import {
    travelCalendarActivities,
    type TrafficIcon,
    type TravelTrip,
  } from '../../../../../public/map/js/travelPlaces'

  const iconMap: Record<TrafficIcon, Component> = {
    train: Train,
    plane: Plane,
    car: Car,
    ship: Ship,
    bus: Bus,
  }

  type CalendarActivity = Omit<TravelTrip, 'icon'> & {
    content?: string
    posters?: string[]
    icon?: Component
  }

  const timelineActivities = computed(() =>
    travelCalendarActivities.map((activity) => ({
      ...activity,
      icon: activity.icon ? iconMap[activity.icon] : undefined,
    }))
  )

  /** poster 支持 string | string[] */
  const getPosterList = (item: Pick<TravelTrip, 'poster'> & { posters?: string[] }) => {
    if (Array.isArray(item.poster) && item.poster.length) {
      return item.poster.filter(Boolean)
    }
    if (typeof item.poster === 'string' && item.poster) {
      return [item.poster]
    }
    if (item.posters?.length) return item.posters.filter(Boolean)
    return []
  }

  const posterRatioByKey = reactive<Record<string, string>>({})

  const posterKey = (activity: CalendarActivity) =>
    `${activity.content ?? ''}|${activity.timestamp ?? ''}|${getPosterList(activity)[0] ?? ''}`

  const posterWrapStyle = (activity: CalendarActivity): CSSProperties => {
    const ratio = posterRatioByKey[posterKey(activity)]
    return ratio ? { '--poster-ratio': ratio } : {}
  }

  const onPosterLoad = (
    activity: CalendarActivity,
    posterIndex: number,
    e: Event
  ) => {
    if (posterIndex !== 0) return
    const key = posterKey(activity)
    if (posterRatioByKey[key]) return
    const target = e.target as HTMLImageElement | HTMLElement | null
    const el =
      target && 'naturalWidth' in target && target.naturalWidth
        ? (target as HTMLImageElement)
        : target?.querySelector?.('img') ?? null
    const w = el?.naturalWidth
    const h = el?.naturalHeight
    if (w && h) {
      posterRatioByKey[key] = `${w} / ${h}`
    }
  }

  const getActivityIconColor = (item: {
    icon?: Component & { name?: string }
  }) => {
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
        .poster-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 10px;

          .el-image {
            width: min(200px, 100%);
            aspect-ratio: var(--poster-ratio, auto);
            height: auto;
            border-radius: 8px;
            overflow: hidden;
            flex-shrink: 0;
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
