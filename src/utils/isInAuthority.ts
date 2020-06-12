/**
 * -------------------------------------------------------
 * 是否在权限内
 * @description 有的菜单项不带authority 表示不需要授权
 * -------------------------------------------------------
 */

import _ from 'lodash'

function isInAuthority(authority: string[] | undefined | null, userAuthority: string[]): boolean {
  let result: boolean = false

  if (authority) {
    for (let i = 0; i < authority.length; i++) {
      if (_.includes(userAuthority, authority[i])) {
        result = true
        break
      }
    }
  } else {
    result = true
  }

  return result
}

export default isInAuthority