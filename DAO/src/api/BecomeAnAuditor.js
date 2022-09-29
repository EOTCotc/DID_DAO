import request from "../utils/request";
//成为审核员
export function becomeAnAuditor () {
  return request({
    url: "api/daouser/toauditor",
    method: "post",
  });
}