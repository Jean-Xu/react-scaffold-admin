/**
 * -------------------------------------------------------
 * 底部版权
 * @description 描述
 * -------------------------------------------------------
 */

import React, {  } from 'react'
import { CopyrightCircleOutlined } from '@ant-design/icons'
import classNames from 'classnames'

import './style.scss'

interface CopyrightProps {
  type?: 'light' | 'dark'
}

const Copyright: React.FC<CopyrightProps> = (props) => {
  const { type } = props
  const classes = classNames('copyright', { [`${type}`]: type })

  return (
    <footer className={classes}>Copyright <CopyrightCircleOutlined className="icon-copyright" /> {new Date().getFullYear()} XXX公司 ICP备XX888</footer>
  )
}

Copyright.defaultProps = {
  type: 'dark'
}

export default Copyright