/**
 * -------------------------------------------------------
 * 用户管理
 * @description 模拟接口
 * 目录：
 * 短信验证码
 * 登录
 * 登出
 * 后台用户列表
 * 权限组列表
 * -------------------------------------------------------
 */

const path = require('path')
const fs = require('fs')
const Router = require('koa-router')
const delayRes = require('../utils/delayRes')

const router = new Router()
const DATA_PATH = './data/user'
const baseRes = {
  errorCode: 0,
  data: {},
  message: '成功'
}

// ======================== 短信验证码 ========================
router.get('/api/admin/smsget', async (ctx, next) => {
  ctx.response.body = baseRes
  console.log('短信验证码-参数：', ctx.request.query)
})

// ======================== 登录 ========================
router.post('/api/admin/login', async (ctx, next) => {
  const { username, password } = ctx.request.body
  let data = {}
  const fixedPassword = '123456'

  switch (username) {
    case 'admin':
    case '18666666666':
      if (password === fixedPassword) {
        data = await fs.readFileSync(path.resolve(`${DATA_PATH}/login.json`), 'utf8')
      } else {
        data = { ...baseRes, ...{ errorCode: 1, message: '密码错误' } }
      }
      break
    case '18888888888':
      if (password === fixedPassword) {
        data = await fs.readFileSync(path.resolve(`${DATA_PATH}/user/login-b.json`), 'utf8')
      } else {
        data = { ...baseRes, ...{ errorCode: 1, message: '密码错误' } }
      }
      break
    default:
      data = { ...baseRes, ...{ errorCode: 1, message: '账号不存在' } } // koa会自动转为json返回给前台
  }

  // data = await delayReturnData(data, 500)

  ctx.response.body = data
  console.log('登录-参数：', ctx.request.body)
})

// ======================== 登出 ========================
router.post('/api/admin/logout', async (ctx, next) => {
  ctx.response.body = baseRes
  console.log('登出-参数：', ctx.request.body)
})

// ======================== 后台用户列表 ========================
router.get('/api/admin/adminlist', async (ctx, next) => {
  let data = await fs.readFileSync(path.resolve(`${DATA_PATH}/bguserlist.json`), 'utf8')
  data = await delayRes(data, 1000)
  ctx.response.body = data
  console.log('后台用户列表-参数：', ctx.request.query)
})

// ======================== 权限组列表 ========================
router.get('/api/group/getgrouplist', async (ctx, next) => {
  const data = await fs.readFileSync(path.resolve(`${DATA_PATH}/grouplist.json`), 'utf8')
  ctx.response.body = data
  console.log('权限组列表-参数：', ctx.request.query)
})

module.exports = router
