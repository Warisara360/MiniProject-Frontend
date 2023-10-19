import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'


import HomePage from '../components/Homepage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name : 'login',
    component: () => import('../views/LoginView.vue')
  },
  
  {
    path: '/singup',
    name : 'singup',
    component: () => import('../views/SingUpView.vue')
  },
  
  {
    path: '/category',
    name : 'category',
    component: () => import('../views/CategoryView.vue')
  },
  
  {
    path: '/editfood',
    name : 'editfood',
    component: () => import('../views/EditFoodView.vue')
  },
  {
    path: '/addmenu',
    name : 'addmenu',
    component: () => import('../views/AddmenuView.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router