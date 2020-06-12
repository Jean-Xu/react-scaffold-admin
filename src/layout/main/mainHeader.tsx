import React, { useEffect } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { useObserver } from 'mobx-react'
import { Breadcrumb, Button, Avatar } from 'antd'
import _ from 'lodash'
import useStores from '../../hooks/useStores'
import { CONTENT_ROUTE_PATH, AUTH_ROUTE_PATH } from '../../utils/constant'
import { BreadcrumbsListType } from '../../stores/globalStore'

const MainHeader: React.FC = () => {
  const location = useLocation()
  const history = useHistory()
  const { globalStore: store } = useStores()

  // 更新面包屑导航列表数据
  const updateBreadcrumbsList = (): void => {
    let breadcrumbsList: BreadcrumbsListType = _.cloneDeep(store.breadcrumbsList) // 必须clone不然报错
    const len =  breadcrumbsList.length
    const target = _.find(store.contentRoutes, { path: location.pathname })
    const level = target?.level || -1

    const currentItem = {
      path: location.pathname,
      name: target?.name || '',
      mark: target?.mark || '',
      title: target?.title || '',
      level,
    }

    // 只考虑2级及以上的路由（0和-1的路由不放进面包屑数组）首页默认都在
    if (level >= 2) {
      // 当前路由层级小于（包屑数组长度+1）时 直接把同级换成当前路由
      // (len + 1)是考虑当前数组没有level为1的项 抽象补一个好按逻辑计算
      if (level <= (len + 1)) {
        const index = _.findIndex(breadcrumbsList, { level })
        breadcrumbsList.splice(index, len, currentItem)
      }
      // 当前路由层级 大于包屑数组长度时 直接push进去
      else {
        breadcrumbsList.push(currentItem)
      }

      // 去重
      breadcrumbsList = _.uniqBy(breadcrumbsList, 'name')
      store.setBreadcrumbsList(breadcrumbsList)
    }

    if (level === 1) store.setBreadcrumbsList([])
  }

  const handleLogout = async (): Promise<void> => {
    const isOk = await store.logout()
    if (isOk) {
      history.replace(`${AUTH_ROUTE_PATH}/login`)
    }
  }

  useEffect(() => {
    NProgress.start()
    updateBreadcrumbsList()
  }, [location.pathname])

  return useObserver(() => (
    <div className="main-header">
      <div className="clearfix">

        <div className="breadcrumbs-site fl">
          <Breadcrumb className="breadcrumbs">
            <Breadcrumb.Item>
              <Link to={CONTENT_ROUTE_PATH}>首页</Link>
            </Breadcrumb.Item>
            {store.breadcrumbsList.map((item, index) => {
              return (
                <Breadcrumb.Item key={item.name || index}>
                  <Link to={item.path}>{item.title}</Link>
                </Breadcrumb.Item>
              )
            })}
          </Breadcrumb>
        </div>

        <Button
          className="btn-exit fr"
          size="small"
          onClick={handleLogout}
        >
          退出
        </Button>

        <div className="user-info fr">
          <Avatar className="avatar" src={store.userInfo?.avatar} />
          <span className='realname'>{store.userInfo?.realName}</span>
        </div>

      </div>
    </div>
  ))
}

export default MainHeader
