import request from "../utils/request";
//获取Dao用户信息
export function getdaoinfo (data) {
  return request({
    url: "api/daouser/getdaoinfo",
    method: "post",
    data,
  });
}
//收益详情
export function getincome (data) {
  return request({
    url: "api/incomedetails/getincomedetails",
    method: "post",
    data,
  });
}
<<<<<<< HEAD
=======

// 获取用户信息
export const getuserinfo = (params) => {
  return request({
    url: "/api/user/getuserinfo",
    method: "GET",
    params,
  });
};
//获取质押数量
export const getuSereotc = (data) => {
  return request({
    url: "api/daouser/getusereotc",
    method: "post",
    data,
  });
};
>>>>>>> 757e5fa3f91ed2eaec7a1eff64ce0278e7c89967
