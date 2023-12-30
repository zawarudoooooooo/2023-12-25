<script>
import axios from 'axios';
import { mapState, mapGetters, mapActions } from "pinia";
import getInfoState from '../stores/getInfoState';

export default{
    data(){
        return{
            isOpen: false,
            connected: false,
            socket: null,
            userInfo: {},
            msg: "",
            messages: [],
            chatRoom: null,
            showRoomName: "",
        }
    },

    props: [
        "isShowChat",
        "room"
    ],

    mounted(){
        this.chatRoom = this.room;
        console.log("chat room", this.chatRoom)
        this.isOpen = this.isShowChat;

        // 連接WebSocket
        this.socket = new WebSocket('ws://localhost:8081') 

        this.userInfo = JSON.parse(sessionStorage.getItem('foundUserInfo'));

        this.socket.addEventListener('open', event => {
            console.log('[WebSocket connected] ', event);
            this.connected = true;

            // 在连接打开时执行
            console.log('[open connection]');
            // Listen for messages from Server
            this.socket.onmessage = event => {
                console.log(`[Message from Server]:\n %c${event.data}`, 'color: blue');
                // 将消息添加到数组中
                this.messages.push(event.data);
            };
            this.connect()
        })


        const subArr = this.chatRoom.subscriberList.split(',').map(id => id.trim())
        if(subArr.length == 2){
            for(let i = 0; i < 2; i++){
                if(subArr[i] != this.userInfo.userId){
                    this.getPetUser(subArr[i])
                }
            }
        } else {
            this.showRoomName = this.chatRoom.name;
        }

        console.log("date time", this.currentDateTime)
    },

    computed: {
        ...mapGetters(getInfoState, ['currentDateTime']),
    },

    methods: {
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
            this.socket.send(JSON.stringify({chatRoomId: this.chatRoom.chatRoomId, ent: this.chatRoom.ent, msg: this.msg, dateTime: this.currentDateTime, subscribers: this.chatRoom.subscriberList}));

            // axios.post('http://localhost:8080/api/adoption/chat/create_message', {
            //     sender: this.userInfo.userId,
            //     text: JSON.stringify(this.msg),
            //     chatRoomId: this.chatRoom.chatRoomId,
            //     timeStamp: this.currentDateTime
            // })
            // .then(response => {
            //     console.log("response", response.data)
            // })
            // .catch(error => {
            //     console.error(error)
            // })
        },

        disconnect() {
            this.socket.close()
            // 在關閉連線時執行
            this.socket.onclose = () => console.log('[close connection]')
        },
        closeChat(){
            this.isOpen = false;
            this.$emit('chatIsClose', false)
        },
        getPetUser(id) {
            axios.get('http://localhost:8080/api/adoption/userInfo/finduser', {
                params: {
                    userId: id
                }
            })
            .then(response => {
                console.log("response user", response.data)
                this.showRoomName = response.data.userInfo.userName
            })
            .catch(error => {
                console.error(error)
            })
        },
    }
}
</script>


<template>
<div class="showContent">
    <!-- 主顯示頁面 -->
    <div class="showChat">
        <!-- test chat -->
        <div v-if="this.connected" class="chatArea">
            <div class="chatTop">
                <h3>{{ this.showRoomName }}</h3>
                <button type="button" class="btn-close closeBtn" @click="closeChat"></button>
            </div>

            <div class="chat-messages">
                <div v-for="(message, index) in messages" :key="index">
                    {{ message }}
                </div>
            </div>

            <div class="msg">
                <span>Message: </span>
                <input type="text" id="sendMsg" v-model="msg">
                <button id="sendBtn" @click="sendMessage">Send</button>
            </div>
        </div>
    </div>
</div>
</template>


<style lang="scss" scoped>
@import '../assets/RStyle.scss';

.showContent{
    background-color: transparent;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.showChat{
    width: 45vw;
    height: 80vh;
    border: 3px solid #d8d2c3;
    border-radius: 20px;
    font-size: 16pt;
    background-color: #fffffff4;
    transition: all 0.5s ease; 
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    .chatTop{
        margin-top: 20px;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        .closeBtn{
            position: absolute;
            right: 10%;
        }
    }
    .chat-messages{
        width: 85%;
        height: 75%;
    }
}
</style>