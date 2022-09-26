import request from "@/utils/request";

export const submit = (data) => request.post('/api/examine/upload', data)
// 获取审核列表
export const list = (params) => request.post('/api/examine/getteamauthlist', params)
// 批准
export const approvalConfirm = (data) => request.post('/api/examine/teamauth', data)