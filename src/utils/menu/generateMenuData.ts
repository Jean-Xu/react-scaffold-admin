/**
 * -------------------------------------------------------
 * 生成菜单数据
 * @description 将菜单写死 在获取权限后过滤掉不需要的项
 * 'miro'/'tob'对应store中的角色
 * -------------------------------------------------------
 */

import React from 'react'
import _ from 'lodash'
import { Base64 } from 'js-base64'
import isInAuthority from '../isInAuthority'
import sourceMenuData, { FlatMenuDataType } from './sourceMenuData'
import { CONTENT_ROUTE_PATH } from '../constant'

export interface MenuItemType {
  id: string
  title: string
  mark: string
  path: string
  renderType: 'link' | 'dropdown'
  parentId?: string
  icon?: React.ReactNode
  parentIcon?: React.ReactNode
  children?: MenuItemType[]
}
export type MenuDataType  = Array<MenuItemType>

interface FuncReturnType {
  menuData: MenuDataType
  flatMenuData: FlatMenuDataType
}

function generateMenuData(role: string, userAuthority: string[]): FuncReturnType {
  const sourceList = _.filter(sourceMenuData[role as ('miro' | 'tob')], item => {
    return isInAuthority(item.authority, userAuthority)
  })

  let result: MenuDataType = []

  _.forEach(sourceList, (item, index) => {
    if (item.parentId) {
      if (
        // 如果前一项为空
        !sourceList[index - 1] ||
        // 如果前一项是普通链接
        !sourceList[index - 1].parentId ||
        // 如果前一项的parentId与当前的不同（两个下拉菜单相邻的情况）
        sourceList[index - 1].parentId !== item.parentId
      ) {
        // 新建下拉菜单项
        result.push({
          id: item.parentId,
          title: Base64.decode(item.parentId),
          mark: item.mark,
          path: '',
          renderType: 'dropdown',
          parentIcon: item?.parentIcon,
          children: [{
            id: item.id,
            parentId: item.parentId,
            title: Base64.decode(item.id),
            mark: item.mark,
            path: item.path,
            renderType: 'link',
            icon: item?.icon
          }]
        })
      } else {
        // 前一项也是下拉菜单时
        const _i = _.findIndex(result, { id: item.parentId })
        if (_i !== -1) {
          // @ts-ignore
          result[_i].children.push({
            id: item.id,
            parentId: result[_i].id,
            title: Base64.decode(item.id),
            mark: item.mark,
            path: item.path,
            renderType: 'link',
            icon: item?.icon
          })
        }
      }
    } else {
      result.push({
        id: item.id,
        title: Base64.decode(item.id),
        mark: item.mark,
        path: item.path,
        renderType: 'link',
        icon: item?.icon
      })
    }
  })

  // 如果某项的子拉菜单项只有1个
  _.forEach(result, (item, index) => {
    if (item.children && item.children.length === 1) {
      result.splice(index, 1, item.children[0]) // splice将位置index的元素 换成item.children[0]
    }
  })

  return {
    menuData: result,
    flatMenuData: sourceList as FlatMenuDataType
  }
}

export default generateMenuData