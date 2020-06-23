/**
 * -------------------------------------------------------
 * 页面路由-镜电
 * @description routes里不做authority
 * -------------------------------------------------------
 */

import loadable from '@loadable/component'
import { RouteType } from '../types/router'
import { CONTENT_ROUTE_PATH, ERR_ROUTE_PATH } from '../utils/constant'

const contentRoutes: RouteType[] = [
  {
    path: CONTENT_ROUTE_PATH,
    exact: true,
    name: 'home',
    mark: 'home',
    title: '首页',
    level: 1,
    component: loadable(() => import('../pages/modules/home/home')),
  },
  {
    path: `${CONTENT_ROUTE_PATH}/base-form`,
    exact: true,
    name: 'baseForm',
    mark: 'baseForm',
    title: '基础表单',
    level: 2,
    authority: ['10101'],
    component: loadable(() => import('../pages/modules/forms/baseForm')),
  },
  {
    path: `${CONTENT_ROUTE_PATH}/upload-form`,
    exact: true,
    name: 'uploadForm',
    mark: 'uploadForm',
    title: '上传文件',
    level: 2,
    authority: ['10102'],
    component: loadable(() => import('../pages/modules/forms/uploadForm')),
  },
  {
    path: `${CONTENT_ROUTE_PATH}/list`,
    exact: false,
    name: 'list',
    mark: 'list',
    title: '列表页',
    level: 2,
    authority: ['10200'],
    component: loadable(() => import('../pages/modules/list/listEntry')),
    routes: [
      {
        path: `${CONTENT_ROUTE_PATH}/list`,
        exact: true,
        name: 'baseList',
        mark: 'list',
        title: '基础列表',
        level: 2,
        component: loadable(() => import('../pages/modules/list/subpage/baseList')),
      },
      {
        path: `${CONTENT_ROUTE_PATH}/list/actionable-list`,
        exact: true,
        name: 'actionableList',
        mark: 'list',
        title: '可操作的列表',
        level: 2,
        component: loadable(() => import('../pages/modules/list/subpage/actionableList')),
      },
    ]
  },

  /*{
    path: `${CONTENT_ROUTE_PATH}/bguser`,
    exact: true,
    name: 'bgUser',
    mark: 'bgUser',
    title: '后台用户管理',
    level: 2,
    authority: ['10100'],
    component: loadable(() => import('../pages/modules/user/bgUserList')),
  },
  {
    path: `${CONTENT_ROUTE_PATH}/group`,
    exact: true,
    name: 'group',
    mark: 'group',
    title: '后台权限组管理',
    level: 2,
    authority: ['10800'],
    component: loadable(() => import('../pages/modules/group/groupList')),
  },
  {
    path: `${CONTENT_ROUTE_PATH}/account`,
    exact: true,
    name: 'account',
    mark: 'account',
    title: '个人设置',
    level: 2,
    authority: ['11000'],
    component: loadable(() => import('../pages/modules/user/accountSetting')),
  },*/
  {
    redirect: ERR_ROUTE_PATH,
    name: '404',
    mark: '404',
    title: '',
    level: -1,
  },
]

export default contentRoutes
