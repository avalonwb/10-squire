const {
  createTopic,
  findTopic,
  topicUpdate,
  topicDelete
} = require('../service/topic')

const {
  findUserById
} = require('../service/user')

// 创建问题页面
exports.newTopic = async (req, res, next) => {
  res.render('topic-new.html')
}

// 创建问题
exports.create = async (req, res, next) => {
  let {
    title,
    body,
    tags
  } = req.body

  if (!req.session.user) {
    return res.status(200).json({
      code: 1,
      msg: '用户未登录'
    })
  }

  let {
    _id: userId
  } = req.session.user

  let newTopic = await createTopic({
    title,
    body,
    tags,
    userId
  })

  if (newTopic._id) {
    res.status(200).json({
      code: 0,
      msg: '创建成功',
      newTopic: newTopic
    })
  }
}

// 问题详情页面
exports.showTopic = async (req, res, next) => {
  let postsId = req.params.id
  // console.log(postsId)
  let ret
  try {
    // 有可能查不到问题
    ret = await findTopic(postsId)
    // 输入时必须以英文逗号隔开
    // console.log(ret.tags)
    // 根据用户id查用户信息
    let user = await findUserById(ret.userId)
    ret.user = user
  } catch (err) {
    ret = null
  }
  // console.log(ret)
  res.render('topic-show.html', {
    topic: ret
  })
}

// 问题编辑页面
exports.editTopic = async (req, res, next) => {
  let postsId = req.params.id
  let ret = await findTopic(postsId)
  // console.log(ret)
  res.render('topic-edit.html', {
    topic: ret
  })
}

// 更新问题
exports.updateTopic = async (req, res, next) => {
  let postsId = req.params.id
  let ret = await topicUpdate(postsId, req.body)
  // console.log(ret)
  res.status(200).json({
    code: 0,
    msg: '更新成功',
    topic: ret
  })
}

// 删除问题
exports.deleteTopic = async (req, res, next) => {
  let postsId = req.params.id
  // console.log(postsId)
  let ret = await topicDelete(postsId)
  // console.log(ret)
  if (!ret) {
    res.status(200).json({
      code: 0,
      msg: '删除成功！！'
    })
  }
}