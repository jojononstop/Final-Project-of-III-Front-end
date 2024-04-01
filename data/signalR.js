// data/signalR.js 文件
import * as signalR from "@microsoft/signalr";
import { VueCookieNext as $cookie } from 'vue-cookie-next';


let connectionInstance = null;

export default function startConnection() {
    if (!connectionInstance) {
        let userId;
        userId = $cookie.getCookie('Id');
        connectionInstance = new signalR.HubConnectionBuilder()
        .withUrl(`https://localhost:7048/chatHub?userId=${userId}`, {
            skipNegotiation: true,
            transport: signalR.HttpTransportType.WebSockets,
        })
        .configureLogging(signalR.LogLevel.Information)
        .build();

        connectionInstance.start().then(() => {
            console.log('SignalR 成功連線');
        }).catch(err => {
            console.error('SignalR connection failed:', err.toString());
        });
        
        connectionInstance.on('userconnected', (ConnectionId) => {
            console.log('新使用者已連接：', ConnectionId);
            console.log('新使用者ID：', ConnectionId.ConnectionId);
        });
        connectionInstance.on('userdisconnected', (ConnectionId) => {
            console.log('使用者已離線：', ConnectionId);
            console.log('離線使用者ID：', ConnectionId.ConnectionId);
        });
    }

    return connectionInstance;
}
