import request from "@/utils/request";

// 注销账号
export const logout=(data)=>{
  return request({
    url:'/api/user/logout',
    method:'POST',
    data
  })
}