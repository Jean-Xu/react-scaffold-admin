import React, { useState, useEffect, createContext } from 'react'
import { Layout } from 'antd'
import _ from 'lodash'

import MainHeader from './mainHeader'
import MainSider from './mainSider'
import MainContent from './mainContent'

import './style.scss'

interface SizeContextType {
  fullHeight: number
}

export const SizeContext = createContext<SizeContextType>({
  fullHeight: 0
})

const Main: React.FC = () => {
  const [ fullHeight, setFullHeight ] = useState<number>(() => document.body.clientHeight)

  const handleWindowResize = () => {
    setFullHeight(document.body.clientHeight)
  }

  useEffect(() => {
    // throttle节流，操作频率高时 至少间隔100ms才执行回调函数
    window.addEventListener('resize', _.throttle(handleWindowResize, 100), false)

    return () => {
      window.removeEventListener('resize', handleWindowResize, false)
    }
  })

  return (
    <SizeContext.Provider value={{ fullHeight }}>
      <Layout className="main-site">
        <MainSider />
        <Layout style={{ overflow: 'hidden' }}>
          <MainHeader />
          <MainContent />
        </Layout>
      </Layout>
    </SizeContext.Provider>
  )
}

export default Main
