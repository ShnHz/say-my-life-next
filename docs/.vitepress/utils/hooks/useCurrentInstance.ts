import { ComponentInternalInstance, getCurrentInstance } from 'vue'

export default function useCurrentInstance() {
  const { appContext, proxy } =
    getCurrentInstance() as ComponentInternalInstance
  return {
    proxy,
    globalProperties: appContext.config.globalProperties,
  }
}
