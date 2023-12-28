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
      this.room = data;
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
      @petId="getPetId"  :petId="petId" 
      @userPetInfo="getUserPetInfo" :userPetInfo="userPetInfo" 
      @callChat="showChatArea"/>
    </div>

    <div :class="{'chatArea':isShowChat,'chatArea_off':!isShowChat}">
      <ChatFlow v-if="isShowChat" :isShowChat="isShowChat" @chatIsClose="showChatArea" :room="room"/>
    </div>
    <div class="fixedChat" @click="showChatArea">
      <i class="fa-solid fa-comments" style="color: white;"></i>
    </div>
  </div>
</template>

<style lang="scss">
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
  transition: all 0.3s ease;
}
.chatArea_off{
    width: 0;
    height: 0;
    opacity: 0;
    transition: all 0.3s ease;    
}

.fixedChat{
  width: 60px;
  height: 60px;
  background-color: #efddbb;
  border-radius: 50%;
  box-shadow: 5px 5px 5px lightgray;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  right: 5vw;
  bottom: 10vh;
  transition: all 0.5s ease;
  font-size: 18pt;
  &:hover{
    background-color: #e5c995;
  }
}
</style>
