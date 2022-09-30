import request from "../utils/request";
//成为审核员
export function becomeAnAuditor () {
  return request({
    url: "api/daouser/toauditor",
    method: "post",
  });
}
//获取审核员信息
export function getUnapprovedInformation () {
  return request({
    url: "api/arbitrate/getarbitrator",
    method: "post",
  });
}
//解除审核身份
export function disapproveIdentity () {
  return request({
    url: "api/arbitrate/relievearbitrator",
    method: "post",
  });
}
