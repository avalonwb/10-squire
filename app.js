const express = require('express')
const path = require('path')
const nunjucks = require('nunjucks')

const app = express()

const router = require('./router/index')

const _ = require('lodash')

const topicRouter = require('./router/topic')
const commentRouter = require('./router/comment')
const voteRouter = require('./router/vote')

const session = require('express-session')

const cookieParser = require('cookie-parser')

const keepOnLine = require('./midware/keepOnLine')

const dayjs = require('dayjs')

const relativeTime = require('dayjs/plugin/relativeTime')

// 把markdown语法转为html结构
const md = require('markdown-it')()

// 只加载中文包
require('dayjs/locale/zh-cn')
dayjs.locale('zh-cn')

// 加载相对时间模块
dayjs.extend(relativeTime)

// 增加读取cookies的中间件
app.use(cookieParser())

// 增加session存储中间件
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

// 开放public 静态资源
app.use('/public', express.static(path.join(__dirname, './public')))
// 开放第三方模块
app.use('/node_modules', express.static(path.join(__dirname, './node_modules')))

// 解析前端提交表单数据的中间件
// 解析提交来的json数据
app.use(express.json())
// 解析提交来的application/x-www-from
app.use(express.urlencoded({
  extended: true
}))

// 保持登录的中间件
app.use(keepOnLine)

// 挂载所有模板都可以访问的数据
app.use((req, res, next) => {
  app.locals.user = req.session.user
  // console.log(app.locals.user)
  next()
})

// 挂载路由
app.use(router)

// 挂载问题模块路由
app.use(topicRouter)

// 挂载评论模块路由
app.use(commentRouter)

// 挂载投票模块路由
app.use(voteRouter)

// 配置模板引擎 nunjucks
const env = nunjucks.configure(path.join(__dirname, './view'), {
  autoescape: true,
  express: app,
  watch: true, // 开启模板监视 禁用模板缓存
})

// 自定义模板过滤器
env.addFilter('RelativeTime', function (str) {
  // console.log(str)
  // dayjs 获取相对时间
  return dayjs().from(dayjs(str))
})

// md语法转成html
env.addFilter('mdToHtml', function (mdContent) {
  return md.render(mdContent)
})

// 传数字转数组
env.addGlobal('NumToArr', function (lastPage, page) {
  const totalPage = _.range(1, lastPage + 1)
  // 显示当前页前2页与后2页
  const range = 2

  // 当前页的后两页
  const afterPage = totalPage.slice(page, page + range)

  // 当前页的前两页
  const beforePage = totalPage.slice(page - lastPage - range - 1, page - 1)

  // 当前页码前2页 + 当前页码 + 当前页码后两页
  let pageItems = [
    ...beforePage,
    page,
    ...afterPage
  ]

  // 第一页页码
  let firstItem = [1]
  // 最后一页页码
  let lastItem = [lastPage]

  if (range + 2 < page) {
    firstItem = [
      ...firstItem,
      '...'
    ]
  }

  if (lastPage - page - 1 > range) {
    lastItem = [
      '...',
      ...lastItem
    ]
  }

  if (range + 1 < page) {
    pageItems = [
      ...firstItem,
      ...pageItems
    ]
  }

  if (lastPage - page > range) {
    pageItems = [
      ...pageItems,
      ...lastItem
    ]
  }

  return pageItems

})

app.listen(3000, () => {
  console.log('服务启动成功')
  console.log('http://localhost:3000/')
})