<template>
  <div class="create-wrap">
    <h2>创建文章</h2>
    <NForm
      ref="formRef"
      label-placement="left"
      label-align="left"
      :label-width="140"
    >
      <NFormItem label="转发文章">
        <NSwitch v-model:value="form.forward" />
      </NFormItem>
      <NFormItem
        label="文章名称"
        v-if="!form.forward"
      >
        <NInput v-model:value="form.title" />
      </NFormItem>
      <NFormItem
        label="转发文章路径"
        v-if="form.forward"
      >
        <NInput v-model:value="form.articLink" />
      </NFormItem>
      <NFormItem label="文章简介">
        <NInput v-model:value="form.summary" />
      </NFormItem>
      <NFormItem label="创建时间">
        <NDatePicker
          v-model:formatted-value="form.date"
          value-format="yyyy/MM/dd hh:mm:ss"
          type="datetime"
          clearable
        />
      </NFormItem>
      <NFormItem label="文章路径">
        <NCascader
          v-model:value="form.link"
          show-path
          filterable
          expand-trigger="hover"
          :disabled="form.linkCus != ''"
          :options="linkOptions"
          check-strategy="all"
          ref="linkCascaderRef"
        />
      </NFormItem>
      <NFormItem label="文章标签">
        <NSelect
          v-model:value="form.tag"
          multiple
          :options="tagOptions"
        />
      </NFormItem>
      <NFormItem label="评论系统">
        <NSwitch v-model:value="form.valine" />
      </NFormItem>
      <NFormItem label="评论自定义ID">
        <NInput v-model:value="form.valineId" />
      </NFormItem>
      <NFormItem label="是否目录">
        <NSwitch v-model:value="form.dir" />
      </NFormItem>
      <NFormItem label="目录监听标题">
        <NSelect
          v-model:value="form.dirTag"
          multiple
          :options="dirOptions"
        />
      </NFormItem>
      <NFormItem label="开启密码">
        <NSwitch v-model:value="form.password" />
      </NFormItem>
      <NFormItem label="自定义密码">
        <NInput
          v-model:value="form.passwordCus"
          maxlength="4"
          placeholder="输入四位数密码/默认为全局默认密码"
        />
      </NFormItem>
      <NFormItem>
        <NButton @click="reset">重置</NButton>
        <NButton
          type="primary"
          @click="submit"
        >
          提交
        </NButton>
      </NFormItem>
    </NForm>
  </div>
</template>

<script setup lang="ts">
  import { merge } from 'loadsh'
  import md5 from 'js-md5'

  import { ref, onMounted, computed, inject } from 'vue'
  import {
    NForm,
    NFormItem,
    NInput,
    NSwitch,
    NDatePicker,
    NCascader,
    NSelect,
    NButton,
    useMessage,
  } from 'naive-ui'
  import moment from 'moment'

  import { data } from '@docs/.vitepress/utils/loaders/blog.data.js'
  import tagConfig from '@docs/.vitepress/configs/tags.js'
  import { createArtic, forwardArtic } from '@docs/.vitepress/service/create'

  const message = useMessage()
  const linkCascaderRef = ref()

  const linkOptions = ref<any[]>([])
  const form = ref({
    forward: false,
    articLink: '',
    title: '文章标题',
    summary: '',
    date: moment(new Date()).format('YYYY/MM/DD hh:mm:ss'),
    valine: true,
    valineId: '',
    link: [],
    linkCus: '',
    tag: [],
    top: false,
    dir: true,
    dirTag: ['h3', 'h4', 'h5'],
    password: false,
    passwordCus: '',
  })

  onMounted(() => {
    linkOptions.value = initLinkOptions()
  })

  const initLinkOptions = () => {
    let urls = data.map((item) => {
      let urls = item.path.split('/')
      urls.pop()
      return urls
    })

    let linkObj = {}
    urls.forEach((item) => {
      if (item.length) {
        let obj = setObj({}, item)
        linkObj = merge(linkObj, obj)
      }
    })

    return doObj(linkObj, null).children

    function setObj(obj, list) {
      let key = list.shift()

      if (key) {
        obj[key] = {}
        if (list.length) setObj(obj[key], list)
      }

      return obj
    }

    function doObj(obj, key) {
      let children: any[] = []
      for (let k in obj) {
        if (JSON.stringify(obj[k]) == '{}')
          children.push({
            value: k,
            label: k,
          })

        if (Object.prototype.toString.call(obj[k]) == '[object Object]') {
          let item = doObj(obj[k], k)
          if (item.children.length > 0) children.push(item)
        }
      }

      return {
        value: key,
        label: key,
        children: children,
      }
    }
  }

  const tagOptions = computed(() => {
    let list: any[] = []
    for (let k in tagConfig) {
      list.push({
        label: tagConfig[k].title,
        value: k,
      })
    }

    return list
  })

  const dirOptions = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map((item) => {
    return {
      label: item,
      value: item,
    }
  })

  // -------------------------function
  const reset = () => {
    form.value = {
      forward: false,
      articLink: '',
      title: '文章标题',
      summary: '',
      date: moment(new Date()).format('YYYY/MM/DD hh:mm:ss'),
      valine: true,
      valineId: '',
      link: [],
      linkCus: '',
      tag: [],
      top: false,
      dir: true,
      dirTag: ['h3', 'h4', 'h5'],
      password: false,
      passwordCus: '',
    }
  }

  const submit = () => {
    const link = form.value.linkCus
      ? form.value.linkCus
      : `/${linkCascaderRef.value.selectedOption.label}`.replace(/ /g, '')
    const fn = form.value.forward ? forwardArtic : createArtic

    fn({
      ...form.value,
      link: link,
      passwordCus: form.value.passwordCus ? md5(form.value.password) : '',
    }).then((res) => {
      message.info(`成功创建文件，文件路径：${link}/${res.data.fileName}`, {
        duration: 0,
      })
    })
  }
</script>

<style scoped lang="less">
  .create-wrap {
    display: flex;
    align-items: center;
    // justify-content:center;
    flex-direction: column;
    width: 600px;
    min-height: 100vh;
    margin: 0 auto;
    h2 {
      width: 100%;
      position: relative;
      margin: 0;
      padding-bottom: 4rem;
      font-weight: 500;
      font-size: 1.875rem;
      line-height: 2.25rem;
      color: #2b3844;
      text-align: left;
      border: none;
    }

    :deep(.n-form) {
      width: 100%;
      .n-button {
        margin-right: 12px;
      }
    }
  }
</style>
