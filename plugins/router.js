export default({ app }) => {
  app.router.beforeEach((to, from, next) => {
    const storedLanguage = localStorage.getItem('language') 
    if(storedLanguage && ['tr', 'en'].includes(storedLanguage)) {
      app.i18n.locale = storedLanguage
    }
    else if(['tr', 'en'].includes(navigator.language)){
      app.i18n.locale = navigator.language
    }
    else {
      app.i18n.locale = 'en'
    }
    next()
  })
}