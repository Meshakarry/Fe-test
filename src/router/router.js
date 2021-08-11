import Vue from 'vue'
import VueRouter from 'vue-router'
import ZnanstveniRadovi from '../components/ZnanstveniRadovi'
import ZnanstveniRadoviPrikaz from '../components/ZnanstveniRadoviPrikaz'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'ZnanstveniRadovi',
    component: ZnanstveniRadovi
  },
  {
    path: '/prikaz',
    name: 'ZnanstveniRadoviPrikaz',
    component: ZnanstveniRadoviPrikaz
  },

]

const router = new VueRouter({
  mode: 'history',
//   base: process.env.BASE_URL,
  routes
})

export default router

