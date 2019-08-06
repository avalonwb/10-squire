const {
  http
} = require('../utils/index')

// 请求所有标签
exports.getAllTags = async (_page, _limit) => {
  let res = await http({
    url: 'tags',
    method: 'GET',
    params: {
      _page,
      _limit
    }
  })
  // console.log(res.headers['x-total-count'])
  return {
    data: res.data,
    total: res.headers['x-total-count']
  }
}

// 根据标签名获取标签信息
exports.findByName = async (tagName) => {
  let res = await http({
    url: `tags/${tagName}`,
    method: 'GET'
  })
  // console.log(res.data)
  return res.data
}

// 关注标签
exports.tagFollow = async (tagName, userId) => {
  let res = await http({
    url: `tags/${tagName}/followers`,
    method: 'POST',
    data: {
      userId
    }
  })
  return res.data
}