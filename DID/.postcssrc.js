// postcss-pxtorem配置
module.exports = {
  plugins: {
    // 'autoprefixer': {
    //   browsers: ['Android >= 4.0', 'iOS >= 7']
    // },
    'postcss-pxtorem': {
      rootValue: 75,　　//结果为：设计稿元素尺寸/16，比如元素宽320px,最终页面会换算成 20rem
      propList: ['*'],
      selectorBlackList: ['.norem','van']　　// 过滤掉 .norem 开头的 class，van是vant组件的，不进行转换
    }
  }
}