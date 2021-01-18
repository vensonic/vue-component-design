import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/communicate',
    name: 'communicate',
    component: () => import(/* webpackChunkName: "about" */ '../views/brodcastAndDispatch/A.vue')
  },
  {
    path: '/formPage',
    name: 'FormPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/formPage.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
