import request from "@/utils/request";

// 获取用户信息
export const getuserinfo=(params)=>{
  return request({
    url:'api/user/getuserinfo',
    method:'GET',
    params
  })
}