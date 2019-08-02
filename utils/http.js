const axios = require('axios')

const defaultConfig = require('../config/config.default')

const http = axios.create({
  baseURL: defaultConfig.baseUrl,
})

module.exports = http