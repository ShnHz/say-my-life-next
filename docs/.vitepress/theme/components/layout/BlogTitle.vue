<template>
  <div class="container blog-title-wrap">
    <div class="content-container">
      <div class="blog-title">
        {{ pageConfig.title }}
      </div>
      <div class="blog-th-wrap">
        <!-- date -->
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 24 24"
          >
            <path
              d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"
              fill="currentColor"
            ></path>
          </svg>
          {{ pageConfig.frontmatter.date }}
        </span>
        <!-- tags -->
        <span v-if="pageConfig.frontmatter.config.tag.length > 0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 24 24"
          >
            <g
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle
                cx="8.5"
                cy="8.5"
                r="1"
                fill="currentColor"
              ></circle>
              <path
                d="M4 7v3.859c0 .537.213 1.052.593 1.432l8.116 8.116a2.025 2.025 0 0 0 2.864 0l4.834-4.834a2.025 2.025 0 0 0 0-2.864L12.29 4.593A2.025 2.025 0 0 0 10.859 4H7a3 3 0 0 0-3 3z"
              ></path>
            </g>
          </svg>
          {{
            pageConfig.frontmatter.config.tag
              .map((item) => {
                return tagConfig[item].title
              })
              .join(',')
          }}
        </span>
        <!-- comments -->
        <span
          class="leancloud_comments"
          :id="valineId"
          v-if="
            themeConfig.valine.enable &&
            pageConfig.frontmatter.config &&
            pageConfig.frontmatter.config.valine
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 16 16"
          >
            <g fill="none">
              <path
                d="M3.05 3A2.5 2.5 0 0 1 5.5 1H12a3 3 0 0 1 3 3v4.5a2.5 2.5 0 0 1-2 2.45V11a2 2 0 0 1-2 2H7.16l-2.579 1.842A1 1 0 0 1 3 14.028V13a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h.05zm1.035 0H11a2 2 0 0 1 2 2v4.915A1.5 1.5 0 0 0 14 8.5V4a2 2 0 0 0-2-2H5.5a1.5 1.5 0 0 0-1.415 1zM12 11V5a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h1v2.028L6.84 12H11a1 1 0 0 0 1-1z"
                fill="currentColor"
              ></path>
            </g>
          </svg>
          <i
            class="valine-comment-count"
            :data-xid="valineId"
          ></i>
        </span>
        <!-- views -->
        <span
          class="leancloud_visitors"
          :id="valineId"
          v-if="
            themeConfig.valine.enable &&
            pageConfig.frontmatter.config &&
            pageConfig.frontmatter.config.valine
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 16 16"
          >
            <g fill="none">
              <path
                d="M2 4a2 2 0 0 1 2-2h1.5a.5.5 0 0 1 0 1H4a1 1 0 0 0-1 1v1.5a.5.5 0 0 1-1 0V4zm0 8a2 2 0 0 0 2 2h1.5a.5.5 0 0 0 0-1H4a1 1 0 0 1-1-1v-1.5a.5.5 0 0 0-1 0V12zM12 2a2 2 0 0 1 2 2v1.5a.5.5 0 0 1-1 0V4a1 1 0 0 0-1-1h-1.5a.5.5 0 0 1 0-1H12zm2 10a2 2 0 0 1-2 2h-1.5a.5.5 0 0 1 0-1H12a1 1 0 0 0 1-1v-1.5a.5.5 0 0 1 1 0V12zM5.5 9a2.5 2.5 0 1 1 5 0a2.5 2.5 0 0 1-5 0zM3.314 7.964a.5.5 0 0 0 .65-.278v.001l.005-.011l.028-.06c.027-.055.072-.137.136-.24a3.73 3.73 0 0 1 .64-.756C5.376 6.073 6.384 5.5 8 5.5c1.617 0 2.624.573 3.226 1.12c.305.277.512.553.64.757a2.752 2.752 0 0 1 .165.299s.244.452.655.288a.5.5 0 0 0 .278-.65c-.107-.223 0 0 0 0v-.002l-.002-.004l-.005-.01a1.809 1.809 0 0 0-.06-.129a3.783 3.783 0 0 0-.186-.327a4.733 4.733 0 0 0-.812-.962c-.774-.703-2.017-1.38-3.9-1.38c-1.882 0-3.125.677-3.898 1.38a4.73 4.73 0 0 0-.813.962a3.753 3.753 0 0 0-.246.456l-.004.01l-.002.005v.001a.5.5 0 0 0 .278.65z"
                fill="currentColor"
              ></path>
            </g>
          </svg>
          <i class="leancloud-visitors-count"></i>
        </span>
      </div>
      <div
        class="blog-desc"
        v-if="pageConfig.frontmatter.summary"
      >
        {{ pageConfig.frontmatter.summary }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useData } from 'vitepress'
  import tagConfig from '@docs/.vitepress/configs/tags.js'

  const vitePressData = useData()
  const themeConfig = computed(() => {
    return vitePressData.site.value.themeConfig
  })
  const pageConfig = computed(() => {
    return vitePressData.page.value
  })

  const valineId = computed(() => {
    const regularPath = pageConfig.value.relativePath
      .replace('.md', '.html')
      .replace('views', '')
    return pageConfig.value.frontmatter.config &&
      pageConfig.value.frontmatter.config.valineId
      ? pageConfig.value.frontmatter.config.valineId
      : regularPath
  })
</script>

<style scoped lang="less">
  .container {
    margin-bottom: 32px;
  }
  .blog-title-wrap {
    .blog-title {
      position: relative;
      margin-bottom: 1rem;
      font-weight: 500;
      font-size: 1.875rem;
      line-height: 2.25rem;
    }
    .blog-desc {
      padding: 2rem 0;
      opacity: 0.7;
    }
    .blog-th-wrap {
      display: flex;
      align-items: center;
      gap: 20px;
      font-size: 16px;
      opacity: 0.7;
      > span {
        display: flex;
        align-items: center;
        svg {
          width: 16px;
          height: 16px;
          margin-right: 6px;
        }
      }

      .leancloud_comments,.leancloud-visitors-count {
        font-style: normal;
        i {
          font-style: normal;
        }
      }
    }
  }
</style>
