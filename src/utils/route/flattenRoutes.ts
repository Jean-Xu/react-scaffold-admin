/**
 * -------------------------------------------------------
 * 获得所有路由的列表
 * @description mk 需要增加递归遍历多层routes
 * -------------------------------------------------------
 */

import _ from 'lodash'
import { RouteType } from '../../types/router'

function flattenRoutes(contentRoutes: RouteType[]): RouteType[] {
  let result: RouteType[] = []

  if (contentRoutes.length) {
    _.forEach(contentRoutes, (item, index) => {
      if (item.routes && item.routes.length) {
        let _item = _.cloneDeep(item)
        _item = _.omit(_item, ['routes'])
        result.push(_item, ...item.routes)
      } else {
        result.push(item)
      }
    })
  }

  return result
}

export default flattenRoutes
