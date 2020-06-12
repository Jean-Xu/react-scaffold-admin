import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { useObserver } from 'mobx-react'
// https://ant.design/components/config-provider-cn/#API
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import { setTwoToneColor } from '@ant-design/icons'
import AuthRoute from './components/AuthRoute/authRoute'
import useStores from './hooks/useStores'
import { AUTH_ROUTE_PATH, CONTENT_ROUTE_PATH, ERR_ROUTE_PATH } from './utils/constant'

// layouts
import Main from './layout/main/main'
import Unauth from './layout/unauth/unauth'

// pages
import Error404 from './pages/common/error/err404'

// 全局设置双色图标颜色
setTwoToneColor('#6251dd')

// 不显示顶部右侧Spinner
NProgress.configure({ showSpinner: false })

const App: React.FC = () => {
  const { globalStore: store } = useStores()

  return useObserver(() => (
    <div className="app">
      <ConfigProvider
        componentSize="large"
        locale={zhCN}
        // autoInsertSpaceInButton={false}
      >
        <BrowserRouter>
          <Switch>
            <Route path={AUTH_ROUTE_PATH}>
              <Unauth />
            </Route>
            <AuthRoute path={CONTENT_ROUTE_PATH}>
              <Main />
            </AuthRoute>
            <Route path={ERR_ROUTE_PATH}>
              <Error404 />
            </Route>
            <Redirect from="/" to={CONTENT_ROUTE_PATH} exact />
            {store.loginState ? <Redirect to={ERR_ROUTE_PATH} /> : <Redirect to={AUTH_ROUTE_PATH} />}
          </Switch>
        </BrowserRouter>
      </ConfigProvider>
    </div>
  ))
}

export default App
