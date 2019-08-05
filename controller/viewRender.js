const {
  getAllTopic
} = require('../service/topic')

const {
  findUserById
} = require('../service/user')

const controller = {
  showIndex: async (req, res, next) => {
    // 请求所有问题的参数
    // 每页条数
    const _limit = 2
    // 当前页
    const _page = req.query.page || 1
    const filter = req.query.filter || ''
    // console.log(filter)
    // console.log(_page)
    // 请求所有问题
    const ret = await getAllTopic(_page, _limit, filter)
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
    // console.log(topics)
    // 最新回答 热门回答 等待回答
    const filterArr = [

      {
        title: '最新回答',
        url: '/?page=1',
        filter: ''
      },
      {
        title: '热门回答',
        url: '/?page=1&filter=hot',
        filter: 'hot'
      },
      {
        title: '等待回答',
        url: '/?page=1&filter=unresponsive',
        filter: 'unresponsive'
      }
    ]
    res.render('index.html', {
      topics,
      _page: _page - 0,
      _limit: _limit - 0,
      total: total - 0,
      lastPage,
      filterArr,
      filter
    })
  },
  showPeopleHome: async (req, res, next) => {
    res.render('people-home.html')
  },
  showLogin: async (req, res, next) => {
    res.render('signin.html')
  }
}

module.exports = controller