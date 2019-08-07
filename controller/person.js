const {
  userPosts,
  userComments,
  userTgas
} = require('../service/person')

// 显示个人主页
exports.showHome = async (req, res, next) => {
  res.render('people-home.html')
}

// 用户发布的主题
exports.getPosts = async (req, res, next) => {
  let userId = req.params.userId
  let ret = await userPosts(userId)
  if (ret.length) {
    res.status(200).json({
      code: 0,
      msg: '用户发布的主题',
      data: ret
    })
  }
}

// 获取用户回复过的问题
exports.getComments = async (req, res, next) => {
  let userId = req.params.userId
  let ret = await userComments(userId)
  if (ret.length) {
    res.status(200).json({
      code: 0,
      msg: '用户回复过的问题',
      data: ret
    })
  }
}

// 用户关注的标签
exports.getTags = async (req, res, next) => {
  let userId = req.params.userId
  let ret = await userTgas(userId)
  // console.log(ret)
  if (ret.length) {
    res.status(200).json({
      code: 0,
      msg: '用户回复过的问题',
      data: ret
    })
  } else {
    res.status(200).json({
      code: 0,
      msg: '用户没有关注过标签',
      data: ret
    })
  }
}