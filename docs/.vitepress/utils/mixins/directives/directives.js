/**
 * Vue 3 compatible directives (mounted/unmounted instead of bind/unbind)
 */
export const focus = {
  mounted(el) {
    el.focus()
  },
}

// v-enterFloat:3  — 指定位数小数
export const enterFloat = {
  beforeMount(el, binding) {
    const handler = function () {
      if (binding.arg) {
        let str = el.value
        const len1 = str.substr(0, 1)
        const len2 = str.substr(1, 1)
        if (str.length > 1 && len1 === '0' && len2 !== '.') {
          str = str.substr(1, 1)
        }
        if (len1 === '.') {
          str = ''
        }
        if (str.indexOf('.') !== -1) {
          const str_ = str.substr(str.indexOf('.') + 1)
          if (str_.indexOf('.') !== -1) {
            str = str.substr(0, str.indexOf('.') + str_.indexOf('.') + 1)
          }
        }
        str = str.replace(/[^0-9.]+/g, '')
        if (str.indexOf('.') !== -1) {
          str = str.slice(0, str.indexOf('.') + parseInt(binding.arg, 10) + 1)
        }
        el.value = str
      } else {
        el.value = el.value.replace(/\D+/, '')
      }
      el.dispatchEvent(new Event('input'))
    }
    el._enterFloatHandler = handler
    el.addEventListener('keyup', handler)
  },
  unmounted(el) {
    if (el._enterFloatHandler) {
      el.removeEventListener('keyup', el._enterFloatHandler)
    }
  },
}

export const enterNumber = {
  beforeMount(el) {
    const handler = function () {
      el.value = el.value.replace(/\D+/, '')
      el.dispatchEvent(new Event('input'))
    }
    el._enterNumberHandler = handler
    el.addEventListener('keyup', handler)
  },
  unmounted(el) {
    if (el._enterNumberHandler) {
      el.removeEventListener('keyup', el._enterNumberHandler)
    }
  },
}

export default {
  focus,
  enterFloat,
  enterNumber,
}
