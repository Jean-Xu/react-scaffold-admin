/**
 * -------------------------------------------------------
 * 服务区管理
 * @description 模拟接口
 * 目录：
 * 服务区列表
 * 服务区详情
 * 创建主服务区
 * 创建子服务区
 * 编辑服务区
 * 删除服务区
 * -------------------------------------------------------
 */

const path = require('path')
const fs = require('fs')
const Router = require('koa-router')
const delayRes = require('../utils/delayRes')

const router = new Router()
const DATA_PATH = './data/sa'
const baseRes = {
  errorCode: 0,
  data: {},
  message: '成功'
}

// ======================== 服务区列表 ========================
router.get('/api/servicearea/servicearealist', async (ctx, next) => {
  const data = await fs.readFileSync(path.resolve(`${DATA_PATH}/salist.json`), 'utf8')
  ctx.response.body = data
  console.log('服务区列表-参数：', ctx.request.query)
})

// ======================== 服务区详情 ========================
router.get('/api/servicearea/serviceareainfo', async (ctx, next) => {
  const { servicearea_id } = ctx.request.query
  const data = await fs.readFileSync(path.resolve(`${DATA_PATH}/sainfo-${servicearea_id}.json`), 'utf8')
  ctx.response.body = data
  console.log('服务区详情-参数：', ctx.request.query)
})

// ======================== 创建主服务区 ========================
router.post('/api/servicearea/addservicearea', async (ctx, next) => {
  ctx.response.body = { ...baseRes, data: { serviceareaid:45 }, message: '服务区创建成功' }
  console.log('创建主服务区-参数：', ctx.request.body)
})

// ======================== 创建子服务区 ========================
// let tempFlag = 0
router.post('/api/servicearea/addserviceareadetail', async (ctx, next) => {
  // 调试一个成功一个失败使用！
  // tempFlag++
  // if (tempFlag <= 1) {
  //   ctx.response.body = { ...baseRes, message: '子服务区创建成功' }
  // } else {
  //   ctx.response.body = { ...baseRes, errorCode: 1, message: '子服务区创建失败' }
  //   tempFlag = 0
  // }
  ctx.response.body = { ...baseRes, message: '子服务区创建成功' }
  console.log('创建子服务区-参数：', ctx.request.body)
})

// ======================== 编辑服务区 ========================
router.post('/api/servicearea/editservicearea', async (ctx, next) => {
  ctx.response.body = { ...baseRes, message: '修改成功' }
  console.log('编辑服务区-参数：', ctx.request.body)
})

// ======================== 删除服务区 ========================
router.post('/api/servicearea/delservicearea', async (ctx, next) => {
  ctx.response.body = { ...baseRes, message: '修改成功' }
  console.log('删除服务区-参数：', ctx.request.body)
})

module.exports = router
