/**
 * -------------------------------------------------------
 * 菜单列表
 * @description 注意:<<Menu.Item>单独抽出来会报错
 * defaultSelectedKeys只会在组件载入后执行一次 setState赋值是没用的
 * -------------------------------------------------------
 */

import React, { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useObserver } from 'mobx-react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import _ from 'lodash'
import useStores from '../../hooks/useStores'
import generateMenuData from '../../utils/menu/generateMenuData'
import flattenRoutes from '../../utils/route/flattenRoutes'

import './style.scss'

const { SubMenu } = Menu

const MenuList: React.FC = () => {
  const { globalStore: store } = useStores()
  const location = useLocation()

  const { menuData, flatMenuData } = generateMenuData(store.role, store.userInfo?.authority || [])
  const flatRoutes = flattenRoutes(store.contentRoutes)

  const [ selectedKeys, setSelectedKeys ] = useState<string[]>()

  // 默认打开的下拉菜单
  const defaultOpenKeys = (): string[] => {
    let keys = ['']

    const mark = _.find(flatRoutes, { path: location.pathname })?.mark
    if (mark) {
      const parentId = _.find(flatMenuData, { mark })?.parentId || ''
      keys = [parentId]
    }

    return keys
  }

  // 点击菜单项时 设置selectedKeys
  const handleMenuItemClick = (key: string): void => {
    setSelectedKeys([key])
  }

  useEffect(() => {
    // 浏览器url变化 或前进后退时 设置selectedKeys
    // store.breadcrumbsList比location的变化滞后，不要选择store.breadcrumbsList[0]来判断！
    const mark = _.find(flatRoutes, { path: location.pathname })?.mark
    if (mark) setSelectedKeys([mark])
  }, [location.pathname])

  return useObserver(() => (
    <div className="menu-site">
      <Menu
        defaultOpenKeys={defaultOpenKeys()}
        selectedKeys={selectedKeys}
        mode="inline"
        theme="dark"
      >
        {menuData.map((item) => {
          if (item.renderType === 'link') {
            return (
              <Menu.Item
                key={item.mark}
                icon={item.icon}
                onClick={({ key }) => {
                  handleMenuItemClick(key)
                }}
              >
                <Link to={item.path}>
                  {item.title}
                </Link>
              </Menu.Item>
            )
          } else {
            return (
              <SubMenu
                title={item.title}
                icon={item.parentIcon}
                key={item.id}
              >
                {item.children?.map((subItem) => {
                  return (
                    <Menu.Item
                      icon={subItem.icon}
                      key={subItem.mark}
                    >
                      <Link to={subItem.path}>
                        {subItem.title}
                      </Link>
                    </Menu.Item>
                  )
                })}
              </SubMenu>
            )
          }
        })}
      </Menu>
    </div>
  ))
}

export default MenuList
