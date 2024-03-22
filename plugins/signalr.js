// plugins/signalr.js

import * as signalR from "@microsoft/signalr";

export default defineNuxtPlugin((nuxtApp) => {

const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:7048/chatHub", {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
    })
    .configureLogging(signalR.LogLevel.Information)
    .build();

connection.start().then(() => {
    console.log('SignalR 成功連線');
}).catch(err => {
    console.error('SignalR connection failed:', err.toString());
});

connection.on('userconnected', (ConnectionId) => {
    // 在這裡處理從伺服器端接收到的通知
    console.log('新使用者已連接：', ConnectionId);
    console.log('新使用者ID：', ConnectionId.ConnectionId);
});
connection.on('userdisconnected', (ConnectionId) => {
    // 在這裡處理從伺服器端接收到的通知
    console.log('使用者已離線：', ConnectionId);
    console.log('離線使用者ID：', ConnectionId.ConnectionId);
});

  // 將SignalR連線注入到Vue實例中
  nuxtApp.provide('signalr', connection);

});