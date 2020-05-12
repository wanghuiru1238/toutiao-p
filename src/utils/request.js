// 请求模块
import axios from 'axios'
// import { Store } from 'vuex'
// 在非组件模块中获取store(使用容器数据) 必须要加载store 跟在组件中的this.$store是一样的
import store from '@/store/'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  const { user } = store.state
  // 如果用户已登录 给接口设置token
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 导出
export default request
