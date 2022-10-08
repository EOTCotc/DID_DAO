import request from "@/utils/request";

// 注销账号
export const logout=(data)=>{
  return request({
    url:'/api/user/logout',
    method:'POST',
    data
  })
}

// 获取注销时间
export const getlogoutdate=(params)=>{
  return request({
    url:'/api/user/getlogoutdate',
    method:'GET',
    params
  })
}

// 放弃注销
export const cancellogout=(params)=>{
  return request({
    url:'/api/user/cancellogout',
    method:'GET',
    params
  })
}