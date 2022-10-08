import request from "@/utils/request";
import axios from "axios";

// 查询当前社区信息
export const search = () => request.get('/api/community/getcommunityinfo')
// 是否可以创建社区
export const allowCreateCommunity = (str) => axios.post(`https://api.eotcyu.club/api/Post/EotcLoginmes?${str}`)
// 创建社区
export const create = (data) => request.post('/api/community/applycommunity', data)
// 完善社区信息
export const update = (data) => request.put('/api/community/addcommunityinfo', data)
// 上传社区图片
export const uploadImage = (file) => request.post('/api/community/uploadimage', file, {'Content-Type': "multipart/form-data"})
// 审核进度
export const applyProcess = (id) => request.get('/api/community/getcomauthfail', {params: {communityId: id}})
// 获取推荐人信息
export const referrerInfo = (id) => request.get('/api/user/getuserinfobyuid', {params: {uid: id}})
// 获取之前提交的数据
export const oldData = (id) => request.get('/api/community/getcommunityinfobyid', {params: {communityId: id}})
// 获取质押eotc数量
export const getUserEotc = () => request.get('/api/user/getusereotc')