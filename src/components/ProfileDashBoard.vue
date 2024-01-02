<script>
import Swal from 'sweetalert2'
import notification from '../views/negi/notification.vue'
import axios from 'axios';
import { mapState, mapActions } from "pinia";
import indexState from "../stores/indexState";

export default {
    data() {
        return {
            foundUserInfo: JSON.parse(sessionStorage.getItem('foundUserInfo')),
            noti_state: false,
            isread: true,
            noti_count: 0,
        }
    },
    computed: {
        ...mapState(indexState, ["foundUserInfo"]),
    },


    methods: {
        ...mapActions(indexState, ["updateUserInfo", "clearUserInfo"]),

        // 举例：在某个地方需要更新用户信息时调用此方法
        updateUser(newUserInfo) {
            this.updateUserInfo(newUserInfo);
        },

        goTo(x) {
            this.$router.push(x);
        },
        logout() {
            Swal.fire({
                title: "成功登出",
                icon: "success"
            }).then((result) => {
                if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
                    sessionStorage.clear();
                    this.updateUserInfo(null);
                    this.$router.push('/'); // 回到首頁
                }
            });
        },
        tap_noti() {
            this.noti_state = !this.noti_state
            if (this.noti_state == false) {
                this.set_readed()
            }
        },
        set_readed() {
            axios.post(`http://localhost:8080/api/notification/setNotiRead?userId=${this.foundUserInfo.userId}`)
                .then(response => {
                    console.log(response.data)
                })
                .catch(error => {
                    console.error(error);
                })

        },
        show_isread(read) {
            this.isread = read
        },
        get_noti_count(count) {
            this.noti_count = count
            // console.log(this.noti_count);
        }
    },
    components: {
        notification
    },
}
</script>

<template>
    <div class="dashboardArea">
        <div class="notification line">

            <i class="fa-solid fa-bell" :class="{ 'isread_false': !isread }">
                <span class="count" v-if="this.noti_count != 0 && !isread" :class="{ 'isread_false': !isread }">{{
                    this.noti_count }}</span>
            </i>
            <p @click="tap_noti()">通知</p>
            <notification @isread="show_isread" @noti_count="get_noti_count" :noti_state="noti_state" />
        </div>
        <div class="setting line" @click="goTo('/ProfileSetting')">
            <i class="fa-solid fa-user-gear"></i>
            <p>設定</p>
        </div>
        <div class="pet line" @click="goTo('/MyPet')">
            <i class="fa-solid fa-dog"></i>
            <p>我的毛小孩</p>
        </div>
        <div class="article line">
            <i class="fa-solid fa-pencil"></i>
            <p @click="goTo('/ForumEntrance/ForumMyArticle')">我的文章</p>
        </div>
        <div class="adopt line" @click="goTo('/MyAdopt')">
            <i class="fa-solid fa-user-tie"></i>
            <p>我的領養</p>
        </div>
        <div class="chat line" @click="goTo('/Chat')">
            <i class="fa-brands fa-rocketchat"></i>
            <p>聊聊</p>
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
    width: 185px;
    height: auto;
    min-height: 370px;
    background-color: white;
    border-radius: 20px;
    color: #978989;
    font-size: 16pt;
    box-shadow: 0 0 3px 2px lightgray;
    padding: 20px;
    position: relative;

    i {
        margin-bottom: 10px;
        margin-right: 1vmin;
        width: 24px;
        height: 24px;
    }

    .line {
        margin-bottom: 10px;
        cursor: pointer;
        transition: all 0.3s ease;
        &:hover{
            color: rgb(132, 119, 119);
        }
    }

    .notification {
        height: 35px;
        display: flex;
        justify-content: start;
        align-items: center;
        margin-top: 2vmin;
        // position: relative;


        .isread_false {
            color: red;
            animation: shake 1s ease-in-out infinite;
        }

        .fa-bell {
            position: relative;

            .count {
                position: absolute;
                left: 8px;
                top: -11px;
                border: 1px solid;
                border-radius: 10px;
                background-color: #ffffff;
                color: red;
                font-size: 8pt;
                width: 20px;
                height: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
                font-weight: 700;
            }
        }
    }

    .setting {
        height: 35px;
        display: flex;
        justify-content: start;
        align-items: center;
    }

    .pet {
        height: 35px;
        display: flex;
        justify-content: start;
        align-items: center;
    }

    .article {
        height: 35px;
        display: flex;
        justify-content: start;
        align-items: center;
    }

    .adopt {
        height: 35px;
        display: flex;
        justify-content: start;
        align-items: center;
    }

    .chat {
        height: 35px;
        display: flex;
        justify-content: start;
        align-items: center;
    }

    .logout {
        height: 35px;
        display: flex;
        justify-content: start;
        align-items: center;
    }

    .BE {
        height: 35px;
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
}

@keyframes shake {

    0% {
        transform: rotate(15deg);
    }

    10% {
        transform: rotate(-15deg);
    }

    20% {
        transform: rotate(15deg);
    }

    30% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(0deg);
    }
}
</style>