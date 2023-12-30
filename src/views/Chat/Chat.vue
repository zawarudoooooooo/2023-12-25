<script>
import ProfileDashBoard from '../../components/profiledashboard.vue';
import ChatList from '../../components/ChatList.vue';
import axios from 'axios';
import { mapState, mapGetters, mapActions } from "pinia";
import getInfoState from '../../stores/getInfoState';

export default{
    data(){
        return{
            connected: false,
            socket: null,
            chatRoom: {},
            userInfo: {},
            messages: [],
            sendMsg: "",
            chatUserList: null,
            isShowChat: false,
            // connect
            isRead: false,
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

            console.log('[open connection]');
            // Listen for messages from Server
            this.socket.onmessage = event => {
                console.log(`[Message from Server]:\n %c${event.data}`, 'color: blue');
                // 將新訊息添加到dateCount
                this.dateCountAdd(event.data)
            };
            this.connect()
        })

        console.log("date time", this.currentDateTime)

        // 使scroll保持在底部
        this.$refs.scrollContainer.scrollTop = this.$refs.scrollContainer.scrollHeight;
    },

    watch: {
        dateCount: {
            handler(newDateCount, oldDateCount) {
                console.log('dateCount changed', newDateCount);
                this.dateCount == newDateCount;
                // 使scroll保持在底部
                this.$refs.scrollContainer.scrollTop = this.$refs.scrollContainer.scrollHeight;
            },
            // deep: true, // 深度監視對象的變化
        },
    },

    computed: {
        ...mapState(getInfoState, ['recordMsg']),
        ...mapGetters(getInfoState, ['currentDateTime']),

        dateCount(){
            // 使用 reduce 进行分组
            // acc：key的日期
            // item：原本的recordMsg for each
            const groupedData = this.recordMsg.reduce((acc, item) => {
                // 提取日期和时间
                const [date, time] = item.timeStamp.split('T');
                const sendTime = time.slice(0, 5); // 提取小时和分钟，格式为 HH:mm

                // 检查是否已存在以该日期为键的数组
                if (!acc[date]) {
                    acc[date] = [];
                }

                // 添加 sendTime 字段
                const newItem = { ...item, sendTime };

                // 将新的项推入数组
                acc[date].push(newItem);

                return acc;
            }, {});

            // console.log("group data", groupedData)
            this.messages = groupedData;
            return groupedData;
        }
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
            this.socket.send(JSON.stringify({chatRoomId: this.chatRoom.room.chatRoomId, ent: this.chatRoom.room.ent, msg: this.sendMsg, dateTime: this.currentDateTime, subscribers: this.chatRoom.room.subscriberList}));

            const dateTime =  new Date(this.currentDateTime);

            axios.post('http://localhost:8080/api/adoption/chat/create_message', {
                sender: this.userInfo.userId,
                text: JSON.stringify(this.sendMsg),
                chatRoomId: this.chatRoom.room.chatRoomId,
                timeStamp: dateTime.toISOString(),
            })
            .then(response => {
                console.log("response", response.data);
                this.sendMsg = "";
            })
            .catch(error => {
                console.error(error)
            })
        },

        disconnect() {
            this.socket.close()
            // 在關閉連線時執行
            this.socket.onclose = () => console.log('[close connection]')
        },

        getChatDetailFromPinia(obj){
            this.chatRoom = obj;
            console.log("get chat room from pinia", this.chatRoom)
            // pinia: get the records of the chat
            this.getChatDetail(obj);
            this.isShowChat = true;
        },

        dateCountAdd(data){
            // 設置server.js返回的data為item
            const item = JSON.parse(data);
            console.log(item)
            // 提取日期和时间
            const [date, time] = item.time.split(' ');
            const sendTime = time.slice(0, 5); // 提取小时和分钟，格式为 HH:mm

            // 检查是否已存在以该日期为键的数组
            if (!this.messages[date]) {
                this.$set(this.messages[date] = []);
            }

            // 設置新訊息
            const newItem = { ...item, sendTime };

            // 将新的项推入数组
            this.messages[date].push(newItem);
            console.log("new dateCount", this.messages)
        }
    }
}
</script>


<template>
<div class="content">
    <!-- 側邊功能區 -->
    <div class="dashBoardArea">
        <!-- <ProfileDashBoard /> -->
        <ChatList @chatReq="getChatDetailFromPinia"/>
    </div>

    <!-- 主顯示頁面 -->
    <div class="showBoard">
        <!-- test chat -->
        <div v-show="connected" class="chatRoomArea">

            <!-- <h4>聊聊</h4> -->
            <h2 v-if="!isShowChat">未選擇聊天室</h2>
            <h4 v-else>{{ chatRoom.room.roomName }}</h4>

            <div v-show="isShowChat" class="chatShowArea" ref="scrollContainer">
                <div class="chatDate" v-for="(msgArr, date) in messages">
                    <p class="date">{{ date }}</p>

                    <div class="chat" v-for="(msg, index) in msgArr">

                        <!-- chat -->
                        <div v-if="msg.ent == 1" class="chat-messages">
                            <!-- 自己的 -->
                            <div v-if="msg.sender == userInfo.userId" class="showMe" :key="index">
                                <div class="check">
                                    <span class="msgRead" v-if="isRead">已讀</span>
                                    <span class="msgTime">{{ msg.sendTime }}</span>
                                </div>
                                <span class="msgMe">{{ msg.text.replace(/^"|"$/g, '') }}</span>
                            </div>

                            <!-- 對方的 -->
                            <div v-else class="showUser" :key="index + msg.sender">
                                <img class="showUserImg" :src="'data:image/jpeg;base64,' + msg.user.userPhoto" alt="">
                                <span class="msg">{{ msg.text.replace(/^"|"$/g, '') }}</span>
                                <div class="time">
                                    <span class="msgTime">{{ msg.sendTime }}</span>
                                </div>
                            </div>
                        </div>

                        <!-- group -->
                        <div v-if="msg.ent == 2" class="chat-messages">
                            <!-- 自己的 -->
                            <div v-if="msg.sender == userInfo.userId" class="showMe" :key="index">
                                <div class="check">
                                    <span class="msgRead" v-if="isRead">已讀</span>
                                    <span class="msgTime">{{ msg.sendTime }}</span>
                                </div>
                                <span class="msgMe">{{ msg.text.replace(/^"|"$/g, '') }}</span>
                            </div>

                            <!-- 其他人的 -->
                            <div v-else class="showUser" :key="index + msg.sender">
                                <img class="showUserImg" :src="'data:image/jpeg;base64,' + msg.user.userPhoto" alt="">
                                <div class="ShowNameAndAccount">
                                    <p class="showText">{{ msg.user.userName }}</p>
                                    <p class="showText">@{{ msg.user.account }}</p>
                                </div>
                                <span class="msg">{{ msg.text.replace(/^"|"$/g, '') }}</span>
                                <span class="msgTime">{{ msg.sendTime }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- send mssage -->
            <div v-show="isShowChat" class="sendMsgArea">
                <input class="msgInput" type="text" id="sendMsg" placeholder="請輸入訊息" v-model="sendMsg" @keyup.enter="sendMessage">
                <button class="noStyleBtn" id="sendBtn" @click="sendMessage">
                    <i class="fa-solid fa-paper-plane"></i>
                </button>
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

.chatRoomArea{
    width: 90%;
    height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    .chatShowArea{
        width: 70%;
        height: 80vh;
        overflow: scroll;
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 2px solid #cfcccc;
        border-radius: 20px;
        padding-top: 30px;
        .chatDate{
            width: 90%;
            height: auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            .date{
                margin-bottom: 10px;
            }
            .chat{
                width: 100%;
                height: 50px;
                .chat-messages{
                    width: 100%;
                    height: 50px;
                    display: flex;
                    .showMe{
                        width: 100%;
                        height: auto;
                        display: flex;
                        justify-content: end;
                        align-items: center;
                        transition: all 0.3s ease;
                        margin-bottom: 20px;
                        .check{
                            width: auto;
                            height: 35px;
                            position: relative;
                            margin-right: 5px;
                            .msgRead{
                                width: 50px;
                                display: flex;
                                justify-content: end;
                                font-size: 10pt;
                                position: absolute;
                                top: 0px;
                                right: 0px;
                            }
                            .msgTime{
                                font-size: 10pt;
                                position: absolute;
                                bottom: 0px;
                                right: 0px;
                            }
                        }
                        
                        .msgMe{
                            width: auto;
                            height: 30px;
                            background-color: #f1e2bd;
                            border-radius: 20px;
                            padding: 10px 20px 10px 20px;
                            display: flex;
                            align-items: center;
                            font-size: 16pt;
                        }
                    }
                    .showUser{
                        width: 100%;
                        height: auto;
                        display: flex;
                        align-items: center;
                        transition: all 0.3s ease;
                        margin-bottom: 20px;
                        .showUserImg{
                            width: 40px;
                            height: 40px;
                            border-radius: 50%;
                            object-fit: contain;
                            object-position: center;
                            overflow: hidden;
                            border-radius: 50%;
                            margin-right: 10px;
                        }
                        .ShowNameAndAccount{
                            color: #978989;
                            font-size: 12pt;
                            .showText{
                                margin: 0px;
                                font-size: 16pt;
                            }
                        }
                        .msg{
                            width: auto;
                            height: 30px;
                            background-color: $primaryBgc;
                            border-radius: 20px;
                            padding: 10px 20px 10px 20px;
                            display: flex;
                            align-items: center;
                            font-size: 16pt;
                        }
                        .time{
                            width: auto;
                            height: 30px;
                            position: relative;
                            margin-left: 5px;
                            .msgTime{
                                font-size: 10pt;
                                position: absolute;
                                bottom: 0px;
                                left: 0px;
                            }
                        }
                    }
                }
            }
        }
        
        
    }
    .sendMsgArea{
        width: auto;
        height: 50px;
        border-radius: 20px;
        padding: 10px;
        display: flex;
        align-items: center;
        position: relative;
        .msgInput{
            width: 30vw;
            display: inline-block;
        }
        .noStyleBtn{
            color: $primary;
            font-size: large;
            background-color: transparent;
            border: none;
            transition: all 0.3s ease;
            position: absolute;
            right: 15px;
            &:hover{
                color: #ebc26f;
            }
        }
    }
}
</style>