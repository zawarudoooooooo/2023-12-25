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
    },
    {
      path: '/check',
      name: 'check',
      component: () => import('../views/Profile_MyPets/OnlyforCheck.vue'),
    },
    {
      path: '/edit_myArticle',
      name: 'edit_myArticle',
      component: () => import('../views/negi/edit_myArticle.vue'),
    },
    {
      path: '/pre_myArticle',
      name: 'pre_myArticle',
      component: () => import('../views/negi/pre_myArticle.vue'),
    },
    {
      path: '/view_Article',
      name: 'view_Article',
      component: () => import('../views/negi/view_Article.vue'),
    },
    {
      path: '/create_Article',
      name: 'create_Article',
      component: () => import('../views/negi/create_Article.vue'),
    },


    //從這裡開始路由是yxz的
    {
      path: '/PlatformEntrance',
      name: 'PlatformEntrance',
      component: () => import('../views/yxz/PlatformEntrance.vue'),
    },
    {
      path: '/ForumEntrance',
      name: 'ForumEntrance',
      component: () => import('../views/yxz/ForumEntrance.vue'),
    },

    //12.14 BE for admin
    {
      path: '/BeManagement',
      name: 'BeManagement',
      component: () => import('../views/yxz/BeManagement.vue'),
    },


    
    //這是Mebice的
    {
      path: '/mapSearch',
      name: 'mapSearch',
      component: () => import('../views/Mebice/mapSearch.vue'),
    },
  ]
})

export default router
