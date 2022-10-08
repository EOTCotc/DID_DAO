import request from "@/utils/request"

// 仲裁列表
export const list = (type) => request.post('/api/arbitrate/getarbitratelist', { type })
// 仲裁详情
export const detail = (id) => request.post('/api/arbitrate/getarbitratedetails', { arbitrateInfoId: id })
// 仲裁判决
export const sentence = (data) => request.post('/api/arbitrate/arbitratevote', data)
// 原被告身份信息
export const personnelInfo = (id) => request.post('/api/arbitrate/getuserinfo', {id})
// 发起重新举证
export const delay = (data) => request.post('/api/arbitrate/arbitratedelay', data)