import Vue from 'vue'
import Router from 'vue-router'
import MsDemo from '@/MsDemo/MsDemo.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MsDemo.name',
      component: MsDemo
    }
  ]
})
