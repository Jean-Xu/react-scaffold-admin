import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from 'antd'
import useStores from '../../../hooks/useStores'
import { CONTENT_ROUTE_PATH } from '../../../utils/constant'

import './style.scss'
import Copyright from "../../../components/Copyright/copyright";

const Error404: React.FC = () => {
  const history = useHistory()
  const { globalStore: store } = useStores()

  useEffect(() => {
    NProgress.done()
  })

  return (
    <div className="entry-container bg-gray 404-page">
      <div className="error-box">

        <div className="error-box-hd">
          <div className="number-4"></div>
          <div className="number-navigation">
            <div className="number-navigation-c1"></div>
            <div className="number-navigation-pointer"></div>
          </div>
          <div className="number-4"></div>
        </div>

        <div className="error-box-bd">
          <p className="error-box-text">抱歉，该页不存在
            <Button
              className="btn-link"
              type="link"
              onClick={() => {
                store.setBreadcrumbsList([])
                history.push(CONTENT_ROUTE_PATH)
              }}
            >
              回到首页
            </Button>
          </p>
          <p className="error-box-text">Very sorry, the page not found</p>
        </div>

      </div>
      <Copyright />
    </div>
  )
  /*return useObserver(() => (
    <>
      <div style={{ fontSize: 30 }}>404页</div>
      <Button
        type="primary"
        size="large"
        style={{ marginRight: 15 }}
        onClick={() => {
          history.goBack()
        }}
      >
        返回上一页
      </Button>
      <Button
        type="primary"
        size="large"
        onClick={() => {
          store.setBreadcrumbsList([])
          history.push(CONTENT_ROUTE_PATH)
        }}
      >
        回到首页
      </Button>

    </>
  ))*/
}

export default Error404
