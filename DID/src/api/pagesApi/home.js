import request from "@/utils/request";

// 获取用户信息
export const getuserinfo=(params)=>{
  return request({
    url:'/api/user/getuserinfo',
    method:'GET',
    params
  })
}

// 获取之前选择的位置
export const getcomselect=(params)=>{
  return request({
    url:'/api/community/getcomselect',
    method:'GET',
    params
  })
}