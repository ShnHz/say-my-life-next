<template>
  <div class="shn-el-demo-block">
    <h3
      class="demo-block-title"
      v-if="title != ''"
    >
      {{ title }}
    </h3>
    <p
      class="demo-block-introduction"
      v-if="introduction != ''"
    >
      {{ introduction }}
    </p>
    <div
      @mouseout="arrowAnimation ? (hover_animation = false) : null"
      @mouseover="arrowAnimation ? (hover_animation = true) : null"
      class="demo-block"
    >
      <div class="source">
        <slot name="demo" />
      </div>
      <div
        :style="{ height: code_height + 'px' }"
        class="code"
        v-html="output"
        ref="codeView"
      ></div>
      <div
        @click="showCode()"
        class="demo-block-control"
        :class="{ 'is-loading': loading }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 512 512"
          :class="{
            hovering_span: hover_animation || !arrowAnimation,
            'is-reverse': code_height !== 0,
          }"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="48"
            d="M112 184l144 144l144-144"
          ></path>
        </svg>
        <span :class="{ hovering_span: hover_animation || !arrowAnimation }">
          {{ code_height === 0 ? '显示代码' : '隐藏代码' }}
        </span>
      </div>
    </div>
  </div>
</template>
<script>
  import { setCDN, setWasm, getHighlighter } from 'shiki'

  export default {
    name: 'code-demo',
    props: {
      title: {
        type: String,
        default: '',
      },
      introduction: {
        type: String,
        default: '',
      },
      arrowAnimation: {
        type: Boolean,
        default: true,
      },
      type: {
        type: String,
        default: 'js',
      },
    },
    data() {
      return {
        loading: true,
        highlighter: null,
        hover_animation: false,
        code_height: 0,
        output: '',
        height: 0,
      }
    },
    async mounted() {
      const response = await fetch(
        'https://cdn.chenyingshuang.cn/other/shiki/onig.wasm'
      )
      const buffer = await response.arrayBuffer()
      setWasm(buffer)
      setCDN('https://cdn.chenyingshuang.cn/other/shiki/')
      let _this = this
      const highlighter = await getHighlighter({ theme: 'dark-plus' })

      const code = this.$slots.code().map((item) => {
        return highlighter.codeToHtml(item.children, {
          lang: item.props['data-type'] || 'js',
        })
      })

      this.output = code.join(``)

      this.$nextTick(() => {
        const dom = _this.$refs.codeView.querySelectorAll('.shiki')
        for (let i = 0; i < dom.length; i++) {
          _this.height += dom[i].clientHeight
        }
        _this.height += 32 + (dom.length - 1) * 16
        _this.loading = false
      })
    },
    methods: {
      showCode() {
        if (this.code_height === 0) {
          this.code_height = this.height
        } else {
          this.code_height = 0
        }
      },
    },
  }
</script>
<style lang="less" scoped>
  .shn-el-demo-block {
    .demo-block-title {
      margin: 55px 0 20px;
      font-weight: 400;
      color: #1f2f3d;
    }
    .demo-block-introduction {
      font-size: 14px;
      color: #5e6d82;
      margin: 10px 0;
    }
    .demo-block {
      width: 100%;
      margin-bottom: 24px;
      border: 1px solid #ebebeb;
      border-radius: 3px;
      transition: 0.2s;
      &:hover {
        box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
          0 2px 4px 0 rgba(232, 237, 250, 0.5);
      }
      .source {
        position: relative;
        padding: 24px;
      }
      .code {
        height: 0;
        background: #1e1e1e;
        transition: height 0.2s;
        overflow: hidden;
        :deep(.shiki) {
          padding: 0 24px;
        }
      }
      .demo-block-control {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        position: relative;
        margin-top: -1px;
        height: 44px;
        box-sizing: border-box;
        background-color: #fff;
        border-top: 1px solid #eaeefb;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        color: #d3dce6;
        &.is-loading {
          cursor: not-allowed;
          pointer-events: none;
        }
        &:hover {
          color: var(--vp-c-brand);
          background-color: #f9fafc;
        }
        svg {
          height: 16px;
          width: 16px;
          position: relative;
          font-size: 16px;
          line-height: 44px;
          transition: 0.3s;
          transform: translateX(34px);
          &.is-reverse {
            transform: translateX(34px) rotate(180deg);
          }
        }
        span {
          margin-left: 10px;
          transform: translateX(30px);
          font-size: 14px;
          line-height: 44px;
          transition: 0.3s;
          opacity: 0;
        }
        .hovering_span {
          transform: translateX(-10px);
          opacity: 1;
          &.is-reverse {
            transform: translateX(-10px) rotate(180deg);
          }
        }
      }
    }
  }
</style>
