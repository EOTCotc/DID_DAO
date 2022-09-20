import Vue from "vue"; // 引入Vue
import VueI18n from "vue-i18n"; // 引入国际化的包
import zh from './zh'
import en from './en'
Vue.use(VueI18n)

var type = navigator.appName;
if (type == "Netscape") {
  var lang = navigator.language;//获取浏览器配置语言，支持非IE浏览器
} else {
  var lang = navigator.userLanguage;//获取浏览器配置语言，支持IE5+ == navigator.systemLanguage
};
var lang = lang.slice(0, 2);//获取浏览器配置语言前两位

const i18n = new VueI18n({
  // 获取用户选择的语言，没有就用游览器默认的语言
  locale: localStorage.getItem('lang') || lang,
  messages: {
    zh: {
      ...zh
    },
    en: {
      ...en
    }
  }
})

export default i18n;