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
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search/')
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article/'),
    // 将动态路由参数映射到组件的 props 中，访问和维护性都很方便
    props: true
  }
]

const router = new VueRouter({
  routes
})
export default router
