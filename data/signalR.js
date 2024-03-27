import * as signalR from "@microsoft/signalr";

const connection = new signalR.HubConnectionBuilder()
.withUrl("https://localhost:7048/chatHub", {
    skipNegotiation: true,
    transport: signalR.HttpTransportType.WebSockets,
})
.configureLogging(signalR.LogLevel.Information)
.build();

export default connection;