import Vue from 'vue'
import VueRouter from 'vue-router'
import Patients from '../views/Patients.vue'
import PatientDetails from "../views/PatientDetails";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Patients',
        component: Patients
    },
    {
      path: '/patient/:id',
      name: 'Patient',
      component: PatientDetails
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
