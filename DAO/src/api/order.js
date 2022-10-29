import http from "@/utils/http";

export const orderDetail = params =>
	http.post(`api/OTC/ArbitrateOrder?oid=${params.orderId}&uid=${params.uid}`);
