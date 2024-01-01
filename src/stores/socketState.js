import { defineStore } from "pinia";
import axios from "axios";

export default defineStore("socketState", {
    state: () => ({
        socket: new WebSocket('ws://localhost:8081'),
        sendData: {},
        userInfo: {},
        connectChannelData: {},
        // update the last msg
        serverSendText: "",
    }),

    getters: {
        currentDateTime(state){
            const date = new Date();
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const seconds = date.getSeconds().toString().padStart(2, '0');

            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        }
    },

    actions: {
        // connect to WebSocket server
        connectServer(userInfo) {
            this.userInfo = userInfo;

            // 確認目前連線狀態
            if (this.socket.readyState === WebSocket.CONNECTING) {
                console.log('[WebSocket connection is in progress.]');
            } else if (this.socket.readyState === WebSocket.OPEN) {
                console.log('[sWebSocket connection is open and ready to communicate.]');
            } else if (this.socket.readyState === WebSocket.CLOSING) {
                console.log('[WebSocket connection is closing.]');
            } else if (this.socket.readyState === WebSocket.CLOSED) {
                console.log('[WebSocket connection is closed.]');
            }

            // WebSocket：連結 user
            const connectServerData = {
                type: 'user',
                data: this.userInfo
            }
            this.socket.send(JSON.stringify(connectServerData));

            // 在開啟連線時執行
            this.socket.onopen = () => {
                console.log('[open connection]')
                // Listen for messages from Server
                this.socket.onmessage = event => {
                    console.log(`[Message from Server]\n %c${event.data}`, 'color: blue')
                }
            }
        },

        // disconnect the WebSocket server
        disconnectServer() {
            this.socket.close()
            // 在關閉連線時執行
            this.socket.onclose = () => console.log('[close connection]')
        },

        // WebSocket：建立 channel
        connectChannel(data){
            this.connectChannelData = data;

            const connectServerData = {
                type: 'connect',
                data: {
                    chatRoomId: this.connectChannelData.chatRoomId,
                    ent: this.connectChannelData.ent,
                    subscribers: this.connectChannelData.subscriberList,
                }
            }
            
            this.socket.send(JSON.stringify(connectServerData));
        },

        // Listen for msg from Server
        sendMessage(data, user){
            this.sendData = data;
            this.userInfo = user;

            this.serverSendText = this.sendData.msg;

            // WebSocket：送出訊息
            const connectServerData = {
                type: 'sendMsg',
                data: {
                    chatRoomId: this.sendData.chatRoomId,
                    ent: this.sendData.ent,
                    msg: this.sendData.msg,
                    dateTime: this.sendData.dateTime,
                    subscribers: this.sendData.subscriberList
                }
            }
            this.socket.send(JSON.stringify(connectServerData));

            const dateTime =  new Date(this.currentDateTime);

            axios.post('http://localhost:8080/api/adoption/chat/create_message', {
                sender: this.userInfo.userId,
                text: this.sendData.msg,
                chatRoomId: this.sendData.chatRoomId,
                timeStamp: dateTime.toISOString(),
            })
            .then(response => {
                console.log("response", response.data);
            })
            .catch(error => {
                console.error(error)
            })
        },
    },
})