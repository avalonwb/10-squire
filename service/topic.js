const {
  http
} = require('../utils/index')

// 创建问题
exports.createTopic = async (topic) => {
  let {
    title,
    body,
    tags,
    userId
  } = topic
  let res = await http({
    url: 'posts',
    method: 'POST',
    data: {
      title,
      body,
      tags,
      userId
    }
  })
  // console.log(res.data)
  return res.data
}

// 根据id查找问题
exports.findTopic = async (postsId) => {
  let res = await http({
    url: `posts/${ postsId }`,
    method: 'GET'
  })
  // console.log(res.data)
  return res.data
}

// 更新问题
exports.topicUpdate = async (postsId, {
  title,
  tags,
  body
}) => {
  let res = await http({
    url: `posts/${postsId}`,
    method: 'PATCH',
    data: {
      title,
      tags,
      body
    }
  })
  return res.data
}

// 删除问题
exports.topicDelete = async (postsId) => {
  let res = await http({
    url: `posts/${postsId}`,
    method: 'DELETE'
  })
  // console.log(res.data)
  return res.data
}

// 首页获取所有问题
exports.getAllTopic = async (_page, _limit) => {
  let res = await http({
    url: 'posts',
    method: 'GET',
    params: {
      _page,
      _limit
    }
  })
  // console.log(res.headers['x-total-count'])
  return {
    total: res.headers['x-total-count'],
    data: res.data
  }
}