const {
  http
} = require('../utils/index')

// 获取用户发布的主题
exports.userPosts = async (userId) => {
  let res = await http({
    url: 'posts',
    method: 'GET',
    params: {
      userId
    }
  })
  return res.data
}

// 获取用户回复过的问题
exports.userComments = async (userId) => {
  let res = await http({
    url: `users/${userId}/comments/questions`,
    method: 'GET'
  })
  return res.data
}

// 获取用户关注的标签
exports.userTgas = async (userId) => {
  let res = await http({
    url: `tags/followers/${userId}`,
    method: 'GET'
  })
  return res.data
}