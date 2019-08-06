const express = require('express')

const router = express.Router()

const {
  showHome
} = require('../controller/person')

router
  .get('/home', showHome)

module.exports = router