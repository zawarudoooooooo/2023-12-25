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

// Connection opened
wss.on('connection', (ws, req) => {
    console.log('[Client connected]')

    // Listen for msg from client
    ws.on('message', data => {
        const dataObj = JSON.parse(data)
        console.log('[Message from client]', dataObj)
        if(dataObj.type == 'user'){
            ws.user = dataObj.data;
            console.log(`[User ${ws.user.userId} connected]`)
        } else {
            // Get clients who connected
            let clients = wss.clients
            // Use loop for sending messages to each clients
            clients.forEach(client => {
                if (ws.user) {  // 添加一个检查确保 ws.user 已设置
                    client.send(`${ws.user.userName}: ` + data);
                } else {
                    console.error('User information not available.');
                }
            })
        }
        
    })

    // Connection closed
    ws.on('close', () => {
        console.log('[Close connected]')
    })
})