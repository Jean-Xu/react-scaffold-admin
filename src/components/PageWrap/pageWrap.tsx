/**
 * -------------------------------------------------------
 * 页面wrap
 * @description 不要使用react-custom-scrollbars
 * 会有滚动条一开始不渲染 滚动时才渲染的bug
 * -------------------------------------------------------
 */

import React, { useState, useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import classNames from 'classnames'
import { SizeContext } from '../../layout/main/main'

import './style.scss'

interface PageWrapProps {
  className?: string
  isHeightOpen?: boolean // 高度是否撑开为父容器的100%
  isNProgressDone?: boolean // 是否结束进度条
}

const PageWrap: React.FC<PageWrapProps> = (props) => {
  const { className, isNProgressDone, isHeightOpen, children } = props
  const location = useLocation()
  const { fullHeight } = useContext(SizeContext)

  const [ isMounted, setIsMounted ] = useState(false)
  const [ wrapHeight, setWrapHeight ] = useState('')

  const classes = classNames('page-wrap', className, {
    'fade-in': isMounted
  })

  useEffect(() => {
    let timer: any = null
    // 不加定时器 有子路由的页面就无淡入效果！
    if (!isMounted) {
      timer = setTimeout(() => {
        setIsMounted(true)
      }, 60)
      isNProgressDone && NProgress.done()
    }

    return () => {
      clearTimeout(timer)
    }
  }, [location.pathname])

  useEffect(() => {
    if (isHeightOpen) {
      const headerHeight = document.querySelector('.main-header')?.clientHeight || 0
      setWrapHeight(fullHeight - headerHeight + 'px')
    }
  }, [fullHeight])

  return (
    <div className={classes} style={{ height: wrapHeight }}>
      {children}
    </div>
  )
}

PageWrap.defaultProps = {
  isHeightOpen: true,
  isNProgressDone: true
}

export default PageWrap