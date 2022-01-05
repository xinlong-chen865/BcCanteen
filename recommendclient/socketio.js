let socketio = {}
let sqlQuery = require('./lcMysql')

function getSocket(server){
    socketio.io = require('socket.io')(server);
    let io = socketio.io;
    io.on('connection', function (socket) {
        console.log(socket.id+"建立连接")

        //接收登录事件
        socket.on('login',async function(userid) {
            // 更新socket_id
            let sqlStr = "update user set socket_id = ? ,is_online = ? where id = ?"
            await sqlQuery(sqlStr, [socket.id, 'true', userid])
            socket.emit('login',{
                state:'ok',
                content:"登录成功"
            })
        })
        // 断开链接
        socket.on('disconnect',async function() {
            //修改数据库登录信息（socketid,isonline）
            let sqlStr = "update user set socket_id=?,is_online=? where socket_id =?"
            await sqlQuery(sqlStr,[null, null, socket.id])
        })
        // 订单支付成功，提醒后台重新请求
        socket.on('paycomplete', async function(id) {
            // 先获取bus_id
            let sqlStr1 = "select business_id from can_order where id = ?"
            let res1 = await sqlQuery(sqlStr1, [id])
            // 看看在不在线
            let sqlStr2 = "select socket_id, username from user where id = ? and is_online = ?"
            let res2 = await sqlQuery(sqlStr2, [res1[0]['business_id'], 'true'])
            if (res2.length > 0) {
                //如果此人在线，那么直接发送消息；
                const toid = res2[0].socket_id;
                console.log('toid', toid)
                socket.to(toid).emit("accept", res2[0].username)
            } else {
                console.log('error', '商家不在线，不需要提醒了');
            }
        })
    })
}

socketio.getSocket = getSocket;
module.exports = socketio
