import request from "../utils/request";
//查询销毁记录
export function getdestruction(data) {
  return request({
    url: "api/destruction/getdestruction",
    method: "post",
    data,
  });
}
