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
//获取用户风险等级
export function getuserrisklevel(data) {
  return request({
    url: "api/risk/getuserrisklevel",
    method: "post",
    data,
  });
}
//获取解除风控联系人
export function getrisklist(data) {
  return request({
    url: "api/risk/getrisklist",
    method: "post",
    data,
  });
}
// 修改用户风险状态
export function userriskstatus(data) {
  return request({
    url: "api/risk/userriskstatus",
    method: "post",
    data,
  });
}
//解除风控
export function removerisk(data) {
  return request({
    url: "api/risk/removerisk",
    method: "post",
    data,
  });
}
