const {
  handleVote
} = require('../service/vote')

exports.voteHandler = async (req, res, next) => {
  // console.log(req.session.user)
  let userId = req.session.user._id
  let ret = await handleVote(req.body, userId)
  console.log(ret)
}