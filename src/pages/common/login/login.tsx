/**
 * -------------------------------------------------------
 * 登陆页
 * @description 描述
 * -------------------------------------------------------
 */

import React, { useState, useEffect, ChangeEvent } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { useObserver } from 'mobx-react'
import { Button, Input, Select, message } from 'antd'
import { ContactsTwoTone, LockTwoTone, CopyrightCircleOutlined } from '@ant-design/icons'
import classNames from 'classnames'
import useStores from '../../../hooks/useStores'
import { CONTENT_ROUTE_PATH } from '../../../utils/constant'
import RecentListSelect from './RecentListSelect/recentListSelect'

import './style.scss'

interface FormDataType {
  username: string
  password: string
}

const Login: React.FC = () => {
  const location = useLocation()
  const history = useHistory()
  const { globalStore: store } = useStores()

  const [ formData, setFormData ] = useState<FormDataType>({
    username: '',
    password: ''
  })
  const [ loading, setLoading ] = useState(false)
  const [ remember, setRemember ] = useState(true)

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleLogin = async (): Promise<void> => {
    const { username, password } = formData

    if (username === '') {
      message.error('请先输入账号')
      return
    }

    if (password === '') {
      message.error('请先输入密码')
      return
    }

    setLoading(true)
    const isOk = await store.login(username, password)

    if (isOk) {
      history.push(CONTENT_ROUTE_PATH)
      if (remember) store.updateRecentList('add', username)
    } else {
      setLoading(false)
    }
  }

  // 选择最近登录账号
  const onSelectRcItem = (item: string): void => {
    setFormData({
      ...formData,
      username: item
    })
  }

  useEffect(() => {
    NProgress.done()
  }, [location])

  return useObserver(() => (
    <div className="entry-container login-page">
      <div className="login-box">

        <div className="logo">YOUR LOGO</div>

        <div className="login-form">

          <div className="form-group posr">
            <Input
              className={classNames('form-control account', { 'has-rc': store.recentList.length })}
              name="username"
              value={formData.username}
              prefix={<ContactsTwoTone />}
              autoComplete="off"
              placeholder="请输入账号"
              onChange={(e) => handleChange(e)}
            />
            <RecentListSelect username={formData.username} onSelect={onSelectRcItem} />
          </div>

          <div className="form-group">
            <Input.Password
              className="form-control password"
              name="password"
              value={formData.password}
              prefix={<LockTwoTone />}
              autoComplete="off"
              placeholder="请输入密码"
              onChange={(e) => handleChange(e)}
              onPressEnter={handleLogin}
            />
          </div>

          <div className="form-opts clearfix">
            <span
              className={classNames('remember fl', { 'selected': remember })}
              onClick={() => setRemember(!remember)}
            >
              <i></i>记住账号
            </span>
            {/*<Link className="forget fr" to="">忘记密码</Link>*/}
            <span className="forget fr">忘记密码</span>
          </div>

          <Button
            className="btn-login"
            type="primary"
            loading={loading}
            block
            onClick={handleLogin}
          >
            登陆
          </Button>

        </div>

      </div>
      <footer className="copyright">Copyright <CopyrightCircleOutlined className="icon-copyright" /> {new Date().getFullYear()} XXX公司 ICP备XX888</footer>
    </div>
  ))
}

export default Login
