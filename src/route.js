const express = require("express");
const sqlUtil = require("./tools/sqlUtil");
const { sendMsgToAll } = require("./business");

const router = express.Router();

const getWsServer = (request) => request.app.get("wsServer");

// 响应处理
const fullFilled = (response, data, pagination) => {
    response.json({
        code: 0,
        data,
        pagination,
        msg: "成功"
    });
};

// route异常处理
const errorHandler = (response, err) => {
    response &&
        response.status(500).json({
            code: 1,
            msg: err.toString()
        });
};

// 处理特定路径的路由
router.get("/", (req, res) => {
    res.send("测试 " + Date.now());
});

// 处理接收的数据
router.post("/status/update", (request, response) => {
    try {
        console.info("接收到参数：", request.body);
        sendMsgToAll(
            getWsServer(request),
            JSON.stringify({
                type: "Task",
                message: request.body
            })
        );
        fullFilled(response, "收到");
    } catch (error) {
        errorHandler(response, error);
    }
});

// 查询日志
router.get("/logs", async (request, response) => {
    try {
        const { pageNo = 1, pageSize = 10, name = "" } = request.query;
        const num = parseInt(pageNo);
        const size = parseInt(pageSize);
        // 查询分页的数据
        const sql = `
        SELECT id, name, content, type, ip, content 
        FROM logs
        WHERE name LIKE ?
        OR type LIKE ?
        OR content LIKE ?
        OR create_time LIKE ?
        ORDER BY create_time DESC
        LIMIT ${size} OFFSET ${(num - 1) * size}`;
        const params = [`%${name}%`, `%${name}%`, `%${name}%`, `${name}%`];
        const query = sqlUtil.execute(sql, params);
        query.then(
            (value) => fullFilled(response, value),
            (error) => errorHandler(response, error)
        );
    } catch (error) {
        errorHandler(response, error);
    }
});

module.exports = router;
