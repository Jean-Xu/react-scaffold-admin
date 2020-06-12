import React, { useState, useEffect, useContext } from 'react'
import { Layout } from 'antd'
// https://github.com/malte-wessel/react-custom-scrollbars/tree/master/docs
import Scrollbars from 'react-custom-scrollbars'
import MenuList from '../../components/MenuList/menuList'
import { SizeContext } from './main'

const MainSider: React.FC = () => {
  const { fullHeight } = useContext(SizeContext)
  const [ siderBdHeight, setSiderBdHeight ] = useState<number>(0)

  useEffect(() => {
    const siderBdHeight = document.querySelector('.sider-hd')?.clientHeight || 0
    setSiderBdHeight(fullHeight - siderBdHeight)
  }, [fullHeight])

  return (
    <Layout.Sider className="main-sider">
      <div className="sider-hd">
        <div className="logo">YOUR LOGO</div>
      </div>
      <div className="sider-bd">
        <Scrollbars style={{ width: '100%', height: siderBdHeight }}>
          <MenuList />
        </Scrollbars>
      </div>
    </Layout.Sider>
  )
}

export default MainSider
