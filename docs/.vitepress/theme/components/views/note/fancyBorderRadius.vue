<!-- 边框圆角生成器 -->
<template>
  <div class="fancy-border-radius-wrap">
    <div
      class="shape-wrap"
      :style="{
        height: warpStyle.height + 'px',
        width: warpStyle.width + 'px',
      }"
    >
      <div
        class="shape"
        :style="{ 'border-radius': borderRadius }"
      ></div>
      <span
        class="top-handle"
        id="topHandle"
        :style="{ left: `${shapeStyle.bdTop}%` }"
        :class="{ active: active == 'top' }"
      ></span>
      <span
        class="bottom-handle"
        id="bottomHandle"
        :style="{ left: `${shapeStyle.bdBottom}%` }"
        :class="{ active: active == 'bottom' }"
      ></span>
      <span
        class="left-handle"
        id="leftHandle"
        :style="{ top: `${shapeStyle.bdLeft}%` }"
        :class="{ active: active == 'left' }"
      ></span>
      <span
        class="right-handle"
        id="rightHandle"
        :style="{ top: `${shapeStyle.bdRight}%` }"
        :class="{ active: active == 'right' }"
      ></span>
    </div>

    <ElForm
      ref="formRef"
      label-placement="left"
      label-position="left"
      :label-width="140"
    >
      <ElFormItem label="border-radius：">
        <ElInput
          v-model="borderRadius"
          disabled
        />
      </ElFormItem>
      <ElFormItem label="width：">
        <ElInputNumber
          v-model="warpStyle.width"
          :min="100"
          :max="1000"
        />
        <code>px</code>
      </ElFormItem>
      <ElFormItem label="height：">
        <ElInputNumber
          v-model="warpStyle.height"
          :min="100"
          :max="1000"
        />
        <code>px</code>
      </ElFormItem>
    </ElForm>
  </div>
</template>
<script>
  import { defineComponent } from 'vue'

  export default defineComponent({
    data() {
      return {
        warpStyle: {
          height: 400,
          width: 400,
        },
        shapeStyle: {
          bdTop: 30,
          bdBottom: 40,
          bdLeft: 30,
          bdRight: 30,
        },
        active: null,
      }
    },
    computed: {
      borderRadius() {
        return `${this.shapeStyle.bdTop}% ${100 - this.shapeStyle.bdTop}% ${
          100 - this.shapeStyle.bdBottom
        }% ${this.shapeStyle.bdBottom}% / ${this.shapeStyle.bdLeft}% ${
          this.shapeStyle.bdRight
        }% ${100 - this.shapeStyle.bdRight}% ${100 - this.shapeStyle.bdLeft}%`
      },
    },
    mounted() {
      let _this = this
      this.initTopHandle()
      this.initBottomHandle()
      this.initLeftHandle()
      this.initRightHandle()

      document.onmouseup = function (e) {
        _this.active = null
        document.onmousemove = null
      }
    },
    beforeDestory() {
      document.onmouseup = function (e) {
        document.onmousemove = null
      }
    },
    methods: {
      initTopHandle() {
        let div = document.getElementById('topHandle')
        div.onmousedown = (e) => {
          this.mouseMove(
            e,
            {
              x0: e.clientX || e.clientx || 0,
              y0: e.clientY || e.clienty || 0,
            },
            { ...this.shapeStyle },
            'top'
          )
        }
      },
      initBottomHandle() {
        let div = document.getElementById('bottomHandle')
        div.onmousedown = (e) => {
          this.mouseMove(
            e,
            {
              x0: e.clientX || e.clientx || 0,
              y0: e.clientY || e.clienty || 0,
            },
            { ...this.shapeStyle },
            'bottom'
          )
        }
      },
      initLeftHandle() {
        let div = document.getElementById('leftHandle')
        div.onmousedown = (e) => {
          this.mouseMove(
            e,
            {
              x0: e.clientX || e.clientx || 0,
              y0: e.clientY || e.clienty || 0,
            },
            { ...this.shapeStyle },
            'left'
          )
        }
      },
      initRightHandle() {
        let div = document.getElementById('rightHandle')
        div.onmousedown = (e) => {
          this.mouseMove(
            e,
            {
              x0: e.clientX || e.clientx || 0,
              y0: e.clientY || e.clienty || 0,
            },
            { ...this.shapeStyle },
            'right'
          )
        }
      },
      mouseMove(e0, { x0, y0 }, { bdTop, bdBottom, bdLeft, bdRight }, type) {
        let _this = this
        this.active = type
        document.onmousemove = function (e) {
          let x1 = e.clientX || e.clientx || 0
          let y1 = e.clientY || e.clienty || 0
          let xrangepx = x1 - x0
          let xrangepercent = Math.round(
            xrangepx / (_this.warpStyle.width / 100)
          )
          let yrangepx = y1 - y0
          let yrangepercent = Math.round(
            yrangepx / (_this.warpStyle.height / 100)
          )
          if (type == 'top') {
            let percent = bdTop + xrangepercent
            _this.shapeStyle.bdTop =
              percent < 0 ? 0 : percent > 100 ? 100 : percent
          } else if (type == 'bottom') {
            let percent = bdBottom + xrangepercent
            _this.shapeStyle.bdBottom =
              percent < 0 ? 0 : percent > 100 ? 100 : percent
          } else if (type == 'left') {
            let percent = bdLeft + yrangepercent
            _this.shapeStyle.bdLeft =
              percent < 0 ? 0 : percent > 100 ? 100 : percent
          } else if (type == 'right') {
            let percent = bdRight + yrangepercent
            _this.shapeStyle.bdRight =
              percent < 0 ? 0 : percent > 100 ? 100 : percent
          }
        }
      },
    },
  })
</script>
<style lang="scss" scoped>
  .fancy-border-radius-wrap {
    display: flex;
    flex-direction: column;
    // align-items: center;
    padding-top: 2rem;

    .shape-wrap {
      position: relative;
      margin-bottom: 20px;
      background-image: url('https://cdn.chenyingshuang.cn/notes/transparent_bg.png');

      .shape {
        width: 100%;
        height: 100%;
        background: #3eaf7c;
        background-image: linear-gradient(45deg, #ffef5e 0%, #3eaf7c 100%);
        box-shadow: -10vmin 10vmin #ffffff12;
      }

      .top-handle,
      .bottom-handle,
      .left-handle,
      .right-handle {
        display: block;
        position: absolute;
        cursor: pointer;
        width: 2.5rem;
        height: 2.5rem;

        &::before {
          content: '';
          position: absolute;
          width: 1rem;
          height: 1rem;
          left: 0.75rem;
          top: 0.75rem;
          background: #ffffff;
          border: 2px solid #000022;
          transition: box-shadow 0.2s ease-out;
          will-change: box-shadow;
        }

        &:hover::before,
        &.active::before {
          background: #0ff;
          box-shadow: 0 0 0 4px #000;
          border: 2px solid #000022;
        }
      }

      .top-handle {
        top: -1.25rem;
        transform: translate(-50%);
      }

      .bottom-handle {
        bottom: -1.25rem;
        transform: translate(-50%);
      }

      .left-handle {
        left: -1.25rem;
        transform: translateY(-50%);
      }

      .right-handle {
        right: -1.25rem;
        transform: translateY(-50%);
      }
    }

    :deep(.el-form) {
      width: 600px;
      position: relative;
      margin-top: 2rem;

      .el-form-item__content {
        display: flex;

        code {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 40px;
          position: relative;
          margin-left: 10px;
          font-size: 16px;
        }

        > .el-input {
          .el-input__wrapper {
            color: #002 !important;
            font-size: 16px;
            font-family: Ubuntu Mono, monospace;
            font-weight: 600;
            background-color: rgba(27, 31, 35, 0.05);
            input {
              color: #002 !important;
            }
          }
        }

        .el-input-number {
          flex: 1;
        }
      }
    }
  }
</style>
