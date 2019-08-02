const express = require('express')

const router = express.Router()

const {
  check,
  validationResult
} = require('express-validator')

const {
  newTopic,
  create,
  showTopic,
  editTopic,
  updateTopic,
  deleteTopic
} = require('../controller/topic')

router
  .get('/topic/new', newTopic)
  .post('/topic/create',
    [
      check('title').not().isEmpty(),
      check('body').not().isEmpty(),
      check('tags').not().isEmpty()
    ],
    // 处理检查结果的中间件
    (req, res, next) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.array()
        })
      }
      next()
    },
    create
  )
  .get('/topic/show/:id', showTopic)
  .get('/topic/:id/edit', editTopic)
  .post('/topic/:id/update',
    [
      check('title').not().isEmpty(),
      check('body').not().isEmpty(),
      check('tags').not().isEmpty()
    ],
    // 处理检查结果的中间件
    (req, res, next) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.array()
        })
      }
      next()
    },
    updateTopic
  )
  .get('/topic/:id/del', deleteTopic)

module.exports = router