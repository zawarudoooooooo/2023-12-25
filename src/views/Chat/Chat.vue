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

            // 在连接打开时执行
            console.log('[open connection]');
            // Listen for messages from Server
            this.socket.onmessage = event => {
                console.log(`[Message from Server]:\n %c${event.data}`, 'color: blue');
                // 将消息添加到数组中
                recordMsg.push(event.data)
            };
            this.connect()
        })
        

        // 接收来自客户端的消息
        this.socket.addEventListener('message', (event) => {
            // const data = JSON.parse(event)
            console.log('[Message from Server]', event.data);
            // 将消息添加到数组中
            this.recordMsg.push(event.data);
        });
    },

    computed: {
        ...mapState(getInfoState, ['recordMsg']),

        dateCount(){
            // 使用 reduce 进行分组
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

            console.log(groupedData)
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
            this.socket.send(JSON.stringify(this.sendMsg))

            axios.post('http://localhost:8080/api/adoption/chat/create_message', {
                sender: this.userInfo.userId,
                text: JSON.stringify(this.sendMsg),
                chatRoomId: this.chatRoom.room.chatRoomId
            })
            .then(response => {
                console.log("response", response.data)
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
            console.log(this.chatRoom)
            // pinia: get the records of the chat
            this.getChatDetail(obj);
            this.isShowChat = true;
        },
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
        <div v-if="this.connected" class="chatRoomArea">

            <!-- <h4>聊聊</h4> -->
            <h2 v-show="!this.isShowChat">未選擇聊天室</h2>
            <h4 v-show="this.isShowChat">{{ chatRoom.room.roomName }}</h4>

            <div v-show="this.isShowChat" class="chatShowArea">
                <div class="chatDate" v-for="(msgArr, date) in dateCount">
                    <h6>{{ date }}</h6>

                    <div class="chat" v-for="(msg, index) in msgArr">
                        
                        <!-- chat -->
                        <div v-if="msg.ent == 1" class="chat-messages">
                            <div v-if="msg.sender == userInfo.userId" class="showMe" :key="index">
                                <div class="check">
                                    <span class="msgRead" v-if="isRead">已讀</span>
                                    <span class="msgTime">{{ msg.sendTime }}</span>
                                </div>
                                <span class="msgMe">{{ msg.text.replace(/^"|"$/g, '') }}</span>
                            </div>

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
                            <div v-if="msg.sender == userInfo.userId" class="showMe" :key="index">
                                <div class="check">
                                    <span class="msgRead" v-if="isRead">已讀</span>
                                    <span class="msgTime">{{ msg.sendTime }}</span>
                                </div>
                                <span class="msgMe">{{ msg.text.replace(/^"|"$/g, '') }}</span>
                            </div>

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
            <div v-show="this.isShowChat" class="sendMsgArea">
                <span>新訊息: </span>
                <input class="msgInput" type="text" id="sendMsg" v-model="sendMsg" @keyup.enter="sendMessage">
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
        .msgInput{
            margin-left: 10px;
            margin-right: 15px;
        }
        .noStyleBtn{
            color: $primary;
            font-size: larger;
            background-color: transparent;
            border: none;
            transition: all 0.3s ease;
            &:hover{
                color: #ebc26f;
            }
        }
    }
}
</style>