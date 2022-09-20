import request from "@/utils/request";

export const list = (data) => request({
  url:'api/user/getuserteam',
  method:'GET',
  params: data
})