import axios from "axios";
import Vue from "vue";
import $router from "../router";

export const domain = "192.168.2.110:5555/";

//export const baseUrl = `https://${domain}/Upload/`;

const request = axios.create({
  baseURL: `http://${domain}/`,
});

const wallet = {
  walletAddress: localStorage.getItem("myaddress"),
  otype: localStorage.getItem("netType"),
  sign: localStorage.getItem("mysign"),
};
// const wallet = {
//   walletAddress: 'string',
//   otype: 'string',
//   sign: 'string',
// }

//请求拦截器
request.interceptors.request.use(
  (config) => {
    config.data = {
      ...config.data,
      ...wallet,
    };
    config.data = Object.assign(config.data || {}, wallet);
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
      Vue.$toast.clear();
      Vue.$toast.error("客户端请求异常");
    } else if (status === 429) {
      //console.log(status)
      Vue.$toast.clear();
    } else if (status >= 500) {
      Vue.$toast.clear();
      Vue.$toast.error(status + " 服务器异常，请退出重新登录！");
      $router.replace({
        name: "error",
      });
    }
    return Promise.reject(error);
  }
);

export default request;
