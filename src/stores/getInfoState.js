import { defineStore } from "pinia";
import axios from 'axios';

export default defineStore("getInfoState", {

    state: () => ({
        // getChatRooms res
        foundChattedRoomList: [],
        // in getChatRooms
        userInfo: {},
        // getChatUsers res
        foundChattedUserList: [],
        // in getUsersDetail
        idsStr: "",
        // in getChatDetail
        roomObj: {},
        // getChatDetail res
        resMsg: [],
        // return full msg & sender info
        recordMsg: [],
        // return read record
        readRecord: {},
        // in readMessage
        receiver: 0,
        // in readMessage
        chatRoomId: "",
        // return readMessage()
        newChatUser: {},
        // return getNewChatRoom()
        newChatRoom: {},
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
        // ChatList.vue
        // 獲取該user曾經發送訊息的全部chat room
        getChatRooms(user){
            // reset the states
            this.userInfo = {};
            this.foundChattedRoomList = [];

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

                // 設立一個要獲取chat users的chat room id array
                let chatRoomIdArr = [];

                dataList.forEach(room => {
                    let newRoomObj = Object.assign({}, room, {roomName: ''}, {user: {id: 0}});
                    roomArrIn.push(newRoomObj);
                    // 新增chat room id 到chatRoomIdArr
                    chatRoomIdArr.push(room.chatRoomId)
                })
                // console.log("new room list", roomArrIn)

                // 獲取chat users
                this.getChatUsers(chatRoomIdArr);

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
                    this.foundChattedRoomList.push(roomArrIn[i])
                }
                // console.log("chatted", this.foundChattedRoomList)

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
            // console.log("ids string", this.idsStr)

            axios.get('http://localhost:8080/api/adoption/userInfo/findAdopters', {
                params: {
                    idList: this.idsStr
                }
            })
            .then(response => {
                // console.log("get users' detal", response.data);

                const resArrIn = response.data.voList;
                // console.log("res array in", resArrIn)

                for(let x = 0; x < this.foundChattedRoomList.length; x++){
                    let checkRoom = this.foundChattedRoomList[x];
                    if(checkRoom.roomName == ""){
                        for(let y = 0; y < resArrIn.length; y++){
                            if(resArrIn[y].userInfo.userId == checkRoom.user.id){
                                checkRoom.roomName = resArrIn[y].userInfo.userName;
                                checkRoom.user = resArrIn[y].userInfo;
                            }
                        }
                    }
                }
                // console.log(this.foundChattedRoomList)
            })
            .catch(error => {
                console.error(error)
            })
        },



        // chatList.vue
        // 獲取chat users（已讀紀錄）
        getChatUsers(ids){
            // reset the states
            this.foundChattedUserList = [];

            const idsStr = ids.join(',');

            axios.get('http://localhost:8080/api/adoption/chat/get_chat_users', {
                params: {
                    chatRoomIds: idsStr
                }
            })
            .then(response => {
                console.log("get chat users list response", response.data)
                this.foundChattedUserList = response.data.chatUserList;
            })
            .catch(error => {
                console.error(error)
            })
        },



        // Chat.vue
        // 獲取chat messages的全部紀錄
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
                this.resMsg = response.data.chatMsgList;
                // 取得已讀紀錄
                this.getReadRecord(this.roomObj.user.userId, this.roomObj.room.chatRoomId)
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

            // console.log("ids string", this.idsStr)

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
                // console.log("record msg", this.recordMsg)
            })
            .catch(error => {
                console.error(error)
            })
        },



        // 獲取已讀紀錄
        getReadRecord(userId, roomId){
            this.receiver = userId;
            this.chatRoomId = roomId;

            axios.get('http://localhost:8080/api/adoption/chat/get_chat_user', {
                params: {
                    chatRoomId: this.chatRoomId,
                    receiver: this.receiver
                }
            })
            .then( response => {
                console.log("read record res", response.data);
                this.readRecord = response.data.chatUser;
            })
            .catch( error => {
                console.error(error)
            })
        },

        // ChatList.vue
        // 設置 ChatUser 為已讀
        readMessage(userId, roomId){
            this.receiver = userId;
            this.chatRoomId = roomId;

            axios.post('http://localhost:8080/api/adoption/chat/read_message', {
                receiver: this.receiver,
                chatRoomId: this.chatRoomId
            })
            .then( response => {
                console.log("read msg res", response.data);
                this.newChatUser = response.data.chatUser;
                this.getNewChatRoom(this.chatRoomId);
            })
            .catch( error => {
                console.error(error)
            })
        },



        // Chat.vue
        // ChatList.vue
        // 以 chat room id 獲取最新的 message 紀錄
        getNewChatRoom(chatRoomId){
            this.chatRoomId = chatRoomId;

            axios.get('http://localhost:8080/api/adoption/chat/get_new_chat_room', {
                params: {
                    chatRoomId: chatRoomId
                }
            })
            .then( response => {
                console.log("new chat room res", response.data);
                this.newChatRoom = response.data.chatRoom;
            })
            .catch( error => {
                console.error(error)
            })
        }
    },
});