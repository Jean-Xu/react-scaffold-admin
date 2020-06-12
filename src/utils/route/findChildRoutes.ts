/**
 * -------------------------------------------------------
 * 获取子路由
 * @description 描述
 * -------------------------------------------------------
 */

import _ from 'lodash'
import { RouteType } from '../../types/router'

function findChildRoutes(contentRoutes: RouteType[], predicate: { [key: string]: any } = {}): RouteType[] {
  return (_.find(contentRoutes, predicate) as (RouteType | undefined))?.routes || []
}

export default findChildRoutes