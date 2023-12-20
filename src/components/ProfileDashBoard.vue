<script>
import notification from '../views/negi/notification.vue'
import axios from 'axios';

export default {
    data() {
        return {
            foundUserInfo: JSON.parse(sessionStorage.getItem('foundUserInfo')),
            noti_state : false,
        }
    },
    methods: {
        goTo(x) {
            this.$router.push(x);
        },
        logout() {
            sessionStorage.removeItem('foundUserInfo');
            sessionStorage.removeItem('petInfo');
            alert("成功登出")

            this.$router.push('/') //回到首頁


            this.$router.push('/Login')
        },
        tap_noti(){
            this.noti_state = !this.noti_state
            if(this.noti_state == false){
                this.set_readed()
            }
        },
        set_readed(){
            axios.post(`http://localhost:8080/api/notification/setNotiRead?userId=${this.foundUserInfo.userId}`)
            .then( response => {
                console.log(response.data)
            })
            .catch( error => {
                console.error(error);
            })

        }
    },
    components: {
        notification
    },
}
</script>

<template>
    <div class="dashboardArea">
        <div class="notification line" @click="goTo('/')">
            <i class="fa-solid fa-house"></i>
            <p>首頁</p>
        </div>
        <div class="notification line">
            <i class="fa-solid fa-bell"></i>
            <p @click="tap_noti()">Notification</p>
            <notification  :noti_state = "noti_state"/>
        </div>
        <div class="setting line" @click="goTo('/Profile')">
            <i class="fa-solid fa-user"></i>
            <p>Profile</p>
        </div>
        <div class="setting line" @click="goTo('/ProfileSetting')">
            <i class="fa-solid fa-user-gear"></i>
            <p>Settings</p>
        </div>
        <div class="pet line" @click="goTo('/MyPet')">
            <i class="fa-solid fa-dog"></i>
            <p>My Pet</p>
        </div>
        <div class="article line">
            <i class="fa-solid fa-pencil"></i>
            <p @click="goTo('/MyArticle')">My Articles</p>
        </div>
        <div class="adopt line" @click="goTo('/MyAdopt')">
            <i class="fa-solid fa-user-tie"></i>
            <p>My Adopt</p>
        </div>
        <div class="chat line">
            <i class="fa-brands fa-rocketchat"></i>
            <p>Chat</p>
        </div>
        <div class="logout line" @click="logout()">
            <i class="fa-solid fa-arrow-right-from-bracket"></i>
            <p>登出</p>
        </div>
        <div class="BE line" v-if="foundUserInfo.permission >= 20" @click="goTo('/BeManagement')">
            <i class="fa-solid fa-gear"></i>
            <p>管理</p>
        </div>

    </div>
</template>

<style lang="scss" scoped>
.dashboardArea {
    width: 170px;
    height: auto;
    background-color: white;
    border-radius: 20px;
    color: #978989;
    font-size: 16pt;
    box-shadow: 0 0 3px 2px lightgray;
    padding: 20px;
    position: relative;
    i {
        margin-bottom: 10px;
        margin-right: 1vmin
    }

    .line {
        margin-bottom: 10px;
        cursor: pointer;
    }

    .notification {
        height: 5vh;
        display: flex;
        justify-content: start;
        align-items: center;
        margin-top: 2vmin;
    }

    .setting {
        height: 5vh;
        display: flex;
        justify-content: start;
        align-items: center;
    }

    .pet {
        height: 5vh;
        display: flex;
        justify-content: start;
        align-items: center;
    }

    .article {
        height: 5vh;
        display: flex;
        justify-content: start;
        align-items: center;
    }

    .adopt {
        height: 5vh;
        display: flex;
        justify-content: start;
        align-items: center;
    }

    .chat {
        height: 5vh;
        display: flex;
        justify-content: start;
        align-items: center;
    }

    .logout {
        height: 5vh;
        display: flex;
        justify-content: start;
        align-items: center;
    }

    .BE {
        height: 5vh;
        display: flex;
        justify-content: start;
        align-items: center;

        .router-link-custom {
            text-decoration: none;
            color: blue;
            transition: text-decoration-color 0.3s;
            border-bottom: 1px solid transparent;

            &:hover {
                text-decoration-color: blue;
                border-bottom: 1px solid blue;
            }
        }
    }
}</style>