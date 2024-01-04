<script>
import axios from 'axios';
import { mapState, mapGetters, mapActions } from "pinia";
import getInfoState from '../stores/getInfoState';
import socketState from '../stores/socketState';

export default{
    data(){
        return{
            userInfo: {},
            msg: "",
            messages: [],
            showRoomName: "聊天室",
        }
    },

    props: [
        "room"
    ],

    mounted(){
        console.log("room",this.room)

        this.userInfo = JSON.parse(sessionStorage.getItem('foundUserInfo'));

        const subArr = this.room.subscriberList.split(',').map(id => id.trim())
        if(subArr.length == 2){
            for(let i = 0; i < 2; i++){
                if(subArr[i] != this.userInfo.userId){
                    this.getPetUser(subArr[i])
                }
            }
        } else {
            this.showRoomName = this.room.name;
        }

        console.log("date time", this.currentDateTime)

        // pinia: get the records of the chat
        const roomObj = Object.assign({}, {room: this.room}, {user: this.userInfo})
        this.getChatDetail(roomObj);

        // Listen for messages from Server
        this.socket.onmessage = event => {
            console.log(`[Message from Server]:\n %c${event.data}`, 'color: blue');
            // 將新訊息添加到dateCount
            this.dateCountAdd(event.data)
        };
    },

    computed: {
        ...mapState(getInfoState, ['recordMsg', 'readRecord']),
        ...mapState(socketState, ['socket']),
        ...mapGetters(getInfoState, ['currentDateTime']),
        
        dateCount(){
            // 尚未捕捉到pinia變數readRecord的值時，不執行
            // if(!this.readRecord || !this.readRecord.readTime){
            //     return;
            // }

            // const readTime = new Date(this.readRecord.readTime);
            // const formattedReadTime = readTime.toISOString();
            // console.log("formatted Read Time", formattedReadTime)

            // 使用 reduce 进行分组
            // acc：key的日期
            // item：原本的recordMsg for each
            const groupedData = this.recordMsg.reduce((acc, item) => {
                // 分開日期和時間
                const [date, time] = item.timeStamp.split('T');
                const sendTime = time.slice(0, 5); // 轉換小時和分鐘的格式為 HH:mm

                // 檢查是否已存在該日期的key值
                if (!acc[date]) {
                    acc[date] = [];
                }

                // 設置已讀或未讀
                // let isRead = false;
                // const timeStamp = new Date(item.timeStamp);
                // const formattedTimeStamp = timeStamp.toISOString();

                // if(formattedTimeStamp < formattedReadTime){
                //     isRead = true;
                // }

                // 添加 sendTime & 已讀未讀
                // const newItem = { ...item, sendTime, isRead: isRead};
                const newItem = { ...item, sendTime, isRead: false};

                // 加入新的訊息到 acc[date]
                acc[date].push(newItem);

                return acc;
            }, {});

            // console.log("group data", groupedData)
            this.messages = groupedData;
            return groupedData;
        }
    },

    watch: {
        dateCount: {
            handler(newDateCount, oldDateCount) {
                // console.log('dateCount changed', newDateCount);

                // 聊天紀錄載入完成後，使scroll保持在底部
                this.$nextTick( event => {
                    this.$refs.scrollContainer.scrollTop = this.$refs.scrollContainer.scrollHeight;
                });
            },
        },

        messages: {
            handler(newMessages, oldMessages){
                // console.log('msg added', newMessages);
                this.messages = newMessages;

                // 聊天紀錄更新後，使scroll保持在底部
                this.$nextTick( event => {
                    this.$refs.scrollContainer.scrollTop = this.$refs.scrollContainer.scrollHeight;
                });
            }
        }
    },

    methods: {
        ...mapActions(socketState, ['connectServer','connectChannel', 'sendMessage']),
        ...mapActions(getInfoState, ['getChatDetail', 'getReadRecord', 'readMessage']),

        sendMessageByPinia(){
            // pinia WebSocket: send message
            const data = {
                chatRoomId: this.room.chatRoomId,
                ent: this.room.ent,
                msg: this.msg,
                dateTime: this.currentDateTime,
                subscribers: this.room.subscriberList
            }
            this.sendMessage(data, this.userInfo)

            // pinia WebSocket: 標示為已讀
            this.readMessage(this.userInfo.userId, this.room.chatRoomId)

            // 清空input
            this.msg = "";
        },

        closeChat(){
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

        dateCountAdd(data){
            const item = JSON.parse(data);
            // 提取日期和时间
            const [date, time] = item.time.split(' ');
            const sendTime = time.slice(0, 5); // 提取小时和分钟，格式为 HH:mm

            // 检查是否已存在以该日期为键的数组
            if (!this.messages[date]) {
                // this.$set(this.messages[date] = []);
                this.messages[date] = [];
            }

            // 設置新訊息
            const newItem = { ...item, sendTime };

            // 将新的项推入数组
            this.messages[date].push(newItem);
            console.log("new dateCount", this.messages)

            // 新訊息送出後，使scroll保持在底部
            this.$nextTick( event => {
                this.$refs.scrollContainer.scrollTop = this.$refs.scrollContainer.scrollHeight;
            });
        }
    }
}
</script>


<template>
<div class="showContent">
    <!-- 主顯示頁面 -->
    <div class="showChat">
        <!-- chat -->
        <div class="chatArea">
            <div class="chatTop">
                <h3>{{ this.showRoomName }}</h3>
                <button type="button" class="btn-close closeBtn" @click="closeChat"></button>
            </div>


            <!-- 聊天紀錄 -->
            <div class="chatShowArea" ref="scrollContainer">
                <div class="chatDate" v-for="(msgArr, date) in messages">
                    <p class="date">{{ date }}</p>

                    <div class="chat" v-for="(msg, index) in msgArr">

                        <!-- chat -->
                        <div v-if="msg.ent == 1" class="chat-messages">
                            <!-- 自己的 -->
                            <div v-if="msg.sender == userInfo.userId" class="showMe" :key="index">
                                <div class="check">
                                    <span class="msgRead" v-if="msg.isRead">已讀</span>
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
                                    <span class="msgRead" v-if="msg.isRead">已讀</span>
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
            <div class="sendMsgArea">
                <input class="msgInput" type="text" id="sendMsg" placeholder="請輸入訊息" v-model="msg" @keyup.enter="sendMessageByPinia">
                <button class="noStyleBtn" id="sendBtn" @click="sendMessageByPinia">
                    <i class="fa-solid fa-paper-plane"></i>
                </button>
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
    justify-content: center;
    padding: 20px;
    .chatArea{
        width: 90%;
        height: 95%;
        display: flex;
        flex-direction: column;
        align-items: center;
        .chatTop{
            width: 100%;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            .closeBtn{
                position: absolute;
                right: 0px;
            }
        }
        .chatShowArea{
            width: 100%;
            height: 75%;
            overflow-y: scroll;
            display: flex;
            flex-direction: column;
            align-items: center;
            border: 2px solid #cfcccc;
            border-radius: 20px;
            padding-top: 30px;
            margin-bottom: 10px;
            .chatDate{
                width: 90%;
                height: auto;
                display: flex;
                flex-direction: column;
                align-items: center;
                .date{
                    font-size: 14pt;
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
                                font-size: 14pt;
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
                                    font-size: 14pt;
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
            width: 80%;
            height: 50px;
            border-radius: 20px;
            padding: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            .msgInput{
                width: 100%;
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
}
</style>