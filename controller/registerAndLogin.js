const svgCaptcha = require('svg-captcha')

const defaultConfig = require('../config/config.default')

const {
  encry
} = require('../utils/secret')

const {
  checkUserName,
  createUser
} = require('../service/user')

// 注册新用户
const register = async (req, res, next) => {
  // console.log(req.body, '创建')
  let {
    username,
    nickname,
    password
  } = req.body

  // 创建新用户 
  let newUser = await createUser(username, password, nickname)

  if (newUser._id) {
    res.status(200).json({
      code: 0,
      msg: '创建成功',
      newUser: newUser
    })
  }
}

// 生成验证码
const captcha = async (req, res, next) => {
  let captcha = svgCaptcha.create()
  // 验证码文本和过期时间存入缓存
  req.session.captcha = {
    text: captcha.text,
    timeLimit: +new Date() + 60 * 1000
  }
  // console.log(req.session.captcha)
  // 设置响应文件类型
  res.type('svg')
  // 返回响应
  res.status(200).send(captcha.data)
}

// 登录
const login = async (req, res, next) => {
  let {
    username,
    password,
    remember
  } = req.body

  // console.log(username, password, remember, 111)

  let user = await checkUserName(username)

  // 如果用户不存在
  if (!user) {
    return res.status(200).json({
      code: 1,
      msg: '无此用户'
    })
  }

  // 如果输入密码与用户密码不匹配
  if (user.password !== password) {
    return res.status(200).json({
      code: 2,
      msg: '密码错误'
    })
  }

  // 加密保存用户信息 进行会话保持
  if (remember) {
    let encrypt = encry(JSON.stringify(user))
    res.cookie('user', encrypt, {
      maxAge: defaultConfig.expires // 过期时间 此时往后多少时间过期
    })
  } else {
    req.session.user = user
  }

  res.status(200).json({
    code: 0,
    msg: '登陆成功',
    user: {
      username,
      password,
      userId: user._id
    }
  })
}

// 退出
const signout = async (req, res, next) => {
  // 清空session
  req.session.user = null
  // 清空 cookie
  res.clearCookie('user')
  // 重定向到登录页
  res.redirect('/login')
}

module.exports = {
  captcha,
  register,
  login,
  signout
}