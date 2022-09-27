import request from "@/utils/request";

export const list = (type, params) => {
  // 0-未审批 1-已审批 2-打回
  const url = ['/api/examine/getunauditedcom', '/api/examine/getauditedcom', '/api/examine/getbackcom']
  return request.post(url[type], params )
}

// 批准
export const auditCommunity = (data) => request.post('/api/examine/auditcommunity', data)
