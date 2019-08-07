const {
  findUserById
} = require('../service/user')

const {
  update
} = require('../service/setting')

// 展示个人资料页
exports.showProfile = async (req, res, next) => {
  // 请求用户信息
  let user = req.session.user
  if (!user) {
    return res.redirect('/login')
  }
  // console.log(user)
  let {
    data: userInfo
  } = await findUserById(user._id)
  // console.log(userInfo)
  res.render('settings-profile.html', {
    userInfo
  })
}

// 更新基本信息
exports.updateProfile = async (req, res, next) => {
  console.log(req.body)
  // 请求用户信息
  let userId = req.session.user._id
  // console.log(user)
  if (!userId) return
  let ret = await update(userId, req.body)
  if (ret._id) {
    // 退回上个路由 相当于刷新页面
    res.redirect('back')
  }
}