<template>
  <div class="background-globe">
    <TravelMap3d embedded />
  </div>
</template>

<script setup lang="ts">
  import TravelMap3d from '../../travel/components/travelMap3D.vue'
</script>

<style scoped lang="less">
  .background-globe {
    position: absolute;
    inset: 0;
    z-index: 0;
    overflow: hidden;
    background: transparent;

    /* 首页地球靠右，避免与左侧文案抢视觉中心 */
    :deep(.travel-map-wrap.is-embedded .cobe-wrapper) {
      justify-content: flex-end;
      padding-right: 60px;
      padding-top: 100px;
    }

    @media screen and (max-width: 768px) {
      position: relative;
      inset: auto;
      flex: 1 1 auto;
      min-height: min(42vh, 360px);
      width: 100%;

      :deep(.travel-map-wrap.is-embedded) {
        height: 100%;
        min-height: inherit;
      }

      :deep(.travel-map-wrap.is-embedded .cobe-wrapper) {
        justify-content: center;
        padding-right: 0;
      }
    }
  }
</style>
