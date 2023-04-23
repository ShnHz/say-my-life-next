<template>
  <div class="background-wrap"></div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
  .background-wrap {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    background-image: url(https://cdn.chenyingshuang.cn/index/manbg.png);
    background-repeat: no-repeat;
    background-size: auto 115%;
    background-position: 95% center;
    &::before {
      content: '';
      position: absolute;
      right: -20vh;
      bottom: -20vh;
      z-index: -1;
      height: 120vh;
      width: 120vh;
      border-radius: 9999px;
      background-color: var(--bg-1);
    }
  }
</style>
