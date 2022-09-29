import request from "../utils/request";
//解除仲裁身份
export function TerminationArbitrator(data) {
  return request({
    url: "api/arbitrate/relievearbitrator",
    method: "post",
    data,
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
export function becomeAnArbitrator(data) {
  return request({
    url: "api/daouser/toarbitrator",
    method: "post",
    data,
  });
}
