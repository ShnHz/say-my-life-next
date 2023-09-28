<template>
  <div class="travtel-map">
    <component :is="type == 'travelMap' ? travelMap : travelMap3D" />
    <el-radio-group v-model="type">
      <el-radio-button label="travelMap">平面地图</el-radio-button>
      <el-radio-button label="travelMap3D">3D地图</el-radio-button>
    </el-radio-group>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import travelMap from './components/travelMap.vue'
  import travelMap3D from './components/travelMap3D.vue'
  const type = ref('travelMap')
</script>

<style lang="less">
  .travtel-map {
    height: calc(100vh - var(--vp-nav-height));
    position: relative;
    .el-radio-group{
      position: absolute;
      top: 20px;
      right: 20px;
    }
  }
</style>
