import request from "../utils/request";
//解除仲裁身份
export function TerminationArbitrator () {
  return request({
    url: "api/arbitrate/relievearbitrator",
    method: "post",
  });
}
// 成为仲裁员
export function becomeAnArbitrator () {
  return request({
    url: "api/daouser/toarbitrator",
    method: "post",
  });
}
// 获取仲裁员信息
export function getarbitrator () {
  return request({
    url: "api/arbitrate/getarbitrator",
    method: "post",
  });
}