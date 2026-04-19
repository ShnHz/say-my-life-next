<template>
  <div class="travtel-map">
    <TravelMap2d v-if="type === 'travelMap'" />
    <TravelMap3d v-else :overview-items="overviewItems" />
    <el-radio-group
      class="map-type-radio"
      v-model="type"
    >
      <el-radio-button label="travelMap">2D</el-radio-button>
      <el-radio-button label="travelMap3D">3D</el-radio-button>
    </el-radio-group>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import TravelMap2d from './components/travelMap.vue'
  import TravelMap3d from './components/travelMap3D.vue'

  interface TravelOverviewItem {
    name: string
    src: string
    video?: string
  }

  defineProps<{ overviewItems?: TravelOverviewItem[] }>()

  const type = ref('travelMap')
</script>

<style lang="less">
  .travtel-map {
    height: calc(100vh - var(--vp-nav-height));
    position: relative;
    .map-type-radio {
      position: absolute;
      top: 20px;
      right: 20px;
    }
    .road-trip-line-switch {
      position: absolute;
      top: 60px;
      right: 20px;
    }
  }
</style>
