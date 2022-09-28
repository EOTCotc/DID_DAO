import request from "../utils/request";
//解除仲裁身份
export function TerminationArbitrator (data) {
  return request({
    url: "api/arbitrate/relievearbitrator",
    method: "post",
    data,
  });
}