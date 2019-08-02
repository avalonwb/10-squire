const {
  http
} = require('../utils/index')

// 检查用户名是否重名
const checkUserName = async (username) => {
  let res = await http({
    url: 'users',
    method: 'GET',
    params: {
      username,
    }
  })
  // console.log(res.data)
  return res.data[0]
}

// 检查昵称是否重名
const checkNickName = async (nickname) => {
  let res = await http({
    url: 'users',
    method: 'GET',
    params: {
      nickname
    }
  })
  return res.data[0]
}

// 根据用户id查用户信息
const findUserById = async (userId) => {
  return http({
    url: `users/${userId}`,
    method: 'GET'
  })
}

// 注册新用户
const createUser = async (username, password, nickname) => {
  let res = await http({
    url: 'users',
    method: 'POST',
    data: {
      username,
      password,
      nickname
    }
  })
  return res.data
}

module.exports = {
  checkUserName,
  checkNickName,
  findUserById,
  createUser
}