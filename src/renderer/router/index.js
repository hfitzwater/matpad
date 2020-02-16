import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'editor',
      component: require('@/components/editor/Editor').default
    },
    {
      path: '/preferences',
      name: 'preferences',
      component: require('@/components/preferences/Preferences').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
