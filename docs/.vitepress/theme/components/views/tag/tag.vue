<template>
  <div class="tag-wrap">
    <main>
      <el-tabs
        v-model="activeTag"
        class="tabs"
      >
        <el-tab-pane
          :label="'全部'"
          :name="''"
        >
        </el-tab-pane>
        <el-tab-pane
          :label="value.title"
          :name="key"
          v-for="(value, key) in tagConfig"
        >
        </el-tab-pane>
      </el-tabs>
      <ul
        v-for="(value, key) in blogList"
        :key="`archives-blog-ul-${key}`"
      >
        <li class="lead">
          <span class="date-wrap">{{ value[0] }}</span>
        </li>
        <li
          v-for="(item, index) in value[1]"
          :key="`archives-blog-item-${key}-${index}`"
        >
          <span class="date-wrap">
            <span class="time-wrap">{{
              moment(new Date(item.date)).format('YYYY-MM-DD hh:mm:ss')
            }}</span>
          </span>
          <span
            class="title-wrap"
            @click="toPath(item.path)"
          >
            {{ item.title }}
          </span>
        </li>
      </ul>
    </main>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useRouter, useData } from 'vitepress'
  import moment from 'moment'

  import { data } from '@docs/.vitepress/utils/loaders/blog.data.js'
  import tagConfig from '@docs/.vitepress/configs/tags.js'

  const vitePressData = useData()

  const activeTag = ref<string>('')

  const blogList = computed<any[]>(() => {
    let list: any[] = []
    if (activeTag.value == '') {
      list = [['全部', data]]
    } else {
      list = [
        [
          tagConfig[activeTag.value].title,
          data.filter((item) => {
            return item.config?.tag?.includes(activeTag.value)
          }),
        ],
      ]
    }
    return list
  })

  const router = useRouter()
  router.onAfterRouteChanged = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }
  const toPath = (path) => {
    router.go(`${vitePressData.site.value.base}${path}`)
  }
</script>

<style scoped lang="less">
  .tag-wrap {
    main {
      width: 1200px;
      position: relative;
      margin: 0 auto;
      ul {
        padding: 0;
        margin-bottom: 1rem;
        &:first-child {
          li:first-child::after {
            display: none;
          }
        }
        li {
          display: flex;
          align-items: center;
          height: 50px;
          position: relative;
          font-size: 1.1rem;

          .date-wrap {
            width: 200px;
            font-size: 90%;
            .time-wrap {
              color: #6c757d;
              opacity: 0.6;
            }
          }
          .title-wrap {
            cursor: pointer;
            flex: 1;
            margin-left: 7rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            &:hover {
              text-decoration: underline;
            }
          }

          &:nth-child(even) {
            background-image: var(--bg-guide-even);
          }
          &.lead {
            align-items start &::before {
              width: 12px;
              height: 12px;
              margin-left: -2px;
              margin-top: 14px;
              background-color: #ffffff;
              border: 3px solid #c2c6cc;
            }
            &::after {
              top: -36px;
            }
            .date-wrap {
              font-size: 1.4rem;
            }
          }
        }
      }
    }
  }
</style>
