<template>
  <div class="container blog-title-wrap">
    <div class="content">
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
            <i class="leancloud-visitors-count"></i>
          </span>
        </div>
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

  console.log(pageConfig)

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
    margin: 0 auto;
    width: 100%;
  }
  .content {
    position: relative;
    margin: 0 auto;
    width: 100%;
  }

  @media (min-width: 960px) {
    .content {
      padding: 0 32px 40px;
    }
  }

  @media (min-width: 1280px) {
    .content {
      order: 1;
      margin: 0;
      min-width: 640px;
    }
  }

  .content-container {
    max-width: 688px;
    margin: 0 auto;
  }
  .blog-title-wrap {
    .blog-th-wrap {
      display: flex;
      align-items: center;
      gap: 20px;
      > span {
        display: flex;
        align-items: center;
        svg {
          width: 14px;
          height: 14px;
        }
      }

      .leancloud_comments {
        font-style: normal;
        i {
          font-style: normal;
        }
      }
    }
  }
</style>
