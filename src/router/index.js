import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import i18n from '@/plugins/i18n'

Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

const loadI18nNamespaces = async route => {
  await i18n.lazy.loadNamespace('common')

  if (route.meta.i18n) {
    await Promise.all(route.meta.i18n.map(namespace => i18n.lazy.loadNamespace(namespace)))
  }
}

router.beforeEach((to, from, next) => {
  // load i18n route namespaces
  loadI18nNamespaces(to).then(() => {
    next()
  })
})

export default router
