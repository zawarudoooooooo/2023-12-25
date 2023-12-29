<script>
import ProfileDashBoard from '../../components/profiledashboard.vue';
import ChatList from '../../components/ChatList.vue';
import axios from 'axios';
import { mapState, mapActions } from "pinia";
import getInfoState from '../../stores/getInfoState';

export default{
    data(){
        return{
            connected: false,
            socket: null,
            userInfo: {},
            sendMsg: "",
            chatUserList: null,
            // recordMsg: [],
        }
    },

    components: {
        ProfileDashBoard,
        ChatList
    },

    mounted(){
        // 連接WebSocket
        this.socket = new WebSocket('ws://localhost:8081') 

        this.userInfo = JSON.parse(sessionStorage.getItem('foundUserInfo'));
        console.log("user", this.userInfo)

        this.socket.addEventListener('open', event => {
            console.log('[WebSocket connected] ', event);
            this.connected = true;
        })
        

        // 接收来自客户端的消息
        this.socket.addEventListener('message', (event) => {
            // const data = JSON.parse(event)
            console.log('[Message from Server]', event.data);
            // 将消息添加到数组中
            this.messages.push(event.data);
        });
    },

    computed: {
        ...mapState(getInfoState, ['recordMsg'])
    },

    methods: {
        ...mapActions(getInfoState, ['getChatDetail']),

        // connect to WebSocket server
        connect() { 
            this.socket.send(JSON.stringify({ type: 'user', data: this.userInfo }));
            // 在開啟連線時執行
            this.socket.onopen = () => {
                console.log('[open connection]')
                // Listen fro messages from Server
                this.socket.onmessage = event => {
                    console.log(`[Message from Server]:\n %c${event.data}`, 'color: blue')
                }
            }
        },

        // Listen for msg from Server
        sendMessage(){
            // send msg to Server
            this.socket.send(JSON.stringify(this.sendMsg))
        },

        disconnect() {
            this.socket.close()
            // 在關閉連線時執行
            this.socket.onclose = () => console.log('[close connection]')
        },

        getChatDetailFromPinia(obj){
            this.getChatDetail(obj)
        },

    }
}
</script>


<template>
<div class="content">
    <!-- 側邊功能區 -->
    <div class="dashBoardArea">
        <ProfileDashBoard />
        <ChatList @chatReq="getChatDetailFromPinia"/>
    </div>

    <!-- 主顯示頁面 -->
    <div class="showBoard">
        <!-- test chat -->
        <div v-if="this.connected" class="chatArea">

            <h4>Room Name</h4>

            <div class="chat" v-for="(msg, index) in recordMsg">
                <!-- chat -->
                <div v-if="msg.ent == 1" class="chat-messages">
                    <div class="showUserSimple" :key="index">
                        <img class="showImg" :src="'data:image/jpeg;base64,' + room.user.userPhoto" alt="">
                        <span>{{ msg.text }}</span>
                    </div>
                </div>

                <!-- group -->
                <div v-if="msg.ent == 2" class="chat-messages">
                    <div class="showUser" :key="index">
                        <img class="showImg" :src="'data:image/jpeg;base64,' + room.user.userPhoto" alt="">
                        <div class="ShowNameAndAccount">
                            <p class="showText">{{ msg.user.userName }}</p>
                            <p class="showText">@{{ msg.user.account }}</p>
                        </div>
                        <span>{{ msg.text }}</span>
                    </div>
                </div>

                <!-- send mssage -->
                <div class="msg">
                    <span>Message: </span>
                    <input type="text" id="sendMsg" v-model="sendMsg">
                    <button id="sendBtn" @click="sendMessage">Send</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>


<style lang="scss" scoped>
@import '../../assets/RStyle.scss';
.content{
    background-color: $primaryBgc;
}

.chatArea{
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: normal;
    background-color: aliceblue;
        .chat{
            width: 90%;
            height: 60vh;
            overflow: scroll;
            display: flex;
            flex-direction: column;
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
</style>