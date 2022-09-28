import request from '@/utils/request'

// 获取用户风险等级
export const risklevel = () => request.get('/api/user/getuserrisklevel')
// 获取用户风险等级
export const list = () => request.get('/api/user/getrisklist')