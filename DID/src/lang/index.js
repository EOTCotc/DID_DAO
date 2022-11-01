import Vue from 'vue'; // 引入Vue
import VueI18n from 'vue-i18n'; // 引入国际化的包

Vue.use(VueI18n);

var type = navigator.appName;
if (type == 'Netscape') {
  var browserLang = navigator.language; //获取浏览器配置语言，支持非IE浏览器
} else {
  var browserLang = navigator.userLanguage; //获取浏览器配置语言，支持IE5+ == navigator.systemLanguage
}
var browserLang = browserLang.slice(0, 2); //获取浏览器配置语言前两位
localStorage.setItem('langText', browserLang);
// 用户选择了语言
let lang = JSON.parse(localStorage.getItem('lang'));
if (lang) {
  lang = lang.lang;
}
const i18n = new VueI18n({
  // 获取用户选择的语言，没有就用游览器默认的语言
  locale: lang || browserLang,
  messages: {
    zh: require('./zh').default,
    zhTw: require('./zhTw').default,
    en: require('./en').default,
    ru: require('./ru').default,// 俄语
    fr: require('./fr').default,// 法语
    ko: require('./ko').default,// 韩语
    ja: require('./ja').default,// 日语
    nl: require('./nl').default,// 荷兰语
    th: require('./th').default,// 泰语
    ar: require('./ar').default,// 阿拉伯语
    id: require('./id').default,// 印尼语
    es: require('./es').default,// 西班牙语
    pt: require('./pt').default,// 葡萄牙语
    vi: require('./vi').default,// 越南语
    it: require('./it').default,// 意大利语
    de: require('./de').default,// 德语
  },
});
export default i18n;
