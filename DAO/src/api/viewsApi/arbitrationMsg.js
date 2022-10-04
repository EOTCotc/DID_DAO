import request from '@/utils/request';

// 获取仲裁消息列表
export const getarbitratemessage=(data)=>{
  return request({
    url:'/api/arbitrate/getarbitratemessage',
    method:'POST',
    data
  })
}

// 获取原被告延期消息
export const getarbitratedelay=(data)=>{
  return request({
    url:'/api/arbitrate/getarbitratedelay',
    method:'POST',
    data
  })
}