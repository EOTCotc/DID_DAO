import request from "../utils/request";
//风控列表
export function getUserrisk(data) {
  return request({
    url: "api/risk/userrisk",
    method: "post",
    data,
  });
}
