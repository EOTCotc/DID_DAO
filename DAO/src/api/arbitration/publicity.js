import request from '@/utils/request'

export const personnelList = () => request.post('/api/arbitrate/getarbitrators')
export const caseLst = () => request.post('/api/arbitrate/getarbitrators')