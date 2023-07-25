const WebSocket = require("ws");
const sqlUtil = require("./tools/sqlUtil");

// 向所有客户端发送消息
const sendMsgToAll = (wsServer, msg) => {
    // 发送消息给所有连接的WebSocket客户端
    wsServer.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(msg);
        }
    });
};

module.exports = {
    sendMsgToAll
};
