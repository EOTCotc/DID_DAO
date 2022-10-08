import request from "@/utils/request";

export const list = () => request.get('/api/project/getprojects')
export const cancelAuth = (id) => request.delete('/api/project/unbind', {params: {projectId: id}})