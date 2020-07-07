/**
 * -------------------------------------------------------
 * 路由相关类型
 * @description 描述
 * -------------------------------------------------------
 */

import { RouteProps } from 'react-router-dom'

export interface RouteType extends RouteProps {
  name: string         // 路由别名
  mark: string         // 标记（属于父子的路由mark必须一致）
  level: number        // 路由层级
  title?: string       // 页面标题
  authority?: string[] // 所对应的权限
  from?: string        // 和redirect一起用
  redirect?: string    // 重定向路径
  routes?: RouteType[] // 子路由
}
