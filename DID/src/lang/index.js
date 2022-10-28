import Vue from 'vue'; // 引入Vue
import VueI18n from 'vue-i18n'; // 引入国际化的包
import zh from './zh';
import en from './en';
import zhTw from './zhTw';
import ja from './ja'; // 日语
import ko from './ko'; // 韩语
import ru from './ru'; // 俄语
import fr from './fr'; // 法语
import th from './th'; // 泰语
import nl from './nl'; // 荷兰语
import ar from './ar'; // 阿拉伯语
import id from './id'; // 印尼语
import es from './es'; // 西班牙语
import pt from './pt'; // 葡萄牙语
import vi from './vi'; // 越南语
import it from './it'; // 意大利语

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
    zh,
    en,
    ru,
    fr,
    zhTw,
    ko,
    ja,
    nl,
    th,
    ar,
    id,
    es,
    pt,
    vi,
    it,
  },
});

export default i18n;
