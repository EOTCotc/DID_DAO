import request from "@/utils/request";

// 仲裁员是否有未读消息
export const getmessageisopen=(data)=>{
  return request({
    url:'/api/arbitrate/getmessageisopen',
    method:'POST',
    data
  })
}