import request from "@/utils/request";


// 修改邮箱
export const changemail=(data)=>{
  return request({
    url:'/api/user/changemail',
    method:'POST',
    data
  })
}