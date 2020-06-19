/**
 * -------------------------------------------------------
 * 公用
 * @description 描述
 * 目录：
 * 上传文件
 * -------------------------------------------------------
 */

const http = require('http')
const Router = require('koa-router')
const router = new Router()

// ======================== 上传文件 ========================
router.post('/api/base/upload', async (ctx, next) => {
  console.log('登出-参数：', ctx.request.body)
})

