import request from "../utils/request";
//查询销毁记录
export function getdestruction(data) {
  return request({
    url: "api/destruction/getdestruction",
    method: "post",
    data,
  });
}
//销毁查询记录
export function destruction(destructionId) {
  let params = {
    destructionId: destructionId,
  };
  return request({
    url: "api/destruction/destruction",
    method: "post",
    params,
  });
}
