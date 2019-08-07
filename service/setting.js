const {
  http
} = require('../utils/index')

// 更新基本信息
exports.update = async (userId, data) => {
  let res = await http({
    url: `/users/${userId}/profile`,
    method: 'PATCH',
    data
  })
  // console.log(res.data)
  return res.data
}