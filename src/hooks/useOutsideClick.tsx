/**
 * -------------------------------------------------------
 * 点击组件以外区域
 * @description 组件的ref不包含被点击的元素 即点击了组件外
 * -------------------------------------------------------
 */

import React, { useEffect } from 'react'

function useOutsideClick(ref: React.RefObject<HTMLElement>, fn: Function) {
  const handleClickOutside = (e: MouseEvent): void => {
    if (ref.current && !ref.current.contains(e.target as Node)) fn()
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [ref])
}

export default useOutsideClick