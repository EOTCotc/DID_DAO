import request from "../utils/request";
//工单列表
export function getworkorderlist(data) {
  return request({
    url: "api/workorder/getworkorderlist",
    method: "post",
    data,
  });
}
//工单详情

export function getworkorder(data) {
  return request({
    url: "api/workorder/getworkorder",
    method: "post",
    data,
  });
}
//修改工单状态
export function updateWork(data) {
  return request({
    url: "api/workorder/workorderstatus",
    method: "post",
    data,
  });
}
//上传图片
export function uploadimage(data) {
  return request.post("api/destruction/uploadimage?type=wordOrder", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}
//添加工单

export function addworkorder(data) {
  return request({
    url: "api/workorder/addworkorder",
    method: "put",
    data,
  });
}
