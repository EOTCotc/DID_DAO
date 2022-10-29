import request from "@/utils/request";

// 公告列表
export const list = () => request.get("/api/notice/notice");
// 详情
export const detail = id =>
	request.get("/api/notice/noticebyid", { params: { id } });
