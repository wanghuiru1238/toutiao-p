// 用户相关请求模块

import request from '@/utils/request.js'
// // 在非组件模块中获取store(使用容器数据) 必须要加载store 跟在组件中的this.$store是一样的
// import store from '@/store/'
// 登录注册请求接口
export const login = (data) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}
// 发送短信验证码请求
export const sendms = (mobile) => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}
// 获取登录用户信息
export const getinfo = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }(封装token拦截器 所以此处可不设置请求携带token)
  })
}

// 获取用户频道列表
export const getchannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}
// 关注用户
export const addFollow = userId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data: {
      target: userId
    }
  })
}
// 取消关注
export const deleteFollow = userId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/followings/${userId}`
  })
}
