import request from '@/utils/request'

// 登录
export const login = (data) => {
  return request({
    url: '/api/user/login',
    method: 'POST',
    data
  })
}

// 发送验证码
export const getCode = (params) => {
  return request({
    url: '/api/user/getcode',
    method: 'GET',
    params
  })
}

// 注册
export const register = (data) => {
  return request({
    url: '/api/user/register',
    method:'POST',
    data
  })
}

// 找回密码
export const forgotPwd=(data)=>{
  return request({
    url:'/api/user/retrievepassword',
    method:'POST',
    data
  })
}