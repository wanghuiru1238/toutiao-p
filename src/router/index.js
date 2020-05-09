import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/')
  },
  {
    path: '/',
    // 如果有默认子路由 此处父路由不用设置name名字
    component: () => import('@/views/layout/'),
    children: [
      {
        path: '', // 默认子路由
        name: 'home',
        component: () => import('@/views/home/')
      },
      {
        path: '/qa', // 问答路由
        name: 'qa',
        component: () => import('@/views/qa/')
      },
      {
        path: '/video', // 视频路由
        name: 'video',
        component: () => import('@/views/video/')
      },
      {
        path: '/my', // 我的路由
        name: 'my',
        component: () => import('@/views/my/')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})
export default router
