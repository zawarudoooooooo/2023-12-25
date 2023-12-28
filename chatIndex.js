var ws

// 監聽 click 事件
document.querySelector('#connect')?.addEventListener('click', (e) => {
    console.log('[click connect]')
    connect()
})

document.querySelector('#disconnect')?.addEventListener('click', (e) => {
    console.log('[click disconnect]')
    disconnect()
})

document.querySelector('#sendBtn')?.addEventListener('click', (e) => {
    const msg = document.querySelector('#sendMsg')
    sendMessage(msg?.value)
})

function connect() { 
    // Create WebSocket connection
    ws = new WebSocket('ws://localhost:8080') 
    // 在開啟連線時執行
    ws.onopen = () => {
        console.log('[open connection]')
        // Listen fro messages from Server
        ws.onmessage = event => {
            console.log(`[Message from Server]:\n %c${event.data}`, 'color: blue')
        }
    }
}

// Listen for msg from Server
function sendMessage(msg){
    // send msg to Server
    ws.send(msg)
}

function disconnect() {
    ws.close()
    // 在關閉連線時執行
    ws.onclose = () => console.log('[close connection]')
}