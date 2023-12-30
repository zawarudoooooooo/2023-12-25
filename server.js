// import library
const express = require('express')
const ServerSocket = require('ws').Server   // 引用 Server

// 指定一個 port
const PORT = 8081

// 建立 express 物件並用來監聽 8080 port
const server = express()
    .listen(PORT, () => console.log(`[Server] Listening on https://localhost:${PORT}`))

// 建立實體，透過 ServerSocket 開啟 WebSocket 的服務
const wss = new ServerSocket({ server })

// 創建頻道的map
let channelMap = new Map();

// Connection opened
wss.on('connection', (ws, req) => {
    console.log('[Client connected]')

    let channelId;

    // Listen for msg from client
    ws.on('message', data => {
        const dataObj = JSON.parse(data)
        console.log('[Message from client]', dataObj)

        if(dataObj.type == 'user'){
            ws.user = dataObj.data;
            console.log(`[User ${ws.user.userId} connected]`)
        } else {
            // set channel id
            channelId = dataObj.chatRoomId;
            console.log("[Message from client] channel id: ", channelId)

            // if there's no the same channel id in the channelMap, add a set of it
            if(!channelMap.has(channelId)){
                channelMap.set(channelId, new Set())
            }

            // if the user's info hasn't added to the channel, add it
            const channelSet = channelMap.get(channelId);
            if(!channelSet.has(ws)){
                userJoinChannel(ws, channelId);
            }
            
            // send messages to all the subscribers of the chat room
            broadcastToChannel(channelId, dataObj.ent, ws.user.userId, dataObj.msg, dataObj.dateTime);
            // let clients = wss.clients
            // clients.forEach(client => {
            //     if (ws.user) {  // 添加一个检查确保 ws.user 已设置
            //         client.send(`${ws.user.userName}: ` + data);
            //     } else {
            //         console.error('User information not available.');
            //     }
            // })
        }
    })

    // Connection closed
    ws.on('close', () => {
        userLeaveChannel(ws, channelId);
        console.log('[Close connected]')
    })
})

// ============================================================

// user join
function userJoinChannel(ws, channelId){
    channelMap.get(channelId).add(ws);
}

// user leave
function userLeaveChannel(ws, channelId){
    if(channelMap.has(channelId) && channelMap.get(channelId)){
        channelMap.get(channelId).delete(ws);
    }
}

// broadcast to subscribers
function broadcastToChannel(channelId, entNum, senderId, message, timestamp) {
    channelMap.get(channelId).forEach(userSocket => {
        if (senderId) {
            let sendObj = { sender: senderId, ent: entNum, text: message, time: timestamp};
            console.log('[send] ', sendObj)
            userSocket.send(JSON.stringify(sendObj));
        } else {
            console.error('[User information not available.]');
        }
    });
}