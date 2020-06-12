/**
 * -------------------------------------------------------
 * 未授权的路由
 * @description 未登陆都跳转至"/auth/login"
 * -------------------------------------------------------
 */

import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { AUTH_ROUTE_PATH } from '../../utils/constant'

// pages
import Login from '../../pages/common/login/login'

const Unauth: React.FC = () => {
  return (
    <Switch>
      <Route path={`${AUTH_ROUTE_PATH}/login`}>
        <Login />
      </Route>
      <Redirect to={`${AUTH_ROUTE_PATH}/login`} />
    </Switch>
  )
}

export default Unauth