import axios from "axios";
import md5 from "js-md5";
import qs from "qs";
import Vant, {Toast} from "vant";
import "vant/lib/index.css";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Cookie from "js-cookie";
import i18n from "@/i18n";

import "normalize.css";
import "amfe-flexible";
import "./registerServiceWorker";

import "@/assets/font/style.css";
import "../src/views/HOME/assets/styles/home.scss";
import "./assets/styles/index.scss";

Vue.config.productionTip = false;

Toast.allowMultiple();
dayjs.extend(utc);

Vue.prototype.cookie = Cookie;
Vue.prototype.$md5 = md5;
Vue.prototype.$qs = qs;
Vue.prototype.$http = axios;
Vue.prototype.$dayjs = dayjs;
Vue.use(Vant);

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
