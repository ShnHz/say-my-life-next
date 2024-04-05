<template>
  <div class="friend-wrap">
    <main>
      <div class="rule-wrap">
        <h1>友链，申请规则</h1>
        <p>
          如果要和本站交换友链，请按照以下格式发送到
          <a href="mailto:664652740@qq.com">664652740@qq.com</a>
          <!-- ，或在下方留言区留言 -->
        </p>
        <p>如果我没有回复的话，可以直接滴滴QQ，一般都是我没看见</p>

        <div class="rule-example">
          <p>名字： 野宁新之助</p>
          <p>
            地址：
            <a href="https://www.sanghangning.cn"
              >https://www.sanghangning.cn</a
            >
          </p>
          <p>描述： 说说我的生活</p>
          <p>头像： https://cdn.chenyingshuang.cn/index/avatar.jpg</p>
        </div>
      </div>

      <div class="friend-list">
        <div
          class="friend-item"
          v-for="(item, index) in friendConfig"
          :key="`friend-${index}`"
        >
          <div class="el-image">
            <el-avatar
              :size="50"
              :src="item.icon"
              shape="square"
            >
              <img
                src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
              />
            </el-avatar>
          </div>
          <div>
            <a :href="item.href">{{ item.name }}</a>
            <div>{{ item.description }}</div>
          </div>
        </div>
      </div>

      <horse />
    </main>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useRouter, useData } from 'vitepress'
  import moment from 'moment'

  import friendConfig from '@docs/.vitepress/configs/friend.js'
  import horse from './components/horse.vue'
  const vitePressData = useData()

  console.log(friendConfig, vitePressData)
</script>

<style scoped lang="less">
  .friend-wrap {
    main {
      display: flex;
      flex-direction: column;
      gap: 12px;
      .rule-wrap {
        h1 {
          font-size: 20px;
          margin-bottom: 30px;
          font-weight: 400;
        }
        p {
          line-height: 10px;
        }
        .rule-example {
          margin-top: 20px;
          padding: 10px;
          line-height: 3;
          border-radius: 5px;
          border: 1px dashed #bbb;
        }
      }
      .friend-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-top: 20px;
      }
      .friend-item {
        display: flex;
        align-items: center;
        gap: 12px;
        :deep(.el-avatar) {
          background: #fff;
        }
      }
    }
  }
</style>
