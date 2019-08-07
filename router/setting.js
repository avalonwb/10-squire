const express = require('express')

const router = express.Router()

const {
  showProfile,
  updateProfile
} = require('../controller/setting')

router
  .get('/setting', showProfile)
  .post('/setting/update', updateProfile)

module.exports = router