import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'editor',
      component: require('@/components/editor/editor').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
