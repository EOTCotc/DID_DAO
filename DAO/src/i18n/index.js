import Vue from "vue"
import vueI18n from 'vue-i18n'

Vue.use(vueI18n)
let lang = JSON.parse(localStorage.getItem('lang')).lang
let browserLang = navigator.language.split('-')
const i18n = new vueI18n({
  locale: lang || browserLang,
  messages: {
    'zh': require('./lang/zh'),
    'en': require('./lang/en')
  },
})

export default i18n