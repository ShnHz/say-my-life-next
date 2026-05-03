import axios, { AxiosPromise } from 'axios' // AxiosPromise类型

export interface ResData {
  success: boolean
  fileName?: string
  message?: string
}

// 新增文章
export function createArtic(params): AxiosPromise<ResData> {
  return axios.post('http://localhost:3000/create/page', params)
}

// 转发文章
export function forwardArtic(params): AxiosPromise<ResData> {
  return axios.post('http://localhost:3000/forward/page', params)
}
