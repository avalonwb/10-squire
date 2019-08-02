const {
  decry
} = require('../utils/secret')

module.exports = (req, res, next) => {
  // 检查session中有没有用户信息
  let {
    user
  } = req.session

  // 如果session中没有用户信息
  if (!user) {
    // 去cookie中查找
    let cookieUser = req.cookies.user
    // console.log(cookieUser)

    if (!cookieUser) {
      //  cookie中也没有用户信息
      // console.log('拦截到登录页')
      // return res.render('signin.html')
      return next()
    }

    try {
      // 解码
      cookieUser = JSON.parse(decry(cookieUser))
      // console.log(cookieUser)
      // 赋值到session中
      req.session.user = cookieUser
    } catch (err) {
      // 说明cookie被篡改，不是json格式， 解析失败
      return next()
    }

  }

  // user = JSON.parse(decry(req.cookies.user))
  next()
}