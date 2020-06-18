import React, { useEffect, useContext, useState } from 'react'
import PageWrap from '../../../components/PageWrap/pageWrap'
import { SizeContext } from '../../../layout/main/main'

const Home: React.FC = () => {
  const { fullHeight } = useContext(SizeContext)
  const [ pageConHeight, setPageConHeight ] = useState<number>()

  useEffect(() => {
    const headerHeight = document.querySelector('.main-header')?.clientHeight || 0
    setPageConHeight(fullHeight - headerHeight - 24 - 24)
  }, [fullHeight])

  return (
    <PageWrap>
      <div className="page-container" style={{ minHeight: pageConHeight }}>
        <h1 className="page-title">系统首页</h1>
        <p className="page-desc">待开发…</p>
      </div>
    </PageWrap>
  )
}

export default Home