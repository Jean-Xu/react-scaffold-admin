/**
 * -------------------------------------------------------
 * 表格列表示例
 * @description 描述
 * 目录：
 * 基础；列表
 * -------------------------------------------------------
 */

const path = require('path')
const fs = require('fs')
const delayRes = require('../utils/delayRes')
const Router = require('koa-router')
const _  = require('lodash')

const router = new Router()
const DATA_PATH = './data/list'
const baseRes = {
  errorCode: 0,
  data: {},
  message: '成功'
}

// ======================== 获取基础列表 ========================
router.get('/api/book/list', async (ctx, next) => {
  let { page, row } = ctx.request.query
  page = parseInt(page)
  row = parseInt(row)

  let list = await fs.readFileSync(path.resolve(`${DATA_PATH}/list.json`), 'utf8')
  list = JSON.parse(list)

  const totalCount = list.length
  const listChunk = _.chunk(list, row)
  const currentList = listChunk[page - 1] || []

  let res = _.cloneDeep(baseRes)
  res.data = {
    info: currentList,
    page: {
      current_page: page,
      total_count: totalCount,
      total_page: listChunk.length,
      page_size: row
    }
  }

  ctx.response.body = await delayRes(res)
  console.log('服务区列表-参数：', ctx.request.query)
})

module.exports = router