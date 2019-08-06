const express = require('express')

const router = express.Router()

const {
  showTags,
  followTag
} = require('../controller/tags')

router
  .get('/tags', showTags)
  .post('/tags/:tagName/follow', followTag)

module.exports = router