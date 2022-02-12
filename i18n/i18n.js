import tr from './tr'
import en from './en'

const i18n = [
  'nuxt-i18n',
  {
    locales: ['tr', 'en'],
    defaultLocale: 'tr',
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        tr,
        en
      }
    }
  }
]

export default i18n