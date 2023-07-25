const express = require("express");
const sqlUtil = require("./tools/sqlUtil");
const {sendMsgToAll} = require("./business")

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
        fullFilled(response, "收到")
    } catch(error) {
        errorHandler(response, error);
    }
});

module.exports = router;
