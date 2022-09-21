import request from "@/utils/request";

// 更新用户信息
export const setuserinfo=(data)=>{
  return request({
    url:'/api/user/setuserinfo',
    method:'POST',
    data
  })
}