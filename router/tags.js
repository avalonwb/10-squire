const express = require('express')

const router = express.Router()

const {
  showTags
} = require('../controller/tags')

router
  .get('/tags', showTags)

module.exports = router