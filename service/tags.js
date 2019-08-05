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