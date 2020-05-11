// 用户相关请求模块

import request from '@/utils/request.js'

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
