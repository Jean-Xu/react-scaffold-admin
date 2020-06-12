/**
 * -------------------------------------------------------
 * 广告管理
 * @description 模拟接口
 * 目录：
 * 广告列表
 * -------------------------------------------------------
 */

const path = require('path')
const fs = require('fs')
const Router = require('koa-router')
const delayRes = require('../utils/delayRes')

const router = new Router()
const DATA_PATH = './data/ad'
const baseRes = {
  errorCode: 0,
  data: {},
  message: '成功'
}

// ======================== 广告列表 ========================
router.get('/api/advertisement/adlist', async (ctx, next) => {
  const { status } = ctx.request.query
  let totalCount = 0

  switch (status - 0) {
    case 4:
      totalCount = 10
      break
    case 5:
      totalCount = 2
      break
  }

  ctx.response.body = {
    ...baseRes,
    data: {
      info: [],
      page: {
        total_count: totalCount
      }
    }
  }

  console.log('广告列表-参数：', ctx.request.query)
})

module.exports = router
