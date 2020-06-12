/**
 * -------------------------------------------------------
 * 源菜单数据
 * @description 注意：各属性应和contentRoutes一致！
 * -------------------------------------------------------
 */

import React from 'react'
import { HomeOutlined, EditOutlined } from '@ant-design/icons'
import { Base64 } from 'js-base64'
import { CONTENT_ROUTE_PATH } from '../constant'

export type FlatMenuDataType = Array<{
  id: string
  path: string
  mark: string
  authority: string[]
  parentId: string
  icon?: React.ReactNode
  parentIcon?: React.ReactNode
}>

export default {
  'miro': [
    {
      id: Base64.encode('首页'),
      path: CONTENT_ROUTE_PATH,
      mark: 'home',
      parentId: null,
      icon: <HomeOutlined />
    },
    {
      id: Base64.encode('基础表单'),
      path: `${CONTENT_ROUTE_PATH}/base-form`,
      mark: 'baseForm',
      authority: ['10101'],
      parentId: Base64.encode('表单页'),
      parentIcon: <EditOutlined />
    },
    {
      id: Base64.encode('上传文件'),
      path: `${CONTENT_ROUTE_PATH}/upload-form`,
      mark: 'uploadForm',
      authority: ['10102'],
      parentId: Base64.encode('表单页'),
      parentIcon: <EditOutlined />
    },
    /*{
      id: Base64.encode('后台用户管理'),
      path: `${CONTENT_ROUTE_PATH}/bguser`,
      mark: 'bgUser',
      authority: ['10100'],
      parentId: null,
    },
    {
      id: Base64.encode('小程序用户管理'),
      path: `${CONTENT_ROUTE_PATH}/mpuser`,
      mark: 'mpUser',
      authority: ['10300'],
      parentId: null,
    },
    {
      id: Base64.encode('广告列表'),
      path: `${CONTENT_ROUTE_PATH}/ad`,
      mark: 'ad',
      authority: ['10401'],
      parentId: Base64.encode('广告管理'),
    },
    {
      id: Base64.encode('广告审核'),
      path: `${CONTENT_ROUTE_PATH}/adexamine`,
      mark: 'adExamine',
      authority: ['10402'],
      parentId: Base64.encode('广告管理'),
    },
    {
      id: Base64.encode('服务区管理'),
      path: `${CONTENT_ROUTE_PATH}/sa`,
      mark: 'sa',
      authority: ['10500'],
      parentId: null,
    },
    {
      id: Base64.encode('APK更新'),
      path: `${CONTENT_ROUTE_PATH}/apk`,
      mark: 'apk',
      authority: ['10700'],
      parentId: null,
    },
    {
      id: Base64.encode('后台权限组管理'),
      path: `${CONTENT_ROUTE_PATH}/group`,
      mark: 'group',
      authority: ['10800'],
      parentId: null,
    },
    {
      id: Base64.encode('个人设置'),
      path: `${CONTENT_ROUTE_PATH}/account`,
      mark: 'account',
      authority: ['11000'],
      parentId: null,
    },*/
  ],
  'tob': [],
}