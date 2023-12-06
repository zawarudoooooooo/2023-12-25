import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/SignUp',
      name: 'SignUp',
      component: () => import('../views/SignUp.vue')
    },
    {
      path: '/Profile',
      name: 'Profile',
      component: () => import('../views/Profile.vue'),
    },
    {
      path: '/ProfileSetting',
      name: 'ProfileSetting',
      component: () => import('../views/ProfileSetting.vue')
    },
    {
      path: '/MyPet',
      name: 'MyPet',
      component: () => import('../views/Profile_MyPets/MyPet.vue'),
    },
    {
      path: '/PetDetail',
      name: "PetDetail",
      component: () => import('../views/Profile_MyPets/PetDetail.vue'),
    }
  ]
})

export default router
