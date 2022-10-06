import axios from 'axios';
import cookie from 'js-cookie'

const request = axios.create({
  baseURL: process.env.VUE_APP_LOCATION,
});

//请求拦截器
request.interceptors.request.use(
  (config) => {
    const token = 'Bearer ' + cookie.get('token') || ''
    if (cookie.get('token')) {
      config.headers['Authorization'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

//响应拦截器
request.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const status = error.response?.status; // 响应状态码
    if (status === 400) {
      console.error('请求参数有问题');
    } else if (status === 401) {
      console.error('没权限');
    } else if (status === 404) {
      console.error('找不到该接口')
    } else if (status >= 500) {
      console.error('服务器异常')
    }
    return Promise.reject(error);
  }
);

export default request;
