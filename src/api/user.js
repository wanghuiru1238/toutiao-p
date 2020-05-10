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
