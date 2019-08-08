const express = require('express')

const router = express.Router()

const {
  showProfile,
  updateProfile,
  updateAvater
} = require('../controller/setting')

router
  .get('/setting', showProfile)
  .post('/setting/update', updateProfile)
  .post('/setting/avater/update', updateAvater)

module.exports = router