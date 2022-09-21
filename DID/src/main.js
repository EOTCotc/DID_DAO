import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import jsCookie from 'js-cookie'
import md5 from 'md5'
import i18n from '@/lang/index'

import { Area, Picker, Search, Toast, Button, Form, Field, Icon, Checkbox, NavBar, Popup, Cell, Overlay } from 'vant';

Vue.config.productionTip = false//关闭生产提示
Vue.prototype.cookie = jsCookie //全局引入
Vue.prototype.$md5 = md5

Vue.use(Area);
Vue.use(Picker);
Vue.use(Search);
Vue.use(Toast);
Vue.use(Button);
Vue.use(Form);
Vue.use(Field);
Vue.use(Icon);
Vue.use(Checkbox);
Vue.use(NavBar);
Vue.use(Popup);
Vue.use(Cell);
Vue.use(Overlay)

new Vue({
  render: h => h(App),
  store,
  router,
  i18n
}).$mount('#app')
