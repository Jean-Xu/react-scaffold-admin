/**
 * -------------------------------------------------------
 * 登出回调函数
 * @description 登陆过期
 * -------------------------------------------------------
 */

import { History } from 'history'
import { message } from 'antd'
import { AUTH_ROUTE_PATH } from './constant'

function logoutCb(store: any, showMsg: boolean, history?: History): void {
  store.changeLoader({ visible: false })
  store.clearUserInfo()
  store.setBreadcrumbsList([])
  store.setLoginState(false)

  if (!document.querySelector('.ant-message-warning') && showMsg) {
    message.warning('登陆已过期，请重新登陆')
  }

  if (history) {
    history.push(`${AUTH_ROUTE_PATH}/login`)
  }
}

export default logoutCb