/**
 * -------------------------------------------------------
 * 标题
 * @description 描述
 * -------------------------------------------------------
 */

import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useObserver } from 'mobx-react'
import { Button, Row, Col, message } from 'antd'
import ModuleRoutes from '../../../components/ModuleRoutes/moduleRoutes'
import PageWrap from '../../../components/PageWrap/pageWrap'
import useStores from '../../../hooks/useStores'
import findChildRoutes from '../../../utils/route/findChildRoutes'
import { CONTENT_ROUTE_PATH } from '../../../utils/constant'

const AdList: React.FC = () => {
  const { globalStore: store } = useStores()
  const history = useHistory()
  const adListRoutes = findChildRoutes(store.contentRoutes, { name: 'ad' })

  return useObserver(() => (
    <PageWrap isNProgressDone={false}>
      <h2>广告列表</h2>
      <Button>
        <Link to={`${CONTENT_ROUTE_PATH}/ad/update`}>新建广告</Link>
      </Button>
      <div>
        <Link to={`${CONTENT_ROUTE_PATH}/ad`} style={{ marginRight: 10 }}>镜电的</Link>
        <Link to={`${CONTENT_ROUTE_PATH}/ad/toblist`}>B端的</Link>
      </div>
      <div>
        <ModuleRoutes routes={adListRoutes} />
      </div>
      <div onClick={() => { store.updateUserInfo({ phone: '18000022220' }) }}>用户信息：{JSON.stringify(store.userInfo)}</div>
      {/*<div onClick={() => request.get('hjhjk', {})}>点击看看</div>*/}
      <Row>
        <Col xs={24} sm={12} md={6}>
          <div style={{ padding: '20px', color: '#fff', background: '#7496ff' }}>宽度测试</div>
        </Col>
      </Row>
    </PageWrap>
  ))
}

export default AdList
