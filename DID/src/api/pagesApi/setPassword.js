import request from "@/utils/request";

// 修改密码
export const changepwd=(data)=>{
  return request({
    url:'/api/user/changepwd',
    method:'POST',
    data
  })
}