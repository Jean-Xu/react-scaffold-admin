/**
 * -------------------------------------------------------
 * 鉴权路由
 * @description 描述
 * -------------------------------------------------------
 */

import React, {  } from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import { useObserver } from 'mobx-react'
import useStores from '../../hooks/useStores'

interface AuthRouteProps extends RouteProps {}

const AuthRoute: React.FC<AuthRouteProps> = (props) => {
  const { path, children, ...restProps } = props
  const { globalStore: store } = useStores()

  return useObserver(() => (
    <Route {...restProps}>
      {store.loginState ? <>{children}</> : <Redirect to="/auth/login" />}
    </Route>
  ))
}

export default AuthRoute