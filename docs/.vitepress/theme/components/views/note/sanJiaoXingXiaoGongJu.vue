<!-- 三角形生成器 -->
<template>
  <div class="fancy-border-radius-wrap">
    <!-- border 实现方式 -->
    <div
      class="shape-wrap"
      :style="{
        height: warpStyle.height + 'px',
        width: warpStyle.width + 'px',
      }"
      v-if="shapeType == 'border'"
    >
      <div
        class="shape"
        :style="{ 'border-color': borderColor, 'border-width': borderWidth }"
      ></div>
    </div>
    <!-- svg 实现方式 -->
    <div
      class="shape-wrap"
      :style="{
        height:
          shapeSvg.strokeLinejoin == 'miter'
            ? warpStyle.height + 'px'
            : warpStyle.height + shapeSvg.strokeWidth + 'px',
        width:
          shapeSvg.strokeLinejoin == 'miter'
            ? warpStyle.width + 'px'
            : warpStyle.width + shapeSvg.strokeWidth + 'px',
      }"
      v-if="shapeType == 'svg'"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        :style="{
          height:
            shapeSvg.strokeLinejoin == 'miter'
              ? warpStyle.height + 'px'
              : warpStyle.height + shapeSvg.strokeWidth + 'px',
          width:
            shapeSvg.strokeLinejoin == 'miter'
              ? warpStyle.width + 'px'
              : warpStyle.width + shapeSvg.strokeWidth + 'px',
        }"
      >
        <polygon
          :points="shapeSvgPointsGroup"
          :style="{
            fill: shapeStyle.borderColor,
            stroke: shapeStyle.borderColor,
            'stroke-width':
              shapeSvg.strokeLinejoin == 'miter' ? 0 : shapeSvg.strokeWidth,
          }"
          :stroke-linejoin="shapeSvg.strokeLinejoin"
        />
      </svg>
      <div
        class="handle-wrap"
        :class="{ miter: shapeSvg.strokeLinejoin == 'miter' }"
        :style="{
          'margin-left': shapeSvg.strokeWidth / 2 + 'px',
          'margin-top': shapeSvg.strokeWidth / 2 + 'px',
        }"
      >
        <span
          class="handle handle1"
          id="handle1"
          :style="{ left: handle1Style.x + 'px', top: handle1Style.y + 'px' }"
          :class="{ active: active == 1 }"
        ></span>
        <span
          class="handle handle2"
          id="handle2"
          :style="{ left: handle2Style.x + 'px', top: handle2Style.y + 'px' }"
          :class="{ active: active == 2 }"
        ></span>
        <span
          class="handle handle3"
          id="handle3"
          :style="{ left: handle3Style.x + 'px', top: handle3Style.y + 'px' }"
          :class="{ active: active == 3 }"
        ></span>
      </div>
    </div>

    <NForm
      :label-width="140"
      label-placement="left"
      label-align="left"
    >
      <NFormItem label="type：">
        <NRadioGroup
          v-model:value="shapeType"
          @change="typeChange"
        >
          <NRadio value="svg">svg</NRadio>
          <NRadio value="border">border</NRadio>
        </NRadioGroup>
      </NFormItem>
      <NFormItem label="color：">
        <NColorPicker
          v-model:value="shapeStyle.borderColor"
          show-alpha
        ></NColorPicker>
      </NFormItem>
      <template v-if="shapeType == 'svg'">
        <NFormItem label="拐点形状：">
          <NRadioGroup v-model:value="shapeSvg.strokeLinejoin">
            <NRadio value="miter">尖点</NRadio>
            <NRadio value="round">圆点</NRadio>
            <NRadio value="bevel">平点</NRadio>
          </NRadioGroup>
        </NFormItem>
        <NFormItem
          label="拐点直径："
          v-if="shapeSvg.strokeLinejoin != 'miter'"
        >
          <NInputNumber
            v-model:value="shapeSvg.strokeWidth"
            :min="0"
            :max="warpStyle.height / 2"
            label="top"
          >
          </NInputNumber>
          <code>px</code>
        </NFormItem>
        <div v-html="code"></div>
      </template>
      <template v-if="shapeType == 'border'">
        <NFormItem label="direction：">
          <NRadioGroup
            v-model:value="shapeDirection"
            @change="shapeDirectionChange"
            class="NRadioGroup_multiline"
          >
            <NRadio value="bottom">
              bottom
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 320 512"
              >
                <path
                  d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                  fill="currentColor"
                ></path>
              </svg>
            </NRadio>
            <NRadio value="top">
              top
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 320 512"
                style="transform: rotate(180deg)"
              >
                <path
                  d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                  fill="currentColor"
                ></path>
              </svg>
            </NRadio>
            <NRadio value="left">
              left
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 320 512"
                style="transform: rotate(90deg)"
              >
                <path
                  d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                  fill="currentColor"
                ></path>
              </svg>
            </NRadio>
            <NRadio value="right">
              right
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 320 512"
                style="transform: rotate(270deg)"
              >
                <path
                  d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                  fill="currentColor"
                ></path>
              </svg>
            </NRadio>
            <NRadio value="top-left">
              top-left
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 320 512"
                style="transform: rotate(135deg)"
              >
                <path
                  d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                  fill="currentColor"
                ></path>
              </svg>
            </NRadio>
            <NRadio value="top-right">
              top-right
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 320 512"
                style="transform: rotate(225deg)"
              >
                <path
                  d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                  fill="currentColor"
                ></path>
              </svg>
            </NRadio>
            <NRadio value="bottom-left">
              bottom-left
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 320 512"
                style="transform: rotate(45deg)"
              >
                <path
                  d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                  fill="currentColor"
                ></path>
              </svg>
            </NRadio>
            <NRadio value="bottom-right">
              bottom-right
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 320 512"
                style="transform: rotate(315deg)"
              >
                <path
                  d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                  fill="currentColor"
                ></path>
              </svg>
            </NRadio>
          </NRadioGroup>
        </NFormItem>
        <NFormItem label="top：">
          <NInputNumber
            v-model:value="shapeStyle.borderTopWidth"
            :min="0"
            :max="warpStyle.height"
            label="top"
            :disabled="
              shapeDirection == 'top' ||
              shapeDirection == 'top-right' ||
              shapeDirection == 'bottom-right'
            "
          >
          </NInputNumber>
          <code>px</code>
        </NFormItem>
        <NFormItem label="right：">
          <NInputNumber
            v-model:value="shapeStyle.borderRightWidth"
            :min="0"
            :max="warpStyle.width"
            label="right"
            :disabled="
              shapeDirection == 'right' ||
              shapeDirection == 'bottom-left' ||
              shapeDirection == 'bottom-right'
            "
          >
          </NInputNumber>
          <code>px</code>
        </NFormItem>
        <NFormItem label="bottom：">
          <NInputNumber
            v-model:value="shapeStyle.borderBottomWidth"
            :min="0"
            :max="warpStyle.height"
            label="bottom"
            :disabled="
              shapeDirection == 'bottom' ||
              shapeDirection == 'top-left' ||
              shapeDirection == 'bottom-left'
            "
          >
          </NInputNumber>
          <code>px</code>
        </NFormItem>
        <NFormItem label="left：">
          <NInputNumber
            v-model:value="shapeStyle.borderLeftWidth"
            :min="0"
            :max="warpStyle.width"
            label="left"
            :disabled="
              shapeDirection == 'left' ||
              shapeDirection == 'top-right' ||
              shapeDirection == 'top-left'
            "
          >
          </NInputNumber>
          <code>px</code>
        </NFormItem>
        <div class="language-css">
          <pre
            class="shiki material-theme-palenight"
          ><code v-html="code"></code></pre>
        </div>
      </template>
    </NForm>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        warpStyle: {
          height: 400,
          width: 400,
        },
        shapeType: 'svg',
        shapeStyle: {
          borderColor: '#3eaf7c',
          borderTopWidth: 400,
          borderLeftWidth: 200,
          borderBottomWidth: 0,
          borderRightWidth: 200,
        },
        shapeSvg: {
          strokeLinejoin: 'miter',
          strokeWidth: 30,
        },
        shapeDirection: 'bottom',

        handle1Style: {
          x: 0,
          y: 0,
        },
        handle2Style: {
          x: 400,
          y: 0,
        },
        handle3Style: {
          x: 200,
          y: 400,
        },
        active: null,
      }
    },
    computed: {
      borderWidth() {
        return `${this.shapeStyle.borderTopWidth}px ${this.shapeStyle.borderRightWidth}px ${this.shapeStyle.borderBottomWidth}px ${this.shapeStyle.borderLeftWidth}px`
      },
      borderColor() {
        switch (this.shapeDirection) {
          case 'bottom':
          case 'top-left':
            return `${this.shapeStyle.borderColor} transparent transparent transparent`
          case 'top':
          case 'bottom-right':
            return `transparent transparent ${this.shapeStyle.borderColor} transparent`
          case 'left':
          case 'bottom-left':
            return `transparent transparent transparent ${this.shapeStyle.borderColor}`
          case 'right':
          case 'top-right':
            return `transparent ${this.shapeStyle.borderColor} transparent transparent`
        }
      },
      shapeSvgPointsGroup() {
        let t = 0
        if (this.shapeSvg.strokeLinejoin != 'miter') {
          t = this.shapeSvg.strokeWidth / 2
        }
        return `${this.handle1Style.x + t} ${this.handle1Style.y + t} , ${
          this.handle2Style.x + t
        } ${this.handle2Style.y + t} , ${this.handle3Style.x + t} ${
          this.handle3Style.y + t
        }`
      },
      code() {
        if (this.shapeType == 'svg') {
          return `<div class="language-html line-numbers-mode"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>svg</span> <span class="token attr-name">xmlns</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>http://www.w3.org/2000/svg<span class="token punctuation">"</span></span> <span class="token attr-name"><span class="token namespace">xmlns:</span>xlink</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>http://www.w3.org/1999/xlink<span class="token punctuation">"</span></span><span class="token style-attr language-css"><span class="token attr-name"> <span class="token attr-name">style</span></span><span class="token punctuation">="</span><span class="token attr-value"><span class="token property">height</span><span class="token punctuation">:</span> ${this.shapeStyle.height}px<span class="token punctuation">;</span> <span class="token property">width</span><span class="token punctuation">:</span> ${this.shapeStyle.width}px<span class="token punctuation">;</span></span><span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>polygon</span>
        <span class="token attr-name">points</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>${this.shapeSvgPointsGroup}<span class="token punctuation">"</span></span> 
        <span class="token attr-name">stroke-linejoin</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>${this.shapeSvg.strokeLinejoin}<span class="token punctuation">"</span></span><span class="token style-attr language-css"><span class="token attr-name"> 
        <span class="token attr-name">style</span></span><span class="token punctuation">="</span><span class="token attr-value"><span class="token property">fill</span><span class="token punctuation">:</span> <span class="token function">${this.shapeStyle.borderColor}<span class="token punctuation">;</span> </span>
<span class="token attr-value">        <span class="token property">stroke</span><span class="token punctuation">:</span> <span class="token function">${this.shapeStyle.borderColor}</span><span class="token punctuation">;</span> <span class="token property">stroke-width</span><span class="token punctuation">:</span> ${this.shapeSvg.strokeWidth}<span class="token punctuation">;</span></span><span class="token punctuation">"</span></span>
    <span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>polygon</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>svg</span><span class="token punctuation">&gt;</span></span>
</code></pre> <div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div>`
        } else if (this.shapeType == 'border') {
          return `<span class="token selector">.shape</span><span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
    <span class="token property">border-style</span><span class="token punctuation">:</span> solid<span class="token punctuation">;</span>
    <span class="token property">border-color</span><span class="token punctuation">:</span> <span class="token function">${this.borderColor};</span>
    <span class="token property">border-width</span><span class="token punctuation">:</span> ${this.borderWidth}<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
            `
        }
      },
    },
    mounted() {
      let _this = this
      this.typeChange('svg')
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
      typeChange(value) {
        if (value == 'svg') {
          this.initHandle(1)
          this.initHandle(2)
          this.initHandle(3)
        }
      },
      shapeDirectionChange(value) {
        let numList = Object.values(this.shapeStyle)
        numList.shift()
        let max = Math.max(...numList)
        let count =
          numList.reduce((total, value) => {
            return total + value
          }, 0) - max
        switch (value) {
          case 'bottom':
            this.shapeStyle = {
              borderColor: this.shapeStyle.borderColor,
              borderTopWidth: max,
              borderLeftWidth: count / 2,
              borderBottomWidth: 0,
              borderRightWidth: count / 2,
            }
            break
          case 'top':
            this.shapeStyle = {
              borderColor: this.shapeStyle.borderColor,
              borderTopWidth: 0,
              borderLeftWidth: count / 2,
              borderBottomWidth: max,
              borderRightWidth: count / 2,
            }
            break
          case 'left':
            this.shapeStyle = {
              borderColor: this.shapeStyle.borderColor,
              borderTopWidth: count / 2,
              borderLeftWidth: max,
              borderBottomWidth: count / 2,
              borderRightWidth: 0,
            }
            break
          case 'right':
            this.shapeStyle = {
              borderColor: this.shapeStyle.borderColor,
              borderTopWidth: count / 2,
              borderLeftWidth: 0,
              borderBottomWidth: count / 2,
              borderRightWidth: max,
            }
            break
          case 'top-left':
            this.shapeStyle = {
              borderColor: this.shapeStyle.borderColor,
              borderTopWidth: max,
              borderRightWidth: max,
              borderBottomWidth: 0,
              borderLeftWidth: 0,
            }
            break
          case 'top-right':
            this.shapeStyle = {
              borderColor: this.shapeStyle.borderColor,
              borderTopWidth: 0,
              borderRightWidth: max,
              borderBottomWidth: max,
              borderLeftWidth: 0,
            }
            break
          case 'bottom-left':
            this.shapeStyle = {
              borderColor: this.shapeStyle.borderColor,
              borderTopWidth: max,
              borderRightWidth: 0,
              borderBottomWidth: 0,
              borderLeftWidth: max,
            }
            break
          case 'bottom-right':
            this.shapeStyle = {
              borderColor: this.shapeStyle.borderColor,
              borderTopWidth: 0,
              borderRightWidth: 0,
              borderBottomWidth: max,
              borderLeftWidth: max,
            }
            break
        }
      },
      initHandle(index) {
        let div = document.getElementById('handle' + index)
        div.onmousedown = (e) => {
          this.active = index
          this.mouseMove(
            e,
            {
              x0: e.clientX || e.clientx || 0,
              y0: e.clientY || e.clienty || 0,
            },
            { ...this[`handle${index}Style`] },
            index
          )
        }
      },
      mouseMove(e0, { x0, y0 }, { x, y }, index) {
        let _this = this
        document.onmousemove = function (e) {
          let x1 = e.clientX || e.clientx || 0
          let y1 = e.clientY || e.clienty || 0
          let xrangepx = x1 - x0
          let yrangepx = y1 - y0

          let xe = x + xrangepx
          let ye = y + yrangepx
          _this[`handle${index}Style`] = {
            x:
              xe < 0
                ? 0
                : xe > _this.warpStyle.width
                ? _this.warpStyle.width
                : xe,
            y:
              ye < 0
                ? 0
                : ye > _this.warpStyle.height
                ? _this.warpStyle.height
                : ye,
          }
        }
      },
    },
  }
</script>
<style lang="scss" scoped>
  .fancy-border-radius-wrap {
    display: flex;
    flex-direction: column;
    // align-items: center;
    padding-top: 2rem;

    .shape-wrap {
      position: relative;
      background-image: url('https://cdn.chenyingshuang.cn/notes/transparent_bg.png');
      transition: all 0.3s;

      svg {
        transition: all 0.3s;
      }

      .shape {
        width: 0;
        height: 0;
        border-style: solid;
      }

      .handle-wrap {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;

        &.miter {
          margin-left: 0 !important;
          margin-top: 0 !important;
        }
      }

      .handle {
        display: block;
        position: absolute;
        cursor: pointer;
        width: 2.5rem;
        height: 2.5rem;
        transform: translateY(-1.25rem) translateX(-1.25rem);

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
    }

    :deep(.n-form) {
      width: 800px;
      position: relative;
      margin-top: 2rem;

      .n-form-item-blank {
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

        > .n-input {
          input {
            color: #002;
            font-size: 16px;
            font-family: Ubuntu Mono, monospace;
            font-weight: 600;
            background-color: rgba(27, 31, 35, 0.05);
          }
        }

        .n-input-number {
          flex: 1;
        }

        .n-radio-group {
          .n-radio {
            margin-top: 13px;
            .n-radio__label {
              display: flex;
              align-items: center;
            }
            svg {
              width: 14px;
              height: 14px;
            }
          }

          &.NRadioGroup_multiline {
            .n-radio {
              line-height: 1.8;
              margin-top: 0;
            }
          }
        }
      }
    }
  }
</style>
