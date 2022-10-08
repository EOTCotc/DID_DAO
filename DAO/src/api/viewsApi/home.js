import request from '@/utils/request'

// 获取提案列表
export const getproposallist = (data) => {
  return request({
    url: '/api/proposal/getproposallist',
    method: 'POST',
    data
  })
}

// 获取用户风险等级
export const getuserrisklevel=(data)=>{
  return request({
    url:'/api/risk/getuserrisklevel',
    method:'POST',
    data
  })
}