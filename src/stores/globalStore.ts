/**
 * -------------------------------------------------------
 * 全局状态管理
 * @description 系统共用的 很多state不需要设置清除的action，
 * 目录（computed/action/effects）：
 * 角色
 * 更新用户信息
 * 清除用户信息
 * 设置登陆状态
 * 设置面包屑导航列表
 * 增加最近登录的账号并储存
 * 改变loader组件状态
 * 登陆动作
 * 登出动作
 * -------------------------------------------------------
 */

import { observable, action, computed, runInAction, configure } from 'mobx'
import { message } from 'antd'
// https://github.com/ustbhuangyi/storage
import storage from 'good-storage'
import _ from 'lodash'
import { encodeObj, decodeObj } from '../utils/simpleObjToBase64'
import isInAuthority from '../utils/isInAuthority'
import request from '../utils/request'
import logoutCb from '../utils/logoutCb'
import contentRoutes from '../routes/contentRoutes'
import contentRoutesB from '../routes/contentRoutesB'
import { RouteType } from '../types/router'

// 用户信息-类型
interface BaseUserInfoType {
  realName: string
  userName: string
  phone: string
  identity: string
  authority: string[]
  status: string
  needAcceptMsg: boolean
  timeStamp: number
  avatar?: string
  createTime?: string
}
export type UserInfoType = BaseUserInfoType | null

// 面包屑导航列表-类型
export interface BreadcrumbsItemType {
  level: number
  name: string
  mark: string
  path: string
  title: string
}
export type BreadcrumbsListType = BreadcrumbsItemType[]

// loader组件状态-类型
export interface LoaderType {
  visible: boolean
  transition: boolean
  text: string
}

configure({ enforceActions: 'observed' })

class GlobalStore {
  // ======================== state ========================
  // 用户信息
  @observable userInfo: UserInfoType = null
  // 登录状态
  @observable loginState: boolean = false
  // 面包屑导航列表
  @observable breadcrumbsList: BreadcrumbsListType = []
  // 最近登录账号列表
  @observable recentList: string[] = []
  // loader组件状态
  @observable loader: LoaderType = {
    visible: false,
    transition: true,
    text: '数据加载中',
  }

  constructor() {
    // 用户信息-初始化
    // @description 一般情况是只存储token 根据有无token判断是否登陆 然后通过接口拿到userInfo
    const localUi = storage.session.get('ui')
    if (localUi !== undefined) this.userInfo = decodeObj(localUi) as UserInfoType

    // 登录状态-初始化
    const localMk = storage.session.get('mk') // 0登出 1已登陆
    if (localMk !== undefined) this.loginState = !!localMk

    // 面包屑导航列表初始化
    const localCrumbs = storage.session.get('crumbs')
    if (localCrumbs !== undefined) this.breadcrumbsList = localCrumbs

    // 最近登录账号列表-初始化
    const localRc = storage.get('rc_list')
    if (localRc !== undefined) this.recentList = localRc
  }

  // ======================== computed ========================
  // 角色
  @computed
  get role(): string {
    const identity = this.userInfo?.identity
    switch (identity) {
      case '1':
      case '2':
        return 'miro' // 镜电公司内部人员
      case '3':
      case '4':
      case '5':
        return 'tob' // 路公司/服务区人员
      default:
        return ''
    }
  }

  @computed
  get contentRoutes(): RouteType[] {
    const routes = this.role === 'miro' ? contentRoutes : contentRoutesB

    return _.filter(routes, item => {
      const authority = item?.authority
      const userAuthority = this.userInfo?.authority
      return (authority && userAuthority)
        ? isInAuthority(authority, userAuthority)
        : true
    })
  }

  // ======================== action ========================
  // 更新用户信息
  @action.bound
  updateUserInfo(data: Partial<UserInfoType>): void {
    this.userInfo = _.assign({}, this.userInfo, data)
    storage.session.set('ui', encodeObj(this.userInfo))
  }

  // 清除用户信息
  @action.bound
  clearUserInfo(): void {
    this.userInfo = null
    storage.session.remove('ui')
  }

  // 设置登陆状态
  @action.bound
  setLoginState(bool: boolean): void {
    this.loginState = bool
    bool ? storage.session.set('mk', 1) : storage.session.remove('mk')
  }

  // 设置面包屑导航列表
  @action.bound
  setBreadcrumbsList(data: BreadcrumbsListType): void {
    this.breadcrumbsList = data
    data.length ? storage.session.set('crumbs', data) : storage.session.remove('crumbs')
  }

  // 增加最近登录的账号并储存
  @action.bound
  updateRecentList(type: 'add' | 'remove', item: string): void {
    let recentList: string[] = [ ...this.recentList ]

    if (type === 'add') {
      recentList = [ item, ...this.recentList ]
      recentList = _.uniq(recentList)
      recentList = _.slice(recentList, 0, 10)
    } else {
      recentList = _.filter(recentList, _item => _item !== item)
    }

    this.recentList = recentList
    storage.set('rc_list', recentList)
  }

  // 更改loader组件状态
  @action.bound
  changeLoader(option: Partial<LoaderType>): void {
    if (option.visible && !_.has(option, 'text')) {
      option.text = '数据加载中'
    }
    this.loader = _.assign(this.loader, option)
  }

  // ======================== effects ========================
  // 登陆动作
  @action
  login(username: string, password: string): Promise<boolean> {
    return new Promise(resolve => {
      const { pro } = request.post('/api/admin/login', { username, password })
      // @ts-ignore
      pro.then(({ errorCode, message: msg, data }) => {
        if (errorCode === 0) {
          this.updateUserInfo({
            realName: data.real_name,
            userName: data.username,
            phone: data.phone,
            avatar: data?.avatar,
            identity: `${data.identity}`,
            authority: data.jurisdictionid.split(','),
            status: `${data.status}`,
            needAcceptMsg: !!data.no_msg,
            timeStamp: +new Date()
          })
          this.setLoginState(true)

          resolve(true)
          message.success('登陆成功')
        } else {
          resolve(false)
          message.error(msg)
        }
      }).catch(() => {
        resolve(false)
      })
    })
  }

  // 登出动作
  @action
  logout(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const { pro } = request.post('/api/admin/logout')
      // @ts-ignore
      pro.then(({ errorCode }) => {
        if (errorCode === 0) {
          logoutCb(this, false)
          resolve(true)
        } else {
          resolve(false)
        }
      }).catch(() => {
        resolve(false)
      })
    })
  }
}

export default GlobalStore
