import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)

const USER_KEY = 'toutiao-user'

export default new Vuex.Store({
  state: {
    // 封装本地存储后的代码写法
    user: getItem(USER_KEY)
    // 没封装本地存储时的代码写法
    // user: JSON.parse(window.localStorage.getItem('user')) // 用户当前登录状态(token数据)
  },
  mutations: {
    setUser (state, data) {
      state.user = data

      // 存在vue容器中的数据刷新页面就会丢失,所以为数据持久化 要把用户的登录状态数据放到本地存储中
      setItem(USER_KEY, state.user)
      // window.localStorage.setItem('user', JSON.stringify(state.user))
    }
  },
  actions: {
  },
  modules: {
  }
})
