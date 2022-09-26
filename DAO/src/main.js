import axios from 'axios';
import md5 from 'js-md5';
import qs from 'qs';
import Vant from 'vant';
import 'vant/lib/index.css';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import 'amfe-flexible';
import '../src/views/HOME/assets/styles/home.scss';
import './registerServiceWorker';


Vue.prototype.$md5 = md5;
Vue.prototype.$qs = qs
Vue.prototype.$http = axios
Vue.prototype.$bus = new Vue()
Vue.use(Vant);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
