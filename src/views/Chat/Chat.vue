<script>
import ProfileDashBoard from '../../components/profiledashboard.vue';
import ChatList from '../../components/ChatList.vue';

export default{
    data(){
        return{
            connected: false,
            socket: null,
            userInfo: {},
            msg: "",
            messages: [],
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
            this.socket.send(JSON.stringify(this.msg))
        },

        disconnect() {
            this.socket.close()
            // 在關閉連線時執行
            this.socket.onclose = () => console.log('[close connection]')
        },
    }
}
</script>


<template>
<div class="content">
    <!-- 側邊功能區 -->
    <div class="dashBoardArea">
        <ProfileDashBoard />
        <ChatList />
    </div>

    <!-- 主顯示頁面 -->
    <div class="showBoard">
        <!-- test chat -->
        <div v-if="this.connected" class="chatArea">
            <button id="connect" @click="connect">connect</button>
            <button id="disconnect" @click="disconnect">disconnect</button>

            <div class="msg">
                <span>Message: </span>
                <input type="text" id="sendMsg" v-model="msg">
                <button id="sendBtn" @click="sendMessage">Send</button>
            </div>

            <div class="chat-messages">
                <div v-for="(message, index) in messages" :key="index">
                    {{ message }}
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
</style>