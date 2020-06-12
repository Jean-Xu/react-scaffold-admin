import React, {  } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { RouteType } from '../../types/router'

export interface ModuleRoutesProps {
  routes: RouteType[]
}

const ModuleRoutes: React.FC<ModuleRoutesProps> = (props) => {
  const { routes } = props

  return (
    <Switch>
      {routes.map((item, index) => {
        const key = item.name || index
        return !item.redirect
          ? (
            <Route
              path={item.path}
              exact={item.exact}
              key={key}
            >
              {item.component
                // @ts-ignore
                ? <item.component/>
                : null
              }
            </Route>
          ) : (
            <Redirect
              to={item.redirect}
              key={key}
            />
          )
      })}
    </Switch>
  )
}

export default ModuleRoutes