<template>
  <div class="guide-wrap">
    <main>
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
          <span class="date-wrap"
            >{{ moment(new Date(item.date)).format('DD') }}
            <span class="time-wrap">{{
              moment(new Date(item.date)).format('hh:mm:ss')
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
  import { computed } from 'vue'
  import { useRouter, useData } from 'vitepress'
  import moment from 'moment'

  import { data } from '@docs/.vitepress/utils/loaders/blog.data.js'

  const vitePressData = useData()

  const blogList = computed<any[]>(() => {
    let list = data.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })

    let map = new Map()

    list.forEach((item) => {
      let timeFrom = item.date
        ? moment(new Date(item.date)).format('YYYY年MM月')
        : 'Other'
      if (!map.has(timeFrom)) {
        map.set(timeFrom, [item])
      } else {
        map.set(timeFrom, [...map.get(timeFrom), item])
      }
    })

    return [
      ...Array.from(map).filter((item) => {
        return item[0] != 'Other'
      }),
      ...Array.from(map).filter((item) => {
        return item[0] == 'Other'
      }),
    ]
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
  .guide-wrap {
    main {
      width: 1200px;
      position: relative;
      margin: 0 auto;
      backdrop-filter: blur(20px);
      ul {
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
            padding-left: 20px;
            font-size: 90%;
            .time-wrap {
              color: #6c757d;
              opacity: 0.6;
            }
          }
          .title-wrap {
            flex: 1;
            margin-left: 7rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            a:hover {
              text-decoration: underline;
            }
          }

          &:nth-child(even) {
            background-image: var(--bg-guide-even);
          }
          &::before {
            content: '';
            display: block;
            position: absolute;
            -webkit-border-radius: 50%;
            -moz-border-radius: 50%;
            border-radius: 50%;
            width: 8px;
            height: 8px;
            left: 11rem;
            margin-top: 4px;
            background-color: #c2c6cc;
            box-shadow: 0 0 3px 0 #c2c6cc;
            z-index: 2;
          }
          &::after {
            content: '';
            display: block;
            width: 4px;
            height: 50px;
            position: absolute;
            left: 11rem;
            top: -25px;
            margin-left: 2px;
            background-color: var(--bg-guide-line);
            z-index: 1;
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
