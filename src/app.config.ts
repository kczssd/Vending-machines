export default {
  pages: [
    'pages/index/index',
    'pages/pay/index',
    'pages/detail/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarTitleText: 'WeChat',
    navigationStyle:'custom',
    backgroundColor:'#000'
  },
  "permission":{
    "scope.userLocation":{
        "desc":"你的位置将帮你自动定位附件售货机"
    }
  },
}
