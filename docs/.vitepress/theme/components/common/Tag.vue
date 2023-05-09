<template>
  <ElTag
    v-if="type === 'top'"
    effect="dark"
    :class="{ 'is-checkable': checkable }"
    size="small"
    disable-transitions
  >
    <PushPinRound style="width: 14px; height: 14px" />
    <span style="padding-right: 4px"> 置顶 </span>
  </ElTag>
  <ElTooltip
    trigger="hover"
    v-else-if="type === 'reprinted'"
  >
    <template #content>
      <span>转发文章</span>
    </template>
    <ElTag
      effect="dark"
      :class="{ 'is-checkable': checkable }"
      size="small"
      type="success"
      disable-transitions
    >
      <ShareRound style="width: 14px; height: 14px" />
    </ElTag>
  </ElTooltip>
  <ElTag
    v-else
    effect="dark"
    :class="{ 'is-checkable': checkable }"
    size="small"
    :type="type ? type : 'info'"
    disable-transitions
  >
    <slot> </slot>
  </ElTag>
</template>

<script setup lang="ts">
  import { PushPinRound, ShareRound } from '@vicons/material'

  const props = withDefaults(
    defineProps<{
      type?:
        | 'reprinted'
        | 'top'
        | 'default'
        | 'success'
        | 'error'
        | 'primary'
        | 'info'
        | 'warning'
        | undefined
      checkable?: boolean
    }>(),
    { checkable: true }
  )
</script>

<style lang="less">
  .is-checkable {
    cursor: pointer;
  }
  .el-tag {
    .el-tag__content {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
