var express = require('express');
var router = express.Router();
var sqlQuery = require('../../lcMysql.js');

class Tools {
    handleTime(type, time) {
        if (type === 'month') {
            return new Date(time).getMonth() + 1
        } else if (type === 'day') {
            return new Date(time).getDate()
        } else {
            return new Date(time).getHours()
        }
    }
}
const tools = new Tools()

/* 订单管理 */
router.post('/order-application',async function(req, res, next) {
    const userId = req.body.userId;
    let sqlStr, result;
    sqlStr = 'select co.id, user_id, co.goods_id, order_sum, order_price, createTime, cg.goods_name, cg.goods_img, u.stu_id, u.username, u.header_img, u.sex, u.address from can_order co join can_goods cg on co.goods_id = cg.id join user u on co.user_id = u.id where order_status = 2 and business_id = ? order by createTime desc';
    result = await sqlQuery(sqlStr, [userId]);

    const orderList = [];
    for (const item of result) {
        const index = orderList.findIndex(v => v.id === item.id);
        if (index > -1) {
            orderList[index].childList.push({
                goods_id: item.goods_id,
                order_sum: item.order_sum,
                goods_name: item.goods_name,
                goods_img: item.goods_img
            })
        } else {
            const obj = {
                id: item.id,
                user_id: item.user_id,
                order_price: item.order_price,
                createTime: item.createTime,
                stu_id: item.stu_id,
                username: item.username,
                header_img: item.header_img,
                sex: item.sex,
                address: item.address,
                childList: [{
                    goods_id: item.goods_id,
                    order_sum: item.order_sum,
                    goods_name: item.goods_name,
                    goods_img: item.goods_img
                }]
            }
            orderList.push(obj);
        }
    }

	res.append('Access-Control-Allow-Origin','*')
	res.append('Access-Control-Allow-Content-Type','*')
	res.json({
        state: 200,
        data: orderList
    });
});
/* 订单管理接单 */
router.post('/order-application/update',async function(req, res, next) {
    const id = req.body.id
    let sqlStr = "UPDATE can_order SET order_status = 3 WHERE id = ?";
    await sqlQuery(sqlStr, [id]);
	res.append('Access-Control-Allow-Origin','*')
	res.append('Access-Control-Allow-Content-Type','*')
	res.json({
        state: 200,
        data: {
            code: 200,
            message: '接单成功'
        }
    });
});

router.post('/order-desc',async function(req, res, next) {
    const userId = req.body.userId;
    let sqlStr, result;
    sqlStr = 'select co.id, user_id, co.goods_id, order_sum, order_price, createTime, cg.goods_name, cg.goods_img, u.stu_id, u.username, u.header_img, u.sex, u.phone, u.address from can_order co join can_goods cg on co.goods_id = cg.id join user u on co.user_id = u.id where order_status = 3 and business_id = ?';
    result = await sqlQuery(sqlStr, [userId]);

    const orderList = [];
    for (const item of result) {
        const index = orderList.findIndex(v => v.id === item.id);
        if (index > -1) {
            orderList[index].childList.push({
                goods_id: item.goods_id,
                order_sum: item.order_sum,
                goods_name: item.goods_name,
                goods_img: item.goods_img
            })
        } else {
            const obj = {
                id: item.id,
                user_id: item.user_id,
                order_price: item.order_price,
                createTime: item.createTime,
                stu_id: item.stu_id,
                username: item.username,
                header_img: item.header_img,
                sex: item.sex,
                phone: item.phone,
                address: item.address,
                childList: [{
                    goods_id: item.goods_id,
                    order_sum: item.order_sum,
                    goods_name: item.goods_name,
                    goods_img: item.goods_img
                }]
            }
            orderList.push(obj);
        }
    }

	res.append('Access-Control-Allow-Origin','*')
	res.append('Access-Control-Allow-Content-Type','*')
	res.json({
        state: 200,
        data: orderList
    });
});

/* 收入查看 */
router.post('/revenue-view',async function(req, res, next) {
    const bus_id = req.body.bus_id
    const type = req.body.type
    let sqlStr, result

    sqlStr = 'select * from can_order where business_id = ?';
    result = await sqlQuery(sqlStr, [bus_id]);

    const orderList = [];

    for (const item of result) {
        const index = orderList.findIndex(v => v.createTime === tools.handleTime(type, Number(item.createTime)));
        if (index === -1) {
            const obj = {
                order_price: Number(item.order_price),
                createTime: tools.handleTime(type, Number(item.createTime)),
            }
            orderList.push(obj);
        } else {
            orderList[index].order_price += Number(item.order_price)
        }
    }
    orderList.sort((a, b) => a.createTime - b.createTime)

    const chartObj = {
        time: [],
        count: []
    }
    const unitObj = {
        month: '月',
        day: '号',
        time: '点'
    }
    orderList.map(item => {
        chartObj.time.push(item.createTime + unitObj[type])
        chartObj.count.push(item.order_price)
    })

	res.append('Access-Control-Allow-Origin','*')
	res.append('Access-Control-Allow-Content-Type','*')
	res.json({
        state: 200,
        data: chartObj
    });
});
module.exports = router;