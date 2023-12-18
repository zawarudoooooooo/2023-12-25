<script>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'

export default{
  data(){
    return{
      userInfo: {},
      petInfo: {},
      userPetInfo: {},
    }
  },
  components: {
    RouterView,
    Header,
  },
  methods: { 
    getUserInfo(obj){
      this.userInfo = obj;
    },
    getPetInfo(obj){
      this.petInfo = obj;
    },
    getUserPetInfo(obj){
      this.userPetInfo = obj;
    }
  }
}
</script>

<template>
<div class="body">
  <div class="header">
    <Header />
  </div>
  
  <div class="content">
    <RouterView 
    @userInfo="getUserInfo" :userInfo="userInfo"
    @petInfo="getPetInfo" :petInfo="petInfo"
    @userPetInfo="getUserPetInfo" :userPetInfo="userPetInfo"/>
  </div>
</div>
</template>

<style lang="scss" scoped>
.header{
  width: 100vw;
  height: 15vh;
}
.content{
  width: 100vw;
  min-height: 85vh;
  height: auto;
  overflow: scroll;
}
</style>
