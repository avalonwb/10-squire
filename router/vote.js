const express = require('express')

const router = express.Router()

const {
  voteHandler
} = require('../controller/vote')

router
  .post('/vote/createOrUpdate', voteHandler)

module.exports = router