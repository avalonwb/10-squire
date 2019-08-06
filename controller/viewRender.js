const {
  getAllTopic
} = require('../service/topic')

const {
  findUserById
} = require('../service/user')

const {
  findByName,
  getAllTags
} = require('../service/tags')

const controller = {
  showIndex: async (req, res, next) => {
    // 请求所有问题的参数
    // 每页条数
    const _limit = 2
    // 当前页
    const {
      page = 1, filter = '', tag = ''
    } = req.query
    // console.log(filter)
    // console.log(page)
    // 根据标签名获取标签信息
    const tagInfo = await findByName(tag)
    // console.log(tagInfo)
    // 获取热门标签
    const allTags = await getAllTags(1, 5)
    // console.log(allTags)
    // 请求所有问题
    const ret = await getAllTopic(page, _limit, filter, tag)
    const topics = ret.data
    // 总页数
    const total = ret.total
    // console.log(total)
    // 最后一页
    const lastPage = Math.ceil(total / _limit)
    // console.log(lastPage)

    // 请求创建问题的用户信息
    for (let i = 0; i < topics.length; i++) {
      const v = topics[i]
      let user = await findUserById(v.userId)
      v.userInfo = user.data
    }
    // async 不能嵌套使用
    // topics.forEach(async v => {
    //   let user = await findUserById(v.userId)
    //   v.userInfo = user
    // })
    console.log(topics)
    // 最新回答 热门回答 等待回答
    const filterArr = [

      {
        title: '最新回答',
        url: `/?page=1&tag=${tag}`,
        filter: ''
      },
      {
        title: '热门回答',
        url: `/?page=1&filter=hot&tag=${tag}`,
        filter: 'hot'
      },
      {
        title: '等待回答',
        url: `/?page=1&filter=unresponsive&tag=${tag}`,
        filter: 'unresponsive'
      }
    ]
    res.render('index.html', {
      topics,
      _page: page - 0,
      lastPage,
      filterArr,
      filter,
      tagInfo: tagInfo || '',
      allTags: allTags.data
    })
  },
  showLogin: async (req, res, next) => {
    res.render('signin.html')
  }
}

module.exports = controller