/**
 * -------------------------------------------------------
 * 最近登录账号列表
 * @description 描述
 * -------------------------------------------------------
 */

import React, { useState, useEffect, useRef } from 'react'
import { useObserver } from 'mobx-react'
import { DownOutlined, CloseOutlined } from '@ant-design/icons'
import Scrollbars from 'react-custom-scrollbars'
import classNames from 'classnames'
import Transition from '../../../../components/Transition/transition'
import _ from 'lodash'
import useStores from '../../../../hooks/useStores'
import useOutsideClick from '../../../../hooks/useOutsideClick'

import './style.scss'

// mk 列表：点击箭头切换显示y/隐藏 箭头旋转，点击空白隐藏，选中项隐藏，点击删除不隐藏
// 显示隐藏的动画 可以封装成一个组件

interface RecentListSelectProps {
  username: string
  onSelect: (item: string) => void
}

const RecentListSelect: React.FC<RecentListSelectProps> = (props) => {
  const { username, onSelect } = props
  const { globalStore: store } = useStores()

  const [ listVisible, setListVisible ] = useState(false)
  const [ selectedIndex, setSelectedIndex ] = useState(-1)
  const [ listHeight, setListHeight ] = useState(0)
  const compRef = useRef(null)

  useOutsideClick(compRef, () => {
    setListVisible(false)
  })

  // 切换显示下拉列表
  const toggleList = (): void => {
    setListVisible(!listVisible)
  }

  // 点击列表项
  const handleItemClick = (item: string, index: number): void => {
    onSelect(item)
    setSelectedIndex(index)
    toggleList()
  }

  // 删除某项
  const removeItem = (item: string, index: number): void => {
    if (index === selectedIndex) {
      setSelectedIndex(-1)
    }
    store.updateRecentList('remove', item)
  }

  useEffect(() => {
    const rcListLen = store.recentList.length
    if (rcListLen > 5) {
      setListHeight(188) // 5*36+8
    } else {
      setListHeight(rcListLen * 36 + 8)
    }
  }, [store.recentList])

  useEffect(() => {
    // 列表显示时  最近登录账号列表包含账号输入框的值 就添加选中状态
    if (listVisible) {
      const _index = _.indexOf(store.recentList, username)
      setSelectedIndex(_index)
    }
  }, [listVisible])

  return useObserver(() => {
    return store.recentList.length ? (
      <div ref={compRef}>
        <span className="rc-handle" onClick={toggleList}>
          <DownOutlined className={classNames('icon', { 'rotate': listVisible })} />
        </span>
        <Transition in={listVisible} animation="zoom-in-top" timeout={300}>
          <div className="rc-list">
            <Scrollbars style={{ height: listHeight }}>
              <div className="inner">
                {store.recentList.map((item, index) => (
                  <div
                    className={classNames('item', { 'selected': selectedIndex === index })}
                    key={index}
                    onClick={() => handleItemClick(item, index)}
                  >
                    {item}
                    <div
                      className="del"
                      onClick={(e) => {
                        removeItem(item, index)
                        e.stopPropagation()
                      }}
                    >
                      <CloseOutlined className="icon-close" />
                    </div>
                  </div>
                ))}
              </div>
            </Scrollbars>
          </div>
        </Transition>
      </div>
    ) : null
  })
}

export default RecentListSelect