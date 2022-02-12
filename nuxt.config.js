import i18n from './i18n/i18n'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Wordamo',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      { hid: 'og-type', property: 'og:type', content: 'website' },
      { hid: 'og-title', property: 'og:title', content: 'Wordamo | Find 10 words' },
      { hid: 'og-desc', property: 'og:description', content: 'Try to find the 5-letter words that will appear in 3 minutes by using the clues.' },
      { hid: 'og-image', property: 'og:image', content: 'https://wordamo.vercel.app/favicon.png' },
      { hid: 'og-url', property: 'og:url', content: 'https://wordamo.vercel.app' },
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicon.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700;800;900&display=swap' }
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/utils/color.css',
    '@/assets/utils/font.css',
    '@/assets/utils/variables.css',
    '@/assets/app.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/router.js', ssr: false },
    { src: '~/plugins/vue-confetti.js', mode: 'client' },
    '~/plugins/vue-countdown.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // i18n
    i18n
  ],
  bootstrapVue: {
    icons: true
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
