<script>
import Swal from 'sweetalert2'
import { mapState, mapActions } from "pinia";
import getInfoState from '../stores/getInfoState';

export default {
    data() {
        return {
            userInfo: {},
            chattedUserList: [],
        }
    },

    mounted(){
        this.userInfo = JSON.parse(sessionStorage.getItem('foundUserInfo'));

        // pinia: getInfoState
        this.getChatRooms(this.userInfo);
        // pinia: getInfoState res
        this.chattedUserList = this.foundChattedUserList;
    },

    computed: {
        ...mapState(getInfoState, ['foundChattedUserList'])
    },

    methods: {
        ...mapActions(getInfoState, ['getChatRooms']),

        emitGo(roomInfo){
            const sendChatReq = {
                room: roomInfo,
                user: this.userInfo
            }
            this.$emit('chatReq', sendChatReq)
        }
    },
}
</script>

<template>
    <div class="dashboardArea">
        <div class="title line">
            <span>聊聊列表</span>
        </div>

        <div class="showListArea">
            <div class="showList" v-for="(room, index) in chattedUserList">
                <!-- 私聊 -->
                <div v-if="room.ent == 1" class="showUser" @click="emitGo(room)">
                    <img class="showImg" :src="'data:image/jpeg;base64,' + room.user.userPhoto" alt="">
                    <div class="ShowNameAndAccount">
                        <p class="showText">{{ room.user.userName }}</p>
                        <p class="showText">@{{ room.user.account }}</p>
                    </div>
                </div>

                <!-- 群聊 -->
                <div v-else class="showRoomName">
                    <!-- <img class="showImg" :src="'data:image/jpeg;base64,' + room.user.userPhoto" alt=""> -->
                    <p>{{ room.roomName }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.dashboardArea {
    width: 185px;
    height: auto;
    min-height: 100px;
    background-color: white;
    border-radius: 20px;
    color: #978989;
    font-size: 16pt;
    box-shadow: 0 0 3px 2px lightgray;
    padding: 20px;
    position: relative;
    margin-top: 20px;

    i {
        margin-bottom: 10px;
        margin-right: 1vmin
    }

    .line {
        margin-bottom: 10px;
        cursor: pointer;
        transition: all 0.3s ease;
        &:hover{
            color: rgb(132, 119, 119);
        }
    }

    .showListArea{
        width: 90%;
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: center;
        line-height: normal;
        .showList{
            display: flex;
            .showUser{
                width: 100%;
                height: auto;
                display: flex;
                transition: all 0.3s ease;
                margin-bottom: 10px;
                &:hover{
                    background-color: #f6f6f6;
                }
                .showImg{
                    border-radius: 50%;
                    object-fit: cover;
                    object-position: center;
                    width: 40px;
                    height: 40px;
                    overflow: hidden;
                    border: 0.5px solid #978989;
                    border-radius: 50%;
                    margin-right: 5px;
                }
                .ShowNameAndAccount{
                    color: #978989;
                    font-size: 12pt;
                    .showText{
                        margin: 0px;
                    }
                }
            }
            
        }
    }
}
</style>