const Koa = require('koa')
const cors = require('@koa/cors') // 解决跨域
const koaBody = require('koa-body') // 替代koa-bodyparser以支持图片上传
const logger = require('koa-logger') // 打印日志
const Router = require('koa-router')
const requireDirectory = require('require-directory')

const app = new Koa()

app.use(cors())
app.use(koaBody({
  multipart: true, // 支持文件上传
}))
app.use(logger())

// 导入./router下所有路由
requireDirectory(module, './router', {
  visit: (obj) => {
    if (obj instanceof Router) {
      app.use(obj.routes(), obj.allowedMethods())
    }
  }
})

const PORT = 3668
app.listen(PORT, () => console.log('This server is running at http://localhost:' + PORT))
