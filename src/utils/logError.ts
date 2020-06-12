/**
 * -------------------------------------------------------
 * 打印错误日志
 * @description 描述
 * -------------------------------------------------------
 */

import { AxiosError } from 'axios'
import { message } from 'antd'
import { HttpStatusType } from '../types/other'
import { DEV_HOST, HTTP_STATUS_MESSAGE } from './constant'

function logError(error: any): void {
  const hostname = window.location.hostname

  if (<AxiosError>error) {
    if (error.response) {
      console.log('[Response Error]', error.response)
      message.error(HTTP_STATUS_MESSAGE[(`${error.response.status}` as HttpStatusType)], 4.5)
    } else if (error.request) {
      console.log('[Request Error]', error.request)
    }
  } else if (hostname === DEV_HOST || hostname === 'localhost') {
    console.log('[Error]', error)
  }
}

export default logError