import request from '@/utils/request'

// 仲裁案公示列表
export const caseList = () => request.post('/api/arbitrate/getarbitrateinfo')
// 仲裁案公示详情
export const caseDetail = (id) => request.post('/api/arbitrate/getarbitratedetails', {arbitrateInfoId: id})