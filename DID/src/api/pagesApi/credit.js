import request from "@/utils/request";

// 获取信用记录
export const getcreditscore=(params)=>{
  return request({
    url:'/api/creditscore/getcreditscore',
    method:'GET',
    params
  })
}