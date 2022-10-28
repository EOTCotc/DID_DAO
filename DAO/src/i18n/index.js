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
    ko: require("./lang/ko"),
    th: require("./lang/th"),
    ja: require('./lang/ja'),
    de: require('./lang/de'),
    es: require('./lang/es'),//西班牙语
    pt: require('./lang/pt'),//葡萄牙语
  },
});

export default i18n;
