<script>
import ProfileDashBoard from '../../components/profiledashboard.vue';
// import ChatList from '../../components/ChatList.vue';

export default {
    data() {
        return {
            connected: false,
            socket: null,
            userInfo: {},
            msg: "",
            messages: [],

            myMessages: [],    // 我的消息陣列

            otherMessages: [],  // 別人的消息陣列

            otherUserInfo: {
                name: "小明",
                avatar: '../../../public/image_1702533447389.jpg',
            },
            latestMessage: "", // 存储最新的对话内容
            showChatWindow: false, // 控制對話視窗的顯示與隱藏

            flowerUserInfo: {
                name: "小花",
                avatar: '../../../public/image_1702988491705.jpg',
            },
            latestFlowerMessage: "", // 存儲最新的對話內容
            showFlowerChatWindow: false, // 控制小花對話視窗的顯示與隱藏
            flowerMessages: [], // 小花的消息陣列
            flowerMsg: "",  // 確保初始化
        }
    },
    created() {
        // 模擬一些小明的聊天紀錄
        this.messages = [
            { content: "嗨，你好！", owner: "我", timestamp: new Date(2023, 0, 1, 10, 0, 0) },
            { content: "嗨！你好！", owner: "小明", timestamp: new Date(2023, 0, 1, 10, 2, 0) },
            { content: "有什麼新鮮事嗎？", owner: "我", timestamp: new Date(2023, 0, 1, 10, 5, 0) },
            { content: "不錯，最近很忙碌。", owner: "小明", timestamp: new Date(2023, 0, 1, 10, 7, 0) },
            { content: "你喜歡什麼類型的書？", owner: "我", timestamp: new Date(2023, 0, 1, 10, 10, 0) },
            { content: "我喜歡讀小說，特別是科幻小說。", owner: "小明", timestamp: new Date(2023, 0, 1, 10, 12, 0) }
        ];

        // 模擬一些與小花的對話紀錄
        this.flowerMessages = [
            { content: "嗨，你好！", owner: "我", timestamp: new Date(2023, 0, 1, 12, 0, 0) },
            { content: "你好啊！", owner: "小花", timestamp: new Date(2023, 0, 1, 12, 2, 0) },
            { content: "最近過得如何？", owner: "我", timestamp: new Date(2023, 0, 1, 12, 5, 0) },
            { content: "嗯，還不錯。", owner: "小花", timestamp: new Date(2023, 0, 1, 12, 7, 0) },
            { content: "你喜歡哪種花朵？", owner: "我", timestamp: new Date(2023, 0, 1, 12, 10, 0) },
            { content: "我最喜歡玫瑰花！", owner: "小花", timestamp: new Date(2023, 0, 1, 12, 12, 0) },
        ];

        // 为每条消息添加一个时间戳
        this.messages.forEach(message => {
            message.timestamp = new Date(message.timestamp);
        });

        // 根據留言時間排序
        this.messages.sort((a, b) => a.timestamp - b.timestamp);

        // 分類為 myMessages 和 otherMessages
        this.myMessages = this.messages.filter(message => message.owner === "我");
        this.otherMessages = this.messages.filter(message => message.owner === "小明");

        // 设置最新对话内容
        this.latestMessage = this.otherMessages.length > 0
            ? this.otherMessages[this.otherMessages.length - 1].content
            : "";

        // 设置最新小花的对话内容
        this.latestFlowerMessage = this.flowerMessages.length > 0
            ? this.flowerMessages[this.flowerMessages.length - 1].content
            : "";
    },

    components: {
        ProfileDashBoard,
        // ChatList
    },

    mounted() {
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
        handleNewMessage(message) {
            if (message.owner === "我") {
                this.myMessages.push(message);
            } else {
                this.otherMessages.push(message);
            }

            // 根據留言時間排序
            this.myMessages.sort((a, b) => a.timestamp - b.timestamp);
            this.otherMessages.sort((a, b) => a.timestamp - b.timestamp);

            // 设置最新对话内容
            this.latestMessage = message.content;

        },


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
        sendMessage() {
            // send msg to Server
            this.socket.send(JSON.stringify(this.msg))
        },

        disconnect() {
            this.socket.close()
            // 在關閉連線時執行
            this.socket.onclose = () => console.log('[close connection]')
        },
        adjustTextareaHeight() {
            const textarea = this.$refs.textarea;
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        },

        insertNewLine(event) {
            if (event.key === 'Enter' && event.shiftKey) {
                this.msg += '\n';
                this.adjustTextareaHeight();
            }
        },
        formatTimestamp(timestamp) {
            const options = { hour: 'numeric', minute: 'numeric' };
            return new Intl.DateTimeFormat('en-US', options).format(timestamp);
        },
        //發送消息
        sendMessage() {
            // 确保消息不为空
            if (this.msg.trim() === "") {
                return;
            }

            // 创建消息对象
            const newMessage = {
                content: this.msg.trim(),
                owner: "我",
                timestamp: new Date(),
            };

            // 发送消息到服务器
            this.socket.send(JSON.stringify(newMessage));

            // 将消息添加到数组中
            this.messages.push(newMessage);
            this.myMessages.push(newMessage);

            // 清空输入框
            this.msg = "";

            // 滚动到最新消息
            this.$nextTick(() => {
                const chatContainer = this.$refs.chatContainer;
                chatContainer.scrollTop = chatContainer.scrollHeight;
            });
        },
        // 顯示小明的對話視窗
        showChatWithOtherUser() {
            // 关闭小花的聊天窗口
            this.showFlowerChatWindow = false;

            // 显示小明的聊天窗口
            this.showChatWindow = true;

            // 滚动到最新消息
            this.$nextTick(() => {
                const chatContainer = this.$refs.chatContainer;
                chatContainer.scrollTop = chatContainer.scrollHeight;
            });
        },

        // 關閉對話視窗
        closeChatWindow() {
            this.showChatWindow = false;
        },
        // 點擊小花頭像時顯示小花的對話窗口
        showChatWithFlower() {
            // 关闭小明的聊天窗口
            this.showChatWindow = false;

            // 显示小花的聊天窗口
            this.showFlowerChatWindow = true;
            // 滾動到最新消息
            this.$nextTick(() => {
                const flowerChatContainer = this.$refs.flowerChatContainer;
                flowerChatContainer.scrollTop = flowerChatContainer.scrollHeight;
            });

        },


        // 關閉小花的對話窗口
        closeFlowerChatWindow() {

            // 關閉小花的對話窗口
            this.showFlowerChatWindow = false;
        },

        // 發送消息給小花
        sendFlowerMessage() {
            // 确保消息不为空
            if (this.flowerMsg.trim() === "") {
                return;
            }
            // 創建消息對象
            const newMessage = {
                content: this.flowerMsg.trim(),
                owner: "我",
                timestamp: new Date(),
            };

            // 將消息發送到小花的對話室
            this.flowerMessages.push(newMessage);

            // 清空輸入框
            this.flowerMsg = "";

            // 滾動到最新消息
            this.$nextTick(() => {
                const flowerChatContainer = this.$refs.flowerChatContainer;
                flowerChatContainer.scrollTop = flowerChatContainer.scrollHeight;
            });
        }
    }
}
</script>


<template>
    <div class="content">
        <!-- 側邊功能區 -->
        <div class="dashBoardArea">
            <ProfileDashBoard />
            <!-- <ChatList /> -->
            <div class="chatList">
                <span>聊聊列表</span>
                <!-- 显示小明的头像和最新对话 -->
                <div class="contact" @click="showChatWithOtherUser">
                    <img :src="otherUserInfo.avatar" alt="小明头像" class="avatar">
                    <div class="info">
                        <div class="name">{{ otherUserInfo.name }}</div>
                        <div class="latest-message">{{ latestMessage }}</div>
                    </div>
                </div>
                <!-- 在側邊功能區的聊聊列表中新增小花的頭像和最新對話 -->
                <div class="contact" @click="showChatWithFlower">
                    <img :src="flowerUserInfo.avatar" alt="小花頭像" class="avatar">
                    <div class="info">
                        <div class="name">{{ flowerUserInfo.name }}</div>
                        <div class="latest-message">{{ latestFlowerMessage }}</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 主顯示頁面 -->
        <div class="showBoard">
            MB測試用
            <!-- 小明的視窗 -->
            <div v-if="connected && showChatWindow" class="chatArea">
                <div class="chatTop">
                    <div class="avatar">
                        <img :src="otherUserInfo.avatar" alt="小明头像">
                    </div>
                    <div class="name">{{ otherUserInfo.name }}</div>
                    <i class="fa-solid fa-xmark" @click="closeChatWindow"></i>
                </div>
                <div class="chat-messages-container" ref="chatContainer">
                    <div v-for="message in messages" :key="message.timestamp"
                        :class="[message.owner === '我' ? 'my-message' : 'other-message']">
                        <div v-if="message.owner !== '小明'" class="read-status">已讀</div>
                        <div v-if="message.owner !== '我'" class="avatar">
                            <img src="../../../public/image_1702533447389.jpg" alt="">
                        </div>
                        <div class="message-content">
                            <span>{{ message.owner === '我' ? '' : avatar }}</span>{{ message.content }}
                            <span class="timestamp">{{ formatTimestamp(message.timestamp) }}</span>
                        </div>
                    </div>
                </div>
                <div class="chatLast">
                    <div class="msg">
                        <textarea name="" id="sendMsg" v-model="msg" @input="adjustTextareaHeight"
                            @keydown.enter.shift.prevent="insertNewLine" rows="1" ref="textarea"></textarea>
                        <button id="sendBtn" @click="sendMessage">Send</button>
                    </div>


                </div>
            </div>
            <!-- 在主顯示頁面中新增小花的對話窗口 -->
            <div v-if="connected && showFlowerChatWindow" class="chatArea">
                <div class="chatTop">
                    <div class="avatar">
                        <img :src="flowerUserInfo.avatar" alt="小花頭像">
                    </div>
                    <div class="name">{{ flowerUserInfo.name }}</div>
                    <i class="fa-solid fa-xmark" @click="closeFlowerChatWindow"></i>
                </div>
                <div class="chat-messages-container" ref="flowerChatContainer">
                    <div v-for="message in flowerMessages" :key="message.timestamp"
                        :class="[message.owner === '我' ? 'my-message' : 'other-message']">
                        <!-- 顯示小花的對話內容 -->
                        <div v-if="message.owner !== '小花'" class="read-status">已讀</div>
                        <div v-if="message.owner !== '我'" class="avatar">
                            <img :src="flowerUserInfo.avatar" alt="">
                        </div>
                        <div class="message-content">
                            <span>{{ message.owner === '我' ? '' : flowerUserInfo.name }}</span>{{ message.content }}
                            <span class="timestamp">{{ formatTimestamp(message.timestamp) }}</span>
                        </div>
                    </div>
                </div>
                <div class="chatLast">
                    <div class="msg">
                        <!-- 發送消息給小花的輸入框和按鈕 -->
                        <textarea name="" id="sendFlowerMsg" v-model="flowerMsg" @input="adjustTextareaHeight"
                            @keydown.enter.shift.prevent="insertNewLine" rows="1" ref="textarea"></textarea>
                        <button id="sendFlowerBtn" @click="sendFlowerMessage">Send</button>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
@import '../../assets/RStyle.scss';

.content {
    background-color: $primaryBgc;

    .chatList {
        margin-top: 2vh;
        width: 15vw;
        height: 30vh;
        box-shadow: 0 0 3px 0.5px;
        border-radius: 0.5vw;
        background-color: #fff;

        span {
            font-size: 16pt;
            display: flex;
            justify-content: center;
        }

        .contact {
            display: flex;
            align-items: center;
            padding: 10px;
            cursor: pointer;
            transition: background-color 0.3s;

            &:hover {
                background-color: #f2f2f2;
            }

            .avatar {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                margin-right: 10px;
                overflow: hidden;
            }

            .info {
                flex-grow: 1;
                overflow: hidden;

                .name {
                    font-weight: bold;
                }

                .latest-message {
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    color: #666;
                }
            }

        }
    }
}

.chatArea {
    width: 20vw;
    height: 50vh;
    position: fixed;
    top: 47%;
    left: 68%;
    z-index: 10;
    transition: all 0.3s ease;
    border: 3px solid;
    border-radius: 15px 15px 0 0;
    background-color: #fff;

    .chatTop {
        width: 100%;
        height: 40px;
        background-color: #E9D2A6;
        border-radius: 15px 15px 0 0;
        position: relative;
        display: flex;
        align-items: center;
        padding: 5px;

        .avatar {
            background-color: #fff;
            border: 2px solid #000;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            overflow: hidden;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        .name {
            margin-left: 10px;
            font-weight: bold;
            color: black;
        }

        .fa-xmark {
            margin-left: 13vw;
            color: #525252;
            font-size: 1.5vw;

            &:hover {
                cursor: pointer;
            }
        }
    }

    .chat-messages-container {
        overflow-y: auto; // 允许垂直滚动
        height: 34.5vh; // 设置最大高度
        display: flex;
        flex-direction: column; // 让消息从上到下显示
        gap: 5px; // 调整消息之间的间距

        .my-message,
        .other-message {
            max-width: 70%; // 调整消息的最大宽度
            padding: 8px;
            border-radius: 8px;
            margin-bottom: 5px;
            word-wrap: break-word; // 长消息自动换行
            color: #000;

            .avatar {
                border: 2px solid;
                width: 30px;
                /* 调整头像的大小 */
                height: 30px;
                border-radius: 50%;
                /* 将头像切割成圆形 */
                position: absolute;
                left: -1.9vw;

                img {
                    width: 100%;
                    height: 100%;
                }

            }

            .read-status {
                position: absolute;
                bottom: 1vw;
                left: -2vw;
                font-size: 0.8em;
                color: #737373;
            }

            span {
                font-weight: bold;
                margin-right: 5px;
            }



        }

        .my-message {
            align-self: flex-end; // 自己的消息显示在右边
            background-color: #a6e3a6; // 自己的消息背景颜色
            position: relative;

            .timestamp {
                color: #727272; // 使用灰色或適合的顏色
                font-size: 0.7em; // 調整字體大小
                position: absolute;
                bottom: 0;
                left: -3vw;
            }
        }

        .other-message {
            align-self: flex-start; // 别人的消息显示在左边
            background-color: #d9d9d9; // 别人的消息背景颜色
            margin-left: 50px;
            position: relative;

            .timestamp {
                color: #727272; // 使用灰色或適合的顏色
                font-size: 0.7em; // 調整字體大小
                position: absolute;
                bottom: 0;
                right: -3vw;
            }

        }
    }


    .chatLast {
        display: flex;
        flex-direction: column-reverse; // 让消息从底部开始显示

        textarea {
            width: 17vw;
            height: auto;
            max-height: 10vh; // 设置 textarea 的最大高度
            resize: none;
            overflow-y: scroll;
            outline: none;
            position: absolute;
            bottom: 0;

        }

        button {
            background-color: #c5a66b;
            color: white;
            font-weight: 700;
            position: absolute;
            bottom: 0;
            right: 0;
        }
    }


}
</style>