import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import jsCookie from 'js-cookie'
import i18n from '@/lang/index'
import "@/assets/font/style.css"

import { Search, Toast, Button, Form, Field, Icon, Checkbox, NavBar, Popup, Cell, Overlay, Tabs, Tab, Loading, PullRefresh, Image, List, Dialog, Empty, Row, Col, RadioGroup, Radio, Popover, Steps, Step } from 'vant';

Vue.config.productionTip = false//关闭生产提示
Vue.prototype.cookie = jsCookie //全局引入

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
Vue.use(Tabs)
Vue.use(Tab)
Vue.use(Loading)
Vue.use(PullRefresh)
Vue.use(Image)
Vue.use(List)
Vue.use(Dialog)
Vue.use(Empty)
Vue.use(Row)
Vue.use(Col)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Popover)
Vue.use(Steps)
Vue.use(Step)

new Vue({
  render: h => h(App),
  store,
  router,
  i18n
}).$mount('#app')
