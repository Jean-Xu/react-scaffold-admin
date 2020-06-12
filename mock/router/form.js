/**
 * -------------------------------------------------------
 * 表单示例
 * @description 描述
 * 目录：
 * 基础表单
 * -------------------------------------------------------
 */

const Router = require('koa-router')
const delayRes = require('../utils/delayRes')

const router = new Router()
const baseRes = {
  errorCode: 0,
  data: {},
  message: '成功'
}

// ======================== 提交基础表单 ========================
router.post('/api/form/submit', async (ctx, next) => {
  ctx.response.body = baseRes
  console.log('提交基础表单-参数：', ctx.request.body)
})

module.exports = router