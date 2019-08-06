const express = require('express')

const router = express.Router()

const viewRender = require('../controller/viewRender')

const registerAndLogin = require('../controller/registerAndLogin')

const checkAsync = require('../controller/checkAsync')

// 服务端验证 插件
const {
  check,
  validationResult
} = require('express-validator')

router
  .get('/', viewRender.showIndex)
  .get('/login', viewRender.showLogin)
  .post(
    '/register',
    // 检查 前端传过来的表单项
    [
      check('username').not().isEmpty(),
      check('password').not().isEmpty(),
      check('captcha').not().isEmpty()
    ],
    // 处理检查结果的中间件
    (req, res, next) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.array()
        })
      }
      next()
    },
    // 最终处理函数 
    registerAndLogin.register
  )
  .get('/captcha', registerAndLogin.captcha)
  .get('/user/check', checkAsync.check)
  .get('/captcha/check', checkAsync.captchaCheck)
  .post('/login', registerAndLogin.login)
  .get('/signout', registerAndLogin.signout)

module.exports = router