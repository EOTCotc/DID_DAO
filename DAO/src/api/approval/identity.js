import request from "@/utils/request";

export const submit = (data) => request.post('/api/examine/upload', data)
// 获取审核列表
export const list = (type, params) => {
  const url = ['/api/examine/getunauditedinfo', '/api/examine/getauditedinfo', '/api/examine/getbackinfo']
  return request.post(url[type], params)
}
// 批准
export const approval = (data) => request.post('/api/examine/auditinfo', data)