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

export function getworkorder(workOrderId) {
  let params = {
    workOrderId: workOrderId,
  };
  return request({
    url: "api/workorder/getworkorder",
    method: "post",
    params,
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
