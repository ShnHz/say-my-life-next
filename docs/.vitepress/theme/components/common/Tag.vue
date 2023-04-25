<template>
  <NTag
    v-if="type === 'top'"
    :bordered="false"
    :class="{ 'is-checkable': checkable }"
    size="small"
  >
    <template #icon>
      <NIcon
        :component="PushPinRound"
        :size="14"
      />
    </template>
    <span style="padding-right: 4px"> 置顶 </span>
  </NTag>
  <NTooltip
    trigger="hover"
    v-else-if="type === 'reprinted'"
  >
    <template #trigger>
      <NTag
        :bordered="false"
        :class="{ 'is-checkable': checkable }"
        size="small"
        type="success"
      >
        <template #icon>
          <NIcon
            :component="ShareRound"
            :size="14"
          />
        </template>
      </NTag>
    </template>
    <span>转发文章</span>
  </NTooltip>
  <NTag
    :bordered="false"
    :class="{ 'is-checkable': checkable }"
    size="small"
    type="info"
    v-else
  >
    <slot> </slot>
  </NTag>
</template>

<script setup lang="ts">
  import { NTag, NIcon, NTooltip } from 'naive-ui'
  import { PushPinRound, ShareRound } from '@vicons/material'

  const props = withDefaults(
    defineProps<{
      type?: string
      checkable?: boolean
    }>(),
    { checkable: true }
  )
</script>

<style scoped lang="less">
  .is-checkable {
    cursor: pointer;
  }
</style>
