import Vue from "vue"
import vueI18n from 'vue-i18n'

Vue.use(vueI18n)

const i18n = new vueI18n({
  locale: 'zh',
  messages: {
    'zh': require('./lang/zh'),
    'en': require('./lang/en')
  }
})

export default i18n