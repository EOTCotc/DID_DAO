import request from "../utils/request";
//风控列表
export function getUserrisk(data) {
  return request({
    url: "api/risk/userrisk",
    method: "post",
    data,
  });
}
//获取风险用户信息
export function getuserinfo(data) {
  return request({
    url: "api/risk/getuserinfo",
    method: "post",
    data,
  });
}
