<script>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
import ChatFlow from './components/ChatFlow.vue'

export default {
  data() {
    return {
      userInfo: {},
      petInfo: {},
      userPetInfo: {},
      petId: "",
      isShowChat: false,
      room: null,
    }
  },
  components: {
    RouterView,
    Header,
    ChatFlow,
  },
  methods: {
    getUserInfo(obj) {
      this.userInfo = obj;
    },

    getPetInfo(obj) {
      this.petInfo = obj;
    },

    getPetId(x) {
      this.petId = x;
    },

    getUserPetInfo(obj) {
      this.userPetInfo = obj;
    },

    showChatArea(data){
      this.isShowChat = !this.isShowChat;
      console.log("is show", this.isShowChat)
      this.room = data;
    },

    closeChatArea(close){
      this.isShowChat = false;
      console.log("is show", this.isShowChat)
    },

    scrollToTop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },
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
      @petId="getPetId"  :petId="petId" 
      @userPetInfo="getUserPetInfo" :userPetInfo="userPetInfo" 
      @callChat="showChatArea"/>
    </div>

    <div v-if="isShowChat" class="chatArea">
      <ChatFlow 
      @chatIsClose="closeChatArea" 
      :room="room"/>
    </div>
    
    <div class="fixedUp" @click="scrollToTop">
      <i class="fa-solid fa-chevron-up"></i>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  width: 100vw;
  height: 13vh;

}

.content {
  width: 100vw;
  min-height: 85vh;
  height: auto;
  overflow: scroll;
}

.chatArea{
  width: 45vw;
  height: 80vh;
  position: fixed;
  top: 10vh;
  left: 27vw;
  z-index: 10;
}


.fixedUp{
  width: 50px;
  height: 50px;
  background-color: rgba(211, 211, 211, 0.804);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  right: 5vw;
  bottom: 10vh;
  transition: all 0.5s ease;
  font-size: 18pt;
  &:hover{
    background-color: lightgray;
  }
}
</style>
