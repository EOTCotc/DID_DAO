import request from "@/utils/request";

export const list = (data) => request({
  url:'api/user/getuserteam',
  method:'GET',
  params: data
})
// 获取更多团队成员
export const morePersonnel = () => request.put("/api/user/teamauth")