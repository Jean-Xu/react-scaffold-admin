/**
 * -------------------------------------------------------
 * 页面Tabs导航
 * @description 描述
 * -------------------------------------------------------
 */

import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { Tabs } from 'antd'
import { RouteType } from '../../types/router'

import './style.scss'

const { TabPane } = Tabs

interface PageTabsProps {
  routes: RouteType[]
}

const PageTabs: React.FC<PageTabsProps> = (props) => {
  const { routes } = props
  const location = useLocation()
  const history = useHistory()

  const onChange = (key: string) => {
    history.push(key)
  }

  return (
    <Tabs
      className="page-tabs"
      activeKey={location.pathname}
      size="large"
      onChange={onChange}
    >
      {routes.map(item => <TabPane tab={item.title} key={(item.path as string)} />)}
    </Tabs>
  )
}

export default PageTabs