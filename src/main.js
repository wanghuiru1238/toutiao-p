import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 设置rem基准值(html标签字体大小)
import 'amfe-flexible'
// 加载vant组件库
import Vant from 'vant'
// 加载vant组件样式
import 'vant/lib/index.css'

// 加载全局样式
import './style/index.less'

// 全局注册vant组件
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
