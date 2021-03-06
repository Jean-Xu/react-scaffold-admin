/**
 * -------------------------------------------------------
 * 请求
 * @description 只用于组件内
 * -------------------------------------------------------
 */

import { useHistory } from 'react-router-dom'
import useStores from './useStores'
import { requestGet, requestPost, requestUpload } from '../utils/request'
import logoutCb from '../utils/logoutCb'
import { UploadDataType, OnProgressFnType } from '../types/request'

function useRequest() {
  const history = useHistory()
  const { globalStore: store } = useStores()

  return {
    get: (url: string, data?: any) => {
      return requestGet(url, data, () => {
        logoutCb(store, true, history)
      })
    },

    post: (url: string, data?: any) => {
      return requestPost(url, data, () => {
        logoutCb(store, true, history)
      })
    },

    upload: (url: string, data: UploadDataType, onProgress?: OnProgressFnType) => {
      return requestUpload(url, data, onProgress, () => {
        logoutCb(store, true, history)
      })
    },
  }
}

export default useRequest