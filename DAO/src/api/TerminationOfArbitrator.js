import request from "../utils/request";
//解除仲裁身份
export function TerminationArbitrator () {
  return request({
    url: "api/arbitrate/relievearbitrator",
    method: "post",
  });
}
// // 获取仲裁员列表
// export function getArbitratorList (data) {
//   return request({
//     url: "api/arbitrate/getarbitrators",
//     method: "post",
//     data,
//   });
// }


// 成为仲裁员
export function becomeAnArbitrator () {
  return request({
    url: "api/daouser/toarbitrator",
    method: "post",
  });
}
// 获取Dao用户信息
export function getDaoUserInformation (data) {
  return request({
    url: "api/daouser/getdaoinfo",
    method: "post",
    data,
  });
}