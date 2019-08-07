const express = require('express')

const router = express.Router()

const {
  showHome,
  getPosts,
  getComments,
  getTags
} = require('../controller/person')

router
  .get('/home', showHome)
  .get('/home/:userId/posts', getPosts)
  .get('/home/:userId/comments', getComments)
  .get('/home/:userId/tags', getTags)

module.exports = router