export default {
  pages: [
    'pages/tabBar/home/index',
    'pages/tabBar/mine/index',
    'pages/search/index',
    'pages/auth/index'
  ],
  subpackages: [
    {
      root: 'pages/product/',
      pages: [
        'list/index',
        'details/index'
      ]
    }
  ],
  tabBar: {
    custom: true,
    list: [
      {
        'pagePath': 'pages/tabBar/home/index',
        'text': '首页'
      }, {
        'pagePath': 'pages/tabBar/mine/index',
        'text': '我的'
      }]
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '85买卖网',
    navigationBarTextStyle: 'black'
  }
}
