<template>
  <div class="lock-wrap">
    <div
      @click="showLockPasswordInput"
      class="lock-content-wrap"
    >
      <i class="gnas-i gnas-i-lock"></i>
      <p>该内容已被锁定，单击唤起输入密码面板</p>
      <p class="annotation">Ctrl + Enter 快捷键</p>
    </div>
    <ClientOnly>
      <component
        is="InputLockPassword"
        ref="inputLockPassword"
      />
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import InputLockPassword from '../common/InputLockPassword.vue'

  const inputLockPassword = ref(null)
  const showLockPasswordInput = () => {
    if (inputLockPassword.value) {
      inputLockPassword.value.showLockPasswordInput()
    }
  }
</script>

<style scoped lang="less">
  .lock-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    opacity: 1;
    transition: all 0.4s linear;

    .lock-content-wrap {
      cursor: pointer;
      z-index: 0;
      line-height: 2;
      position: relative;
      text-align: center;
      i {
        font-size: 40px;
      }
      .annotation {
        color: #909399;
      }
    }
    &::after {
      z-index: -1;
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background: #fff;
      opacity: 0.97;
      filter: blur(10px);
    }

    .lock-password-input-wrap {
    }
    &.is-gnas-page {
      padding-left: 0;
      .lock-password-input-wrap {
        margin-left: -100px;
      }
    }
  }

  @media (max-width: 719px) {
    .page-lock-wrap {
      .annotation {
        display: none;
      }
    }

    .lock-password-input-wrap {
      margin-left: -100px !important;
    }
  }
</style>
