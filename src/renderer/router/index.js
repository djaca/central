import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'morning-pages',
      component: require('@/views/MorningPages').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
