import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import ForgetPassword from '../views/ForgetPassword.vue'
import ForceChangePassword from '../views/ForceChangePassword.vue'
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
      path: '/ForgetPassword',
      name: 'ForgetPassword',
      component: ForgetPassword
    },
    {
      path: '/ForceChangePassword',
      name: 'ForceChangePassword',
      component: ForceChangePassword
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
    // profile_mypet
    {
      path: '/MyPet',
      name: 'MyPet',
      component: () => import('../views/Profile_MyPets/MyPet.vue'),
    },
    // profile_mypet_create
    {
      path: '/PetCreate',
      name: "PetCreate",
      component: () => import('../views/Profile_MyPets/PetCreate.vue'),
    },
    // profile_mypet_detail
    {
      path: '/PetDetail',
      name: "PetDetail",
      component: () => import('../views/Profile_MyPets/PetDetail.vue'),
    },
    // profile_mypet_detail_modify
    {
      path: '/PetDetailModify',
      name: "PetDetailModify",
      component: () => import('../views/Profile_MyPets/PetDetailModify.vue'),
    },
    // the detail page in adopt search
    {
      path: '/AdoptSearchDetail',
      name: 'AdoptSearchDetail',
      component: () => import('../views/Profile_MyAdopt/AdoptSearchDetail.vue'),
    },
    // profile_myadopt
    {
      path: '/MyAdopt',
      name: 'MyAdopt',
      component: () => import('../views/Profile_MyAdopt/MyAdopt.vue'),
    },
    {
      path: '/AdoptPetDetail',
      name: 'AdoptPetDetail',
      component: () => import('../views/Profile_MyAdopt/AdoptPetDetail.vue'),
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
      path: '/MapSearch',
      name: 'MapSearch',
      component: () => import('../views/Mebice/MapSearch.vue'),
    },

    {
      path: '/AdoptionSearch',
      name: 'AdoptionSearch',
      component: () => import('../views/Mebice/AdoptionSearch.vue'),
    },
    {
      path: '/MyArticle',
      name: 'MyArticle',
      component: () => import('../views/Mebice/MyArticle.vue'),
    },




    //
    {
      path: '/notification',
      name: 'notification',
      component: () => import('../views/negi/notification.vue'),
    },
    {
      path: '/ProfileForOther/:sendId',
      name: 'ProfileForOther',
      component: () => import('../views/ProfileForOther.vue'),
    },

    //科普版
    {
      path: '/PopScience',
      name: 'PopScience',
      component: () => import('../views/PopScience.vue'),
    },
    //閒聊版
    {
      path: '/ChitChatting',
      name: 'ChitChatting',
      component: () => import('../views/ChitChatting.vue'),
    },
  ]
})

export default router
