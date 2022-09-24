import request from "@/utils/request";

export const list = () => request.get('/api/wallet/getwallets')
export const cancelAuth = (id) => request.delete('/api/wallet/deletewallet', {params: {walletId: id}})