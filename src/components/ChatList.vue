<script>
import Swal from 'sweetalert2'
import { mapState, mapActions } from "pinia";
import getInfoState from '../stores/getInfoState';
import socketState from '../stores/socketState';

export default {
    data() {
        return {
            userInfo: {},
            show: [],
        }
    },

    mounted(){
        this.userInfo = JSON.parse(sessionStorage.getItem('foundUserInfo'));

        // pinia: getInfoState
        this.getChatRooms(this.userInfo);

        // set 1500ms doing the method once
        // setInterval(() => this.newShowList(), 1500);
    },

    computed: {
        ...mapState(getInfoState, ['foundChattedRoomList', 'foundChattedUserList', 'newChatUser', 'newChatRoom']),
        ...mapState(socketState, ['socket', 'serverSendText']),

        showList(){
            const roomArr = [];

            this.foundChattedRoomList.forEach( room => {
                for(let i = 0; i < this.foundChattedUserList.length; i++){
                    let checkUser = this.foundChattedUserList[i];
                    if(checkUser.chatRoomId == room.chatRoomId && checkUser.receiver == this.userInfo.userId){
                        const newRoomObj = Object.assign({}, room, { isRead: checkUser});
                        roomArr.push(newRoomObj);
                    }
                }
            })
            this.show = roomArr;
            return roomArr;
        }
    },

    watch: {
        showList: {
            handler(newShowList, oldShowList) {
                // console.log('show list changed', newDateCount);
            },
        },
    },

    methods: {
        ...mapActions(getInfoState, ['getChatRooms', 'readMessage']),
        ...mapActions(socketState, ['connectServer', 'connectChannel']),

        newShowList(){
            this.getChatRooms(this.userInfo)

            this.foundChattedRoomList.forEach( room => {
                console.log(room)
                for(let i = 0; i < this.foundChattedUserList.length; i++){
                    let checkUser = this.foundChattedUserList[i];
                    console.log(checkUser)
                    for(let x = 0; x < this.show.length; x++){
                        let checkShow = this.show[x];
                        console.log(checkShow)
                        if(checkUser.chatRoomId == room.chatRoomId && checkUser.receiver == this.userInfo.userId){
                            if(checkShow.chatRoomId == room.chatRoomId){
                                if(checkShow.lastMsg == room.lastMsg){
                                    continue;
                                } else {
                                    checkShow = Object.assign({}, room, { isRead: checkUser});
                                }
                            } else {
                                const newRoomObj = Object.assign({}, room, { isRead: checkUser});
                                this.show.push(newRoomObj)
                            }
                            
                        }
                    }
                    
                }
            })
        },

        emitGo(roomInfo){
            // ponia WebSocket: 建立 channel
            const data = {
                    chatRoomId: roomInfo.chatRoomId,
                    ent: roomInfo.ent,
                    subscribers: roomInfo.subscriberList,
                }
            this.connectChannel(data)

            // 叫出聊天視窗和記錄到 Chat.vue
            const sendChatReq = {
                room: roomInfo,
                user: this.userInfo
            }
            this.$emit('chatReq', sendChatReq)

            // pinia WebSocket: 標示為已讀
            this.readMessage(this.userInfo.userId, roomInfo.chatRoomId)
        },

        getNew(){
            for(let i = 0; i < this.showList.length; i++){
                const check = this.showList[i]
                console.log("check", check)
                console.log("new chat room", this.newChatRoom)
                if(check.chatRoomId == this.newChatRoom.chatRoomId){
                    check.lastMsg = this.serverSendText;
                    this.showList[i] = Object.assign({}, check, { isRead: this.newChatUser});
                    console.log(this.showList[i])
                }
            }
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
            <div class="showList" v-for="(room, index) in show">
                <!-- 私聊 -->
                <div v-if="room.ent == 1" class="showUser" :class="{ 'unreadBgc': room.isRead.receiver == userInfo.userId && room.isRead.read == false}" @click="emitGo(room)">
                    <img class="showImg" :src="'data:image/jpeg;base64,' + room.user.userPhoto" alt="">
                    <div class="ShowNameAndMsg" :class="{ 'unread': room.isRead.receiver == userInfo.userId && room.isRead.read == false}">
                        <p class="showText">{{ room.user.userName }}</p>
                        <p class="showText">{{ room.lastMsg.replace(/^"|"$/g, '') }}</p>
                    </div>
                </div>

                <!-- 群聊 -->
                <div v-else class="showRoomName" :class="{ 'unreadBgc': room.isRead.receiver == userInfo.userId && room.isRead.read == false}" @click="emitGo(room)">
                    <!-- <img class="showImg" :src="'data:image/jpeg;base64,' + room.user.userPhoto" alt=""> -->
                    <div class="ShowNameAndMsg" :class="{ 'unread': room.isRead.receiver == userInfo.userId && room.isRead.read == false}">
                        <p class="showText">{{ room.user.userName }}</p>
                        <p class="showText">{{ room.lastMsg.replace(/^"|"$/g, '') }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '../assets/RStyle.scss';

.dashboardArea {
    width: 185px;
    height: auto;
    min-height: 100px;
    background-color: white;
    border-radius: 20px;
    color: #978989;
    font-size: 16pt;
    box-shadow: 0 0 3px 2px lightgray;
    padding-top: 15px;
    padding-bottom: 15px;
    position: relative;

    .title{
        margin-left: 20px;
    }

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
        width: inherit;
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: center;
        line-height: normal;
        .showList{
            width: 100%;
            display: flex;
            .showUser{
                width: 100%;
                height: 55px;
                display: flex;
                align-items: center;
                padding-left: 20px;
                transition: all 0.3s ease;
                overflow: hidden;
                &:hover{
                    background-color: #f0f0f0;
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
                .ShowNameAndMsg{
                    color: #978989;
                    font-size: 12pt;
                    .showText{
                        margin: 0px;
                    }
                }
                .unread{
                    width: 90px;
                    color: #978989;
                    font-weight: bold;
                    font-size: 12pt;
                    .showText{
                        margin: 0px;
                    }
                }
            }
            .unreadBgc{
                background-color: #f6f0e1;
                &:hover{
                    background-color: #f4e9cf;
                }
            }
        }
    }
}
</style>