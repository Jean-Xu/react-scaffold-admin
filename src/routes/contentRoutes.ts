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
    path: `${CONTENT_ROUTE_PATH}/mpuser`,
    exact: true,
    name: 'mpUser',
    mark: 'mpUser',
    title: '小程序用户管理',
    level: 2,
    authority: ['10300'],
    component: loadable(() => import('../pages/modules/user/mpUserList')),
  },
  {
    path: `${CONTENT_ROUTE_PATH}/ad/update`,
    exact: true,
    name: 'updateAd',
    mark: 'ad',
    title: '新建广告',
    level: 3,
    authority: ['10401'],
    component: loadable(() => import('../pages/modules/ad/updateAd')),
  },
  {
    path: `${CONTENT_ROUTE_PATH}/ad/detail`,
    exact: true,
    name: 'adDetail',
    mark: 'ad',
    title: '广告详情',
    level: 3,
    authority: ['10401'],
    component: loadable(() => import('../pages/modules/ad/adDetail')),
  },
  {
    path: `${CONTENT_ROUTE_PATH}/ad`,
    exact: false,
    name: 'ad',
    mark: 'ad',
    title: '广告列表',
    level: 2,
    authority: ['10401'],
    component: loadable(() => import('../pages/modules/ad/adList')),
    routes: [
      {
        path: `${CONTENT_ROUTE_PATH}/ad`,
        exact: true,
        name: 'miroAdList',
        mark: 'ad',
        title: '广告列表',
        level: 2,
        component: loadable(() => import('../pages/modules/ad/list/miroAdList')),
      },
      {
        path: `${CONTENT_ROUTE_PATH}/ad/toblist`,
        exact: true,
        name: 'tobAdList',
        mark: 'ad',
        title: '广告列表',
        level: 2,
        component: loadable(() => import('../pages/modules/ad/list/tobAdList')),
      },
    ]
  },
  {
    path: `${CONTENT_ROUTE_PATH}/adexamine`,
    exact: true,
    name: 'adExamine',
    mark: 'adExamine',
    title: '广告审核',
    level: 2,
    authority: ['10402'],
    component: loadable(() => import('../pages/modules/ad/adExamine')),
  },
  {
    path: `${CONTENT_ROUTE_PATH}/sa`,
    exact: true,
    name: 'sa',
    mark: 'sa',
    title: '服务区管理',
    level: 2,
    authority: ['10500'],
    component: loadable(() => import('../pages/modules/sa/saList')),
  },
  {
    path: `${CONTENT_ROUTE_PATH}/apk`,
    exact: true,
    name: 'apk',
    mark: 'apk',
    title: 'APK更新',
    level: 2,
    authority: ['10700'],
    component: loadable(() => import('../pages/modules/apk/apkList')),
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