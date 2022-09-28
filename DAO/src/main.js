import axios from "axios";
import md5 from "js-md5";
import qs from "qs";
import Vant from "vant";
import "vant/lib/index.css";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import dayjs from "dayjs";
import VueI18n from "vue-i18n"

import "normalize.css"
import "amfe-flexible";
import "./registerServiceWorker";

import "@/assets/font/style.css";
import "../src/views/HOME/assets/styles/home.scss";
import "./assets/styles/index.scss";


Vue.prototype.$md5 = md5;
Vue.prototype.$qs = qs;
Vue.prototype.$http = axios;
Vue.prototype.$dayjs = dayjs;
Vue.use(Vant);
Vue.config.productionTip = false;

// const i18n = new VueI18n({
//   locale: 'zh',
//   messages: {
//     'zh': require('./lang/zh_cn'),
//     'en': require('./lang/en_us')
//   }
// })

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
