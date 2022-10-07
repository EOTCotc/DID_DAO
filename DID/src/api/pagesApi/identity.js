import request from "@/utils/request";

export const uploadImage = (file) => request.post('/api/userauth/uploadImage', file, {'Content-Type': "multipart/form-data"})
export const submit = (data) => request.post('/api/userauth/upload', data)
// 审核成功
export const authSuccess = () => request.get('/api/userauth/getauthsuccess')
// 审核失败
export const authFail = () => request.get('/api/userauth/getauthfail')
// 获取审核列表
export const list = (type, params) => {
  const url = ['/api/userauth/getunauditedinfo', '/api/userauth/getauditedinfo', '/api/userauth/getbackinfo']
  return request.get(url[type], {params})
}
// 批准
export const approval = (data) => request.post('/api/userauth/auditinfo', data)
// 获取水印图片
export const getImg = (path) => request.get('/api/user/getauthimage', {params:{path}, responseType: 'blob'})