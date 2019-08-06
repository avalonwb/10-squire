const {
  getAllTags,
  tagFollow
} = require('../service/tags')

// 渲染标签页
exports.showTags = async (req, res, next) => {
  // 请求所有标签数据
  const _limit = 5
  const _page = req.query.page || 1

  let ret = await getAllTags(_page, _limit)
  // console.log(ret)

  const total = ret.total

  const lastPage = Math.ceil(total / _limit)

  // console.log(lastPage)

  if (ret.data.length) {
    res.render('tags-index.html', {
      tags: ret.data,
      _page: _page - 0,
      lastPage
    })
  }
}

// 关注标签
exports.followTag = async (req, res, next) => {
  // res.send([req.body.userId, req.params.tagName])
  const userId = req.body.userId
  const tag = req.params.tagName
  let ret = await tagFollow(tag, userId)
  // console.log(ret)
  if (ret._id) {
    res.status(200).json({
      code: 200,
      msg: '操作成功',
      followMsg: ret
    })
  }
}