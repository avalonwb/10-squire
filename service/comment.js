const {
  http
} = require('../utils/index')

// 创建回答
exports.answerCreate = async (postId, userId, {
  body
}) => {
  let res = await http({
    url: 'comments',
    method: 'POST',
    data: {
      postId,
      userId,
      body
    }
  })
  // console.log(res.data)
  return res.data
}

// 获取对应问题的所有评论
exports.getCommentList = async (postId) => {
  let res = await http({
    url: 'comments',
    method: 'GET',
    params: {
      postId
    }
  })
  // console.log(res.data)
  return res.data
}

// 更新评论
exports.updateCommnet = async (commentId, body) => {
  let res = await http({
    url: `comments/${commentId}`,
    method: 'PATCH',
    data: {
      body
    }
  })
  return res.data
}

// 删除评论
exports.delComment = async (commentId) => {
  let res = await http({
    url: `comments/${commentId}`,
    method: 'DELETE'
  })
  return res.data
}