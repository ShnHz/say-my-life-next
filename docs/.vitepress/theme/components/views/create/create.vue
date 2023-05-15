<template>
  <div class="create-wrap">
    <h2>创建文章</h2>
    <ElForm
      ref="formRef"
      label-placement="left"
      label-position="left"
      :label-width="140"
    >
      <ElFormItem label="转发文章">
        <ElSwitch v-model="form.forward" />
      </ElFormItem>
      <ElFormItem
        label="文章名称"
        v-if="!form.forward"
      >
        <ElInput v-model="form.title" />
      </ElFormItem>
      <ElFormItem
        label="转发文章路径"
        v-if="form.forward"
      >
        <ElInput v-model="form.articLink" />
      </ElFormItem>
      <ElFormItem label="文章简介">
        <ElInput v-model="form.summary" />
      </ElFormItem>
      <ElFormItem label="创建时间">
        <ElDatePicker
          v-model="form.date"
          value-format="YYYY/MM/DD HH:mm:ss"
          type="datetime"
          clearable
        />
      </ElFormItem>
      <ElFormItem label="文章路径">
        <ElCascader
          v-model="form.link"
          show-path
          filterable
          expand-trigger="hover"
          :disabled="form.linkCus != ''"
          :options="linkOptions"
          check-strategy="all"
          ref="linkCascaderRef"
        />
      </ElFormItem>
      <ElFormItem label="文章标签">
        <ElSelect
          v-model="form.tag"
          multiple
        >
          <ElOption
            v-for="item in tagOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        /></ElSelect>
      </ElFormItem>
      <ElFormItem label="评论系统">
        <ElSwitch v-model="form.valine" />
      </ElFormItem>
      <ElFormItem label="评论自定义ID">
        <ElInput v-model="form.valineId" />
      </ElFormItem>
      <ElFormItem label="是否目录">
        <ElSwitch v-model="form.dir" />
      </ElFormItem>
      <ElFormItem label="目录监听标题">
        <ElSelect
          v-model="form.dirTag"
          multiple
          :options="dirOptions"
        />
      </ElFormItem>
      <ElFormItem label="开启密码">
        <ElSwitch v-model="form.password" />
      </ElFormItem>
      <ElFormItem label="自定义密码">
        <ElInput
          v-model="form.passwordCus"
          maxlength="4"
          placeholder="输入四位数密码/默认为全局默认密码"
        />
      </ElFormItem>
      <ElFormItem>
        <ElButton @click="reset">重置</ElButton>
        <ElButton
          type="primary"
          @click="submit"
        >
          提交
        </ElButton>
      </ElFormItem>
    </ElForm>
  </div>
</template>

<script setup lang="ts">
  import md5 from 'js-md5'

  import { ref, onMounted, computed, inject } from 'vue'
  import moment from 'moment'

  import { data } from '@docs/.vitepress/utils/loaders/blog.data.js'
  import tagConfig from '@docs/.vitepress/configs/tags.js'
  import { createArtic, forwardArtic } from '@docs/.vitepress/service/create'
  import { ElMessage } from 'element-plus'

  const linkCascaderRef = ref()

  const linkOptions = ref<any[]>([])
  const form = ref({
    forward: false,
    articLink: '',
    title: '文章标题',
    summary: '',
    date: moment(new Date()).format('YYYY/MM/DD HH:mm:ss'),
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

  function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
  }
  function isArray(arr) {
    return Array.isArray(arr)
  }
  function merge(target, ...arg) {
    return arg.reduce((acc, cur) => {
      return Object.keys(cur).reduce((subAcc, key) => {
        const srcVal = cur[key]
        if (isObject(srcVal)) {
          subAcc[key] = merge(subAcc[key] ? subAcc[key] : {}, srcVal)
        } else if (isArray(srcVal)) {
          // series: []，下层数组直接赋值
          subAcc[key] = srcVal.map((item, idx) => {
            if (isObject(item)) {
              const curAccVal = subAcc[key] ? subAcc[key] : []
              return merge(curAccVal[idx] ? curAccVal[idx] : {}, item)
            } else {
              return item
            }
          })
        } else {
          subAcc[key] = srcVal
        }
        return subAcc
      }, acc)
    }, target)
  }

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
      : `/${form.value.link.join('/')}`
    const fn = form.value.forward ? forwardArtic : createArtic

    fn({
      ...form.value,
      link: link,
      passwordCus: form.value.passwordCus ? md5(form.value.password) : '',
    }).then((res) => {
      ElMessage.info({
        message: `成功创建文件，文件路径：${link}/${res.data.fileName}`,
        duration: 0,
        showClose: true,
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

    :deep(.el-form) {
      width: 100%;
      .el-input,
      .el-select,
      .el-cascader {
        width: 100%;
      }
    }
  }
</style>
