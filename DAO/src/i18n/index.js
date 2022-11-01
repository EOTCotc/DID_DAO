import Vue from "vue";
import vueI18n from "vue-i18n";
Vue.use(vueI18n);

let browserLang = navigator.language.split("-")[0];
let lang = JSON.parse(localStorage.getItem("lang"));
if (lang) {
  lang = lang.lang;
}

const i18n = new vueI18n({
  locale: lang || browserLang,
  messages: {
    zh: require("./lang/zh"),
    en: require("./lang/en"),
    zhTw: require("./lang/zhTw"),
    ko: require("./lang/ko"),//韩语
    th: require("./lang/th"),//泰语
    ja: require('./lang/ja'),//日语
    de: require('./lang/de'),//德语
    es: require('./lang/es'),//西班牙语
    pt: require('./lang/pt'),//葡萄牙语
    fr: require('./lang/fr'),//法语
    ru: require('./lang/ru'),//俄语
    vi: require('./lang/vi'),//越南语
    nl: require("./lang/nl"),//荷兰语
    ar: require("./lang/ar"),//阿拉伯语
    id: require("./lang/id"),//印尼语
    it:require('./lang/it'),//意大利
  },
});

export default i18n;
