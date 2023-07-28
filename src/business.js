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

// 写日志数据
const addLog = (params) => {
    try {
        const { name, type, ip, content } = params;
        const sql = "INSERT INTO logs(name, type, ip, content) VALUES (?, ?, ?, ?)";
        sqlUtil.execute(sql, [name, type, ip, content]);
    } catch (error) {
        throw error;
    }
};

// 删除过期数据
const removeExpiredData = (date) => {
    try {
        const sql = `DELETE FROM logs WHERE create_time < ?`;
        const params = [date];
        sqlUtil.execute(sql, params);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    sendMsgToAll,
    addLog,
    removeExpiredData
};
