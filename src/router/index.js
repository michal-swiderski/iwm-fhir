import Vue from 'vue'
import VueRouter from 'vue-router'
import Patients from '../views/Patients.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Patients',
    component: Patients
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
