import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useObserver } from 'mobx-react'
import { SwitchTransition, CSSTransition } from 'react-transition-group'
import { Button } from 'antd'
import useStores from '../../../hooks/useStores'
import { CONTENT_ROUTE_PATH } from '../../../utils/constant'

import './style.scss'

const Error404: React.FC = () => {
  const history = useHistory()
  const { globalStore: store } = useStores()
  const [ key, setKey ] = useState('jack')

  useEffect(() => {
    NProgress.done()
  })

  return useObserver(() => (
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

      <div>
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={key}
            addEndListener={(node, done) => {
              node.addEventListener('transitionend', done, false)
            }}
            classNames='fade'
          >
            <div>r
              <Button onClick={() => {
                setKey((oldValue) => {
                  return oldValue === 'jack' ? 'tom' : 'jack'
                })
              }}>
                {key}
              </Button>
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>

    </>
  ))
}

export default Error404
