import request from "@/utils/request";

// 有推荐人
export const getuserinfobyuid=(params)=>{
  return request({
    url:'/api/user/getuserinfobyuid',
    method:'GET',
    params
  })
}