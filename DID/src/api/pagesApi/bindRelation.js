import request from "@/utils/request";


// 获取已有社区位置
export const getcomaddr = (params) => {
  return request({
    url: '/api/community/getcomaddr',
    method: 'GET',
    params
  })
}

// 获取当前位置社区数量
export const getcomnum = (params) => {
  return request({
    url: '/api/community/getcomnum',
    method: 'GET',
    params
  })
}

// 设置用户社区位置
export const setcomselect = (data) => {
  return request({
    url: '/api/community/setcomselect',
    method: 'PUT',
    data
  })
}

//获取当前位置社区信息
export const getcomlist = (params) => {
  return request({
    url: '/api/community/getcomlist',
    method: 'GET',
    params
  })
}