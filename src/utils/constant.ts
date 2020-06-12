/**
 * -------------------------------------------------------
 * 公用常量
 * @description 描述
 * -------------------------------------------------------
 */

export const DEV_HOST = 'http://192.168.0.202'                 // 开发环境域名
export const PROD_HOST = 'https://exmiroserver.mirrormedia.cn' // 生成环境域名
export const MOCK_HOST = 'http://localhost:3668'               // mock域名
export const EXTRA_NUM = 99999999                              // 特大数
export const HTTP_STATUS_MESSAGE = {                           // http状态码信息
  '200': '请求成功',
  '201': '201 请求成功 并且服务器创建了新的资源',
  '202': '202 服务端已接受请求 但尚未处理',
  '400': '400 服务端无法解析该请求',
  '401': '401 请求没有进行身份验证或验证 服务端未通过',
  '403': '403 服务端拒绝此请求',
  '404': '404 服务端未找到相关接口或资源',
  '500': '500 服务端错误',
  '501': '501 服务端暂无完成请求的功能',
  '502': '502 服务端网关错误',
  '503': '503 服务端目前无法使用',
  '504': '504 服务端网关超时',
}
export const ERRCODE_CATCH = -510                              // 捕获错误时返回一个errorCode值
export const JURISDICTION_ARR = [                              // 所有权限
  // 公司端
  '10100', // 后台用户管理
  '10201', '10202', '10203', // 总公司人员管理、分公司人员管理、服务区人员管理
  '10300', // 小程序用户管理
  '10401', '10402', // 广告列表、广告审核（广告管理）
  '10500', // 服务区管理
  '10601', '10602', // 镜位管理、镜网管理（安装维护工程管理）
  '10700', // APK更新
  '10800', // 权限组管理
  '11101', '11102', // 广告统计、人流量统计
  '10900', // 全局设置
  '11000', // 账号设置
]
export const JURISDICTION_ARR_B = [
  // B端
  '20202', '20203', // 分公司人员管理、服务区人员管理
  '20401', '20402', // 广告列表、广告审核（广告管理）
  '20602', // 镜网管理
  '21000', // 账号设置
]
export const PREFIX = ''                            // APP路径前缀（一般情况不需要）
export const CONTENT_ROUTE_PATH = `/${PREFIX}app`   // 内容模块路由根路径
export const AUTH_ROUTE_PATH = `/${PREFIX}auth`     // 鉴权相关路由根路径
export const ERR_ROUTE_PATH = `/${PREFIX}404`       // 错误路由根路径