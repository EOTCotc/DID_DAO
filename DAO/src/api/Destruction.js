import request from "../utils/request";
//提案列表
export function getdestruction(data) {
  return request({
    url: "api/destruction/getdestruction",
    method: "post",
    data,
  });
}
