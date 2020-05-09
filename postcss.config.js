// postcss配置文件  导出一个对象
module.exports = {
  // 配置使用的相关插件
  plugins: {
    // autoprefixer: {
    //   // browsers用来配置兼容到底浏览器环境
    //   // 此段代码在启动服务时会有警告(要把此段代码放到.browserslistrc文件中)
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },
    // px转为rem单位
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*']
    }
  }
}
