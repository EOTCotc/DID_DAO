import request from "../utils/request";
//获取Dao用户信息
export function getdaoinfo(data) {
  return request({
    url: "api/daouser/getdaoinfo",
    method: "post",
    data,
  });
}
//收益详情
export function getincome(data) {
  return request({
    url: "api/incomedetails/getincomedetails",
    method: "post",
    data,
  });
}

// 获取用户信息
export const getuserinfo = (params) => {
  return request({
    url: "/api/user/getuserinfo",
    method: "GET",
    params,
  });
};
