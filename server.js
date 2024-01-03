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
        console.log('[data from client]', dataObj)

        if( dataObj.type == 'user' ){
            ws.user = dataObj.data;
            console.log(`[User ${ws.user.userId} connected]`)
        }
        
        if( dataObj.type == 'connect' ){
            console.log('[ws user] ', ws.user)
            // set channel id
            channelId = dataObj.data.chatRoomId;
            console.log("[channel id] ", channelId)

            // if there's no the same channel id in the channelMap, add a set of it
            if(!channelMap.has(channelId)){
                channelMap.set(channelId, new Set())
                console.log('[set the new channel] ', channelId)
            }

            // if the user's info hasn't added to the channel, add it
            const channelSet = channelMap.get(channelId);
            // const user = dataObj.data.user;
            if(!channelSet.has(ws.user)){
                userJoinChannel(ws, channelId);
                console.log('[add new user] ', ws.user)
            }
        }
        
        if( dataObj.type == 'sendMsg' ){
            broadcastToChannel(dataObj.data.chatRoomId, dataObj.data.ent, ws.user.userId, ws.user, dataObj.data.msg, dataObj.data.dateTime);
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
    const channelSet = channelMap.get(channelId);

    if(channelSet){
        channelSet.add(ws)
    } else {
        console.log('[user join channel error]')
    }

}

// user leave
function userLeaveChannel(ws, channelId){
    if(channelMap.has(channelId) && channelMap.get(channelId)){
        channelMap.get(channelId).delete(ws);
    }
}

// broadcast to subscribers
function broadcastToChannel(channelId, entNum, sender, user, message, timestamp) {
    const channelSet = channelMap.get(channelId);

    console.log(channelSet)

    if(channelSet){
        channelSet.forEach(userSocket => {
            if (sender) {
                let sendObj = {chatRoomId: channelId, sender: sender, ent: entNum, text: message, time: timestamp, user: user};
                console.log('[send] ', sendObj)
                userSocket.send(JSON.stringify(sendObj));
            } else {
                console.error('[User information not available.]');
            }
        });
    } else {
        console.log('[broadcast error]')
    }
}