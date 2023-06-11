<template>
  <div
    class="footer-wrap"
    :class="{ 'has-sidebar': hasSidebar }"
  >
    <div class="container">
      <div class="left-info">
        <span class="record-wrap">
          <a :href="themeConfig.recordLink">
            {{ themeConfig.record }}
          </a>
        </span>
        <span class="power-wrap">
          power by
          <a
            href="https://vitepress.dev/"
            target="_blank"
            >VitePress</a
          >
        </span>
        <span class="time-wrap">
          ©{{ themeConfig.startYear }} - {{ thisYear }} By
          {{ themeConfig.author }}
        </span>
      </div>
      <div class="right-info">
        <span
          class="view-wrap leancloud_visitors"
          id="/"
          v-if="themeConfig.globalAccess"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5s5 2.24 5 5s-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3s3-1.34 3-3s-1.34-3-3-3z"
              fill="currentColor"
            ></path>
          </svg>
          <i class="leancloud-visitors-count"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useData } from 'vitepress'
  import { useSidebar } from 'vitepress/dist/client/theme-default/composables/sidebar'

  const vitePressData = useData()
  const themeConfig = vitePressData.site.value.themeConfig

  const thisYear = new Date().getFullYear()

  const { hasSidebar, hasAside, leftAside } = useSidebar()
</script>

<style scoped lang="less">
  .footer-wrap {
    display: flex;
    align-items: center;
    height: var(--vp-nav-height);
    border-top: 1px solid;
    border-color: var(--vp-c-gutter);
    &.has-sidebar {
      .container {
        padding-left: calc(
          (100% - (var(--vp-layout-max-width) - 64px)) / 2 +
            var(--vp-sidebar-width) - 32px
        );
      }
    }
    .container {
      display: flex;
      align-items: center;
      position: relative;
      margin: 0 auto;
      width: 100%;
      height: var(--vp-nav-height);
      font-size: 12px;
      .left-info {
        display: flex;
        gap: 14px;
        a {
          color: var(--vp-c-brand);
        }
        .time-wrap {
        }
        .power-wrap {
        }
      }
      .right-info {
        display: flex;
        gap: 14px;
        position: relative;
        margin-left: auto;
        span {
          display: flex;
          align-items: center;
          svg {
            height: 14px;
            width: 14px;
            margin-right: 6px;
          }
          .leancloud-visitors-count {
            font-style: normal;
            font-size: 12px;
          }
        }
      }
    }
  }

  @media (min-width: 960px) {
    .footer-wrap {
      &.has-sidebar {
        .container {
          padding-left: calc(var(--vp-sidebar-width) + 32px);
          padding-right: 32px;
        }
      }
    }
  }
</style>
