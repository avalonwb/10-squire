const {
  getAllTopic
} = require('../service/topic')

const {
  findUserById
} = require('../service/user')

const controller = {
  showIndex: async (req, res, next) => {
    // 请求所有问题
    let topics = await getAllTopic()
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
    res.render('index.html', {
      topics
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