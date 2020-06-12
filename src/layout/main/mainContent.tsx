/**
 * -------------------------------------------------------
 * 系统主体内容布局
 * @description 注意：如果<Route>没有子页面
 * 就不加exact（在组件里继续写<Route>…） 否则必须加exact
 * -------------------------------------------------------
 */

import React from 'react'
import { useObserver } from 'mobx-react'
import { Layout } from 'antd'
import ModuleRoutes from '../../components/ModuleRoutes/moduleRoutes'
import useStores from '../../hooks/useStores'

const MainContent: React.FC = () => {
  const { globalStore: store } = useStores()

  return useObserver(() => (
    <Layout.Content className="main-content">
      <ModuleRoutes routes={store.contentRoutes} />
    </Layout.Content>
  ))
}

export default MainContent
