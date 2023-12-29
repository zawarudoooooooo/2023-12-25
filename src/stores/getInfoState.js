import { defineStore } from "pinia";
import axios from 'axios';

export default defineStore("getInfoState", {
    state: () => ({
        // getChatRoom res
        foundChattedUserList: [],
        // in getChatRoom
        userInfo: {},
        // in getUsersDetail
        idsStr: "",
        // in getChatDetail
        roomObj: {},
        // getChatDetail res
        resMsg: [],
        // return full msg & sender info
        recordMsg: [],
    }),
    actions: {

        // ChatList.vue
        // 獲取該user曾經發送訊息的全部chat room
        getChatRooms(user){
            // reset the states
            this.userInfo = {};
            this.foundChattedUserList = [];

            this.userInfo = user;

            axios.get('http://localhost:8080/api/adoption/chat/get_chat_rooms', {
                params: {
                    userId: this.userInfo.userId
                }
            })
            .then(response => {
                console.log("get chat rooms list response", response.data);
                const dataList = response.data.chatRoomList;

                // 新增包含顯示名稱的roomName
                let roomArrIn = [];
                dataList.forEach(room => {
                    let newRoomObj = Object.assign({}, room, {roomName: ''}, {user: {id: 0}});
                    roomArrIn.push(newRoomObj);
                })
                console.log("new room list", roomArrIn)

                // 將私聊（只有兩個訂閱者）的頻道放到搜尋id的array
                let searchUserList = [];
                for(let i = 0; i < roomArrIn.length; i++){
                    const subArr = roomArrIn[i].subscriberList.split(',').map(id => id.trim())
                    if(subArr.length == 2){
                        for(let x = 0; x < 2; x++){
                            if(subArr[x] != this.userInfo.userId){
                                searchUserList.push(subArr[x]);
                                roomArrIn[i].user.id = subArr[x];
                            }
                        }
                    } else {
                        roomArrIn[i].roomName = roomArrIn[i].name;
                    }
                    this.foundChattedUserList.push(roomArrIn[i])
                }
                console.log("chatted", this.foundChattedUserList)

                // 搜尋全部私聊的對方userInfo
                if(searchUserList != []){
                    this.getUsersDetail(searchUserList);
                }
            })
            .catch(error => {
                console.error(error)
            })
        },

        // ChatList.vue
        // 獲取該user全部私聊room的對方user info
        getUsersDetail(ids){
            // reset the states
            this.idsStr = "";

            this.idsStr = ids.join(',');
            console.log("ids string", this.idsStr)

            axios.get('http://localhost:8080/api/adoption/userInfo/findAdopters', {
                params: {
                    idList: this.idsStr
                }
            })
            .then(response => {
                console.log("get users' detal", response.data);

                const resArrIn = response.data.voList;
                console.log("res array in", resArrIn)

                for(let x = 0; x < this.foundChattedUserList.length; x++){
                    let checkRoom = this.foundChattedUserList[x];
                    if(checkRoom.roomName == ""){
                        for(let y = 0; y < resArrIn.length; y++){
                            if(resArrIn[y].userInfo.userId == checkRoom.user.id){
                                checkRoom.roomName = resArrIn[y].userInfo.userName;
                                checkRoom.user = resArrIn[y].userInfo;
                            }
                        }
                    }
                }

                console.log(this.foundChattedUserList)
            })
            .catch(error => {
                console.error(error)
            })
        },


        // Chat.vue
        // 獲取chat messages的紀錄
        getChatDetail(obj){
            // reset the states
            this.roomObj = {};
            this.resMsg = [];
            this.idsStr = "";

            this.roomObj = obj;
            console.log("emit obj", this.roomObj)

            axios.get('http://localhost:8080/api/adoption/chat/get_messages',{
                params: {
                    userId: this.roomObj.user.userId,
                    chatRoomId: this.roomObj.room.chatRoomId
                }
            })
            .then(response => {
                console.log(response.data)
                // 暫存值
                this.resMsg = response.data.chatMsgList;
            })
            .catch(error => {
                console.error(error)
            })

            // get all the subscribers' info in the chat room
            this.idsStr = this.roomObj.room.subscriberList;
            this.getChatRoomUsersDetail();
        },

        // Chat.vue
        // 獲取該chat room中全部訂閱者的user info
        getChatRoomUsersDetail(){
            // reste the states
            this.recordMsg = [];
            
            console.log("ids string", this.idsStr)

            axios.get('http://localhost:8080/api/adoption/userInfo/findAdopters', {
                params: {
                    idList: this.idsStr
                }
            })
            .then(response => {
                console.log("get users' info in the chat room", response.data)
                const res = response.data.voList;

                this.resMsg.forEach(msg => {
                    for(let i = 0; i < res.length; i++){
                        let checkUser = res[i].userInfo
                        if(msg.sender == checkUser.userId){
                            let newMsgObj = Object.assign({}, msg, {user: checkUser})
                            this.recordMsg.push(newMsgObj)
                        }
                    }
                })
                console.log("record msg", this.recordMsg)
            })
            .catch(error => {
                console.error(error)
            })
        },
    },
});