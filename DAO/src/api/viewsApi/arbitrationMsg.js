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

// 申请延期投票
export const arbitratedelayvote=(data)=>{
  return request({
    url:'/api/arbitrate/arbitratedelayvote',
    method:'POST',
    data
  })
}

// 追加举证
export const getadducelist=(data)=>{
  return request({
    url:'/api/arbitrate/getadducelist',
    method:'POST',
    data
  })
}

// 获取取消仲裁消息
export const getcancelarbitrate=(data)=>{
  return request({
    url:'/api/arbitrate/getcancelarbitrate',
    method:'POST',
    data
  })
}

// 结案通知
export const getclosure=(data)=>{
  return request({
    url:'/api/arbitrate/getclosure',
    method:'POST',
    data
  })
}

// 设置消息为已读
export const setmessageisopen=(data)=>{
  return request({
    url:'/api/arbitrate/setmessageisopen',
    method:'POST',
    data
  })
}

