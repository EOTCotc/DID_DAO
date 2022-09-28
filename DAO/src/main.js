import axios from "axios";
import md5 from "js-md5";
import qs from "qs";
import Vant from "vant";
import "vant/lib/index.css";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Cookie from "js-cookie";

import "normalize.css";
import "amfe-flexible";
import "./registerServiceWorker";

import "@/assets/font/style.css";
import dayjs from "dayjs";
import "../src/views/HOME/assets/styles/home.scss";
import "./assets/styles/index.scss";

Vue.prototype.cookie = Cookie;
Vue.prototype.$md5 = md5;
Vue.prototype.$qs = qs;
Vue.prototype.$http = axios;
Vue.prototype.$dayjs = dayjs;
Vue.use(Vant);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
