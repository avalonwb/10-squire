const {
  checkUserName,
  checkNickName
} = require('../service/user')

// 异步验证用户名和昵称
const check = async (req, res, next) => {
  let {
    username,
    nickname
  } = req.query

  let ret

  if (username) {
    ret = await checkUserName(username) ? false : true
  } else if (nickname) {
    ret = await checkNickName(nickname) ? false : true
  }

  res.status(200).send(ret)

}

// 异步验证验证码
const captchaCheck = async (req, res, next) => {
  let {
    captcha: {
      text,
      timeLimit
    }
  } = req.session
  let {
    captcha
  } = req.query

  let ret = true

  if (text.toLowerCase() !== captcha.toLowerCase() || +new Date() > timeLimit) {
    ret = false
  }

  res.status(200).send(ret)
}

module.exports = {
  check,
  captchaCheck
}