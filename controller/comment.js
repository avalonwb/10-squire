const {
  answerCreate,
  getCommentList,
  updateCommnet,
  delComment
} = require('../service/comment')

// 创建回答
exports.createAnswer = async (req, res, next) => {
  let postId = req.params.id
  let userId = req.session.user._id
  let ret = await answerCreate(postId, userId, req.body)
  if (ret._id) {
    res.status(200).json({
      code: 0,
      msg: '创建回答成功！！',
      answer: ret
    })
  } else {
    console.log('创建失败')
  }
}

// 获取该问题的所有评论
exports.getAllComment = async (req, res, next) => {
  let postId = req.params.id
  let ret = await getCommentList(postId)
  if (ret.length > 0) {
    res.status(200).json({
      code: 0,
      msg: '请求该问题下的所有评论成功！',
      records: ret
    })
  }
}

// 更新评论
exports.commentUpdate = async (req, res, next) => {
  let {
    body
  } = req.body
  let commentId = req.params.id
  let ret = await updateCommnet(commentId, body)
  // console.log(ret)
  if (ret._id) {
    res.status(200).json({
      code: 0,
      msg: '更新评论成功！',
      records: ret
    })
  }
}

exports.commentDel = async (req, res, next) => {
  let commentId = req.params.id
  let ret = await delComment(commentId)
  // console.log(ret)
  if (!ret) {
    res.status(200).json({
      code: 0,
      msg: '删除评论成功！'
    })
  }
}