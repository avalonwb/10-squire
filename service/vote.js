const {
  http
} = require('../utils/index')

// 创建投票
exports.handleVote = async ({
  type,
  typeId,
  value
}, userId) => {
  console.log('type' + '---' + type)
  console.log('typeId' + '---' + typeId)
  console.log('value' + '---' + value)
  console.log('userId' + '---' + userId)
  let res = await http({
    url: 'votes',
    method: 'POST',
    data: {
      type,
      typeId,
      value,
      userId
    }
  })
  return res.data
}