import request from "../utils/request";
//提案列表
export function getmyprops (data) {
  return request({
    url: "api/proposal/getmyproposallist",
    method: "post",
    data,
  });
}
//提案详情
export function getproposal(data) {
  return request({
    url: "api/proposal/getproposal",
    method: "post",
    data,
  });
}
//提交提案
export function putproposal (data) {
  return request({
    url: "api/proposal/addproposal",
    method: "put",
    data,
  });
}

//取消提案
export function cancelproposal(data) {
  return request({
    url: "api/proposal/cancelproposal",
    method: "post",
    data,
  });
}

//投票
export function proposalvote (data) {
  return request({
    url: "api/proposal/proposalvote",
    method: "post",
    data,
  });
}
