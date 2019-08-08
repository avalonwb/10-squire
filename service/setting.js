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

// 更新用户头像
exports.Avaterupdate = async (userId, data) => {
  let {
    file,
    x,
    y,
    width,
    height
  } = data
  console.log(userId)
  console.log(data)
  let res = await http({
    url: `/users/${userId}/avatar`,
    method: 'PATCH',
    data: {
      file,
      x,
      y,
      width,
      height
    }
  })
  return res.data
}