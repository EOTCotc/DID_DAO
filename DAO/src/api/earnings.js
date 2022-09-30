import request from "../utils/request";
//总收益
export function getdaoinfo (data) {
  return request({
    url: "api/daouser/getdaoinfo",
    method: "post",
    data,
  });
}
//收益详情
export function getincome (page, itemsPerPage) {
  let params = {
    page: page,
    itemsPerPage: itemsPerPage,
  };
  return request({
    url: "api/incomedetails/getincomedetails",
    method: "post",
    params,
  });
}
