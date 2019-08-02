const express = require('express')

const router = express.Router()

const {
  createAnswer,
  getAllComment,
  commentUpdate,
  commentDel
} = require('../controller/comment')

router
  .post('/comment/answer/:id', createAnswer)
  .get('/comment/:id/getAll', getAllComment)
  .post('/comment/:id/update', commentUpdate)
  .get('/comment/:id/del', commentDel)

module.exports = router