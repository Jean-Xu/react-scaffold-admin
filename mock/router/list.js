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
const _  = require('lodash')
const Router = require('koa-router')
const delayRes = require('../utils/delayRes')
const isJSON = require('../utils/isJSON')

const router = new Router()
const DATA_PATH = './data/list'
const baseRes = {
  errorCode: 0,
  data: {},
  message: '成功'
}

// 测试数据源
let list = []

// ======================== 获取列表 ========================
router.get('/api/book/list', async (ctx, next) => {
  let { page, row, queryValues } = ctx.request.query
  page = parseInt(page)
  row = parseInt(row)
  if (queryValues) queryValues = JSON.parse(queryValues)

  // 查询条件
  let bookName = ''
  let date = ''
  if (queryValues) {
    if (_.has(queryValues, 'bookName')) bookName = queryValues.bookName
    if (_.has(queryValues, 'date')) date = queryValues.date
  }

  if (!list.length) {
    list = await fs.readFileSync(path.resolve(`${DATA_PATH}/list.json`), 'utf8')
    list = JSON.parse(list)
  }

  // 条件查询
  if (bookName) {
    list = _.filter(list, item => _.includes(item.bookName, bookName))
  }
  if (date) {
    list = _.filter(list, item => item.date === date)
  }

  const totalCount = list.length
  const listChunk = _.chunk(list, row)
  const currentList = listChunk[page - 1] || []

  const res = { ...baseRes, data: {
      info: currentList,
      page: {
        current_page: page,
        total_count: totalCount,
        total_page: listChunk.length,
        page_size: row
      }
  } }

  ctx.response.body = await delayRes(res)
  console.log('列表-参数：', ctx.request.query)
})

// ======================== 新增列表行 ========================
router.post('/api/book/add', async (ctx, next) => {
  let { bookName, author, date, summary, cover } = ctx.request.body
  let rowData = {
    id: `0${Math.random().toString().slice(2,5)}`, // 生成3位数随机数（如'0234'）
    cover,
    bookName,
    author,
    date,
    summary,
    creator: 'admin',
    status: '1'
  }
  list = [ rowData, ...list ]

  ctx.response.body = { ...baseRes, data: rowData }
  console.log('新增书籍-参数：', ctx.request.body)
})

// ======================== 删除列表行 ========================
router.post('/api/book/delete', async (ctx, next) => {
  let res = { ...baseRes }
  const { id } = ctx.request.body
  const index = _.findIndex(list, { id })

  if (index !== -1) {
    list.splice(index, 1)
  } else {
    res.errorCode = 1
    res.message = '删除失败'
  }

  ctx.response.body = res
  console.log('删除书籍-参数：', ctx.request.body)
})

// ======================== 更新列表行状态 ========================
router.post('/api/book/update-status', async (ctx, next) => {
  let res = { ...baseRes }
  const { id, status } = ctx.request.body
  const index = _.findIndex(list, { id })

  if (index !== -1 && (status === '1' || status === '2')) {
    list[index].status = status
    console.log(list[index])
  } else {
    res.errorCode = 1
    res.message = '更新状态失败'
  }

  ctx.response.body = res
  console.log('更新书籍状态-参数：', ctx.request.body)
})

// 文件上传（但无法回调上传进度）
/*router.post('/api/uploadfile', async (ctx, next) => {
  // 上传单个文件
  const file = ctx.request.files.file // 获取上传文件
  // 创建可读流
  const reader = fs.createReadStream(file.path)
  console.log(__dirname)
  let filePath = path.join(__dirname, '../temp') + `/${file.name}`
  // 创建可写流
  const upStream = fs.createWriteStream(filePath)
  // 可读流通过管道写入可写流
  reader.pipe(upStream)
  return ctx.body = '上传成功！'
})*/

module.exports = router