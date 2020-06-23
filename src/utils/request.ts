/**
 * -------------------------------------------------------
 * 请求
 * @description 只用于组件外
 * -------------------------------------------------------
 */

import axios from 'axios'
import qs from 'qs'
import logError from '../utils/logError'
import { UploadDataType, OnProgressFnType } from '../types/request'
import _ from "lodash";

const service = axios.create()

// 拦截请求头
service.interceptors.request.use(
  (config) => {
    // if (store.getters.token) config.headers['X-Token'] = getToken()
    return config
  },
  (err) => {
    logError(err)
    return Promise.reject(err)
  }
)

// 拦截请求体
service.interceptors.response.use(
  (resp) => {
    return resp.data
  },
  (err) => {
    logError(err)
    return Promise.reject(err)
  }
)

const CancelToken = axios.CancelToken

// get请求
export function requestGet(url: string, data?: any, logoutCb?: Function) {
  let cancelFunc = undefined

  const pro = service({
    url,
    method: 'GET',
    params: data,
    cancelToken: new CancelToken(func => cancelFunc = func)
  })

  if (logoutCb) {
    // @ts-ignore
    pro.then(({ errorCode }) => {
      if (errorCode === -1) logoutCb()
    })
  }

  return { pro, cancelFunc }
}

// post请求
export function requestPost(url: string, data?: any, logoutCb?: Function) {
  let cancelFunc = undefined

  const pro = service({
    url,
    method: 'POST',
    data: qs.stringify(data),
    cancelToken: new CancelToken(func => cancelFunc = func)
  })

  if (logoutCb) {
    // @ts-ignore
    pro.then(({ errorCode }) => {
      if (errorCode === -1) logoutCb()
    })
  }

  return { pro, cancelFunc }
}

// 上传文件（可提交文件 及其他参数 带进度条）
export function requestUpload(
  url: string,
  data: UploadDataType,
  onProgress?: OnProgressFnType,
  logoutCb?: Function
) {
  let cancelFunc = undefined
  const { file, ...restData } = data

  const formData = new FormData()
  formData.append('file', data.file)

  if (_.size(restData) > 0) {
    _.keys(restData).forEach((key) => {
      formData.append(key, restData[key])
    })
  }

  const pro = service({
    url,
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: formData,
    onUploadProgress: (e) => {
      let percentage = Math.round((e.loaded * 100) / e.total) || 0
      if (percentage < 100 && onProgress) {
        onProgress(percentage, file)
      }
    },
    cancelToken: new CancelToken(func => cancelFunc = func)
  })

  if (logoutCb) {
    // @ts-ignore
    pro.then(({ errorCode }) => {
      if (errorCode === -1) logoutCb()
    })
  }

  return { pro, cancelFunc }
}

export default {
  get: requestGet,
  post: requestPost,
  upload: requestUpload,
}