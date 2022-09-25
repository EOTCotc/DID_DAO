import request from "@/utils/request";

export const list = (params) => request.get('/api/pay/getpayment', {params})
// 删除
export const deletePayment = (id) => request.delete('/api/pay/deletepayment', {params: {payId: id}})
// 更新
export const update = (params) => request.post('/api/pay/updatepayment', params)
// 验证码
export const code = (mail) => request.get('/api/user/getcode', {params: {mail}})
// 添加支付方式
export const addPayment = (params) => {
  const {code, mail} = params
  let url = '/api/pay/addpayment'
  if (code && mail) {
    url += `?mail=${mail}&code=${code}`
  }
  return request.put(url, params)
}