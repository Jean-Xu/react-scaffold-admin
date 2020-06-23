/**
 * -------------------------------------------------------
 * 用于简单的条件渲染
 * @description 使用时用<IfRender/>组件包裹
 * -------------------------------------------------------
 */

import React from 'react'

interface IfRenderProps {
  if: boolean
}

const IfRender: React.FC<IfRenderProps> = ({ if: cond, children }) => {
  return cond ? <>{children}</> : null
}

export default IfRender
