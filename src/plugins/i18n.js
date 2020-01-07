import Vue from 'vue'
import i18next from 'i18next'
import VueI18Next from '@panter/vue-i18next'
import moment from 'moment-timezone'

const languages = ['de', 'en']
const loadedNamespaces = []

const currentLanguage = 'de'

moment.locale(currentLanguage)

Vue.use(VueI18Next)
i18next.init({
  lng: currentLanguage,
  fallbackLng: 'en',
  defaultNS: 'common',
  whitelist: languages,
  resources: {},
  debug: process.env.NODE_ENV !== 'production'
})
const i18n = new VueI18Next(i18next)

i18n.lazy = {
  t: (...args) => () => i18n.t(...args),
  loadNamespace: namespace => {
    if (loadedNamespaces.includes(namespace)) {
      return Promise.resolve()
    }

    loadedNamespaces.push(namespace)

    const language = i18n.i18next.language || currentLanguage
    return import('@/locales/' + language + '/' + namespace).then(file => {
      i18n.i18next.addResourceBundle(language, namespace, file.default, true, true)
    })
  }
}

export default i18n
