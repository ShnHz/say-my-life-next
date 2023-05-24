<template>
  <div
    v-clickoutside="clickoutside"
    :class="{ show: show, unlock: !lock }"
    class="lock-password-input-wrap"
  >
    <i
      :class="{
        center: lock,
        left: !lock,
        error: error,
        'shake-slow shake-constant shake-constant--hover': shake && error,
      }"
      class="gnas-i gnas-i-lock"
    ></i>
    <i
      :class="{ center: !lock, right: lock }"
      class="gnas-i gnas-i-unlock"
    ></i>
    <div
      :class="{ hide: !lock }"
      @click="inputFocus"
      class="code-input-main"
    >
      <div class="code-input-main-item">{{ code[0] ? '*' : '' }}</div>
      <div class="code-input-main-item">{{ code[1] ? '*' : '' }}</div>
      <div class="code-input-main-item">{{ code[2] ? '*' : '' }}</div>
      <div class="code-input-main-item">{{ code[3] ? '*' : '' }}</div>
    </div>
    <input
      maxlength="4"
      ref="input"
      type="tel"
      v-model="code"
    />
  </div>
</template>
<script>
  import md5 from 'js-md5'
  import { defineComponent } from 'vue'
  import { useData } from 'vitepress'
</script>
<style lang="less" scoped>
  .lock-password-input-wrap:focus-within {
    box-shadow: 0 0px 16px 4px var(--vp-c-brand-lightest);
    border: 2px solid var(--vp-c-brand-lighter);
  }
  .lock-password-input-wrap {
    z-index: 9999;
    cursor: pointer;
    width: 200px;
    height: 160px;
    position: fixed;
    top: -230px;
    left: 50%;
    padding: 50px 20px 20px;
    text-align: center;
    background: #fff;
    border-radius: 30px;
    border: 2px solid #fff;
    box-shadow: 0 0 16px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.4s ease;
    overflow: hidden;

    i {
      font-size: 28px;
      transition: all 0.4s ease;

      &.center {
        position: absolute;
        left: 50%;
        margin-left: -14px;
      }

      &.left {
        position: absolute;
        left: -20px;
        margin-left: -14px;
      }

      &.right {
        position: absolute;
        left: 220px;
        margin-left: -14px;
      }

      &.error {
        color: #f56c6c;
      }

      &.gnas-i-unlock {
        color: #67c23a;
      }
    }

    &.show {
      top: -30px;
    }

    &.unlock {
      height: 110px;
    }

    input {
      position: relative;
      opacity: 0;
      top: 0;
      margin: 0 auto;
    }

    .code-input-main {
      position: relative;
      top: 0;
      width: 100%;
      margin: 40px auto 0;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.4s ease;

      &.hide {
        top: 30px;
      }

      .code-input-main-item {
        width: 50px;
        height: 50px;
        margin: 0 10px;
        text-align: center;
        padding-bottom: 0;
        font-size: 30px;
        color: #000;
        border-bottom: 1px solid #ccc;
      }
    }
  }
</style>
