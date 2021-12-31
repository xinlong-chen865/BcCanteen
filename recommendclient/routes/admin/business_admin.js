var express = require('express');
var router = express.Router();
var sqlQuery = require('../../lcMysql.js');

/* 订单管理 */
router.post('/order-application',async function(req, res, next) {
    const userId = req.body.userId;
    console.log(userId);
    let sqlStr, result;
    sqlStr = 'select co.id, user_id, co.goods_id, order_sum, order_price, createTime, cg.goods_name, cg.goods_img, u.stu_id, u.username, u.header_img, u.sex from can_order co join can_goods cg on co.goods_id = cg.id join user u on co.user_id = u.id where order_status = 2 and business_id = ?';
    result = await sqlQuery(sqlStr, [userId]);
    console.log(result);

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
    console.log(userId);
    let sqlStr, result;
    sqlStr = 'select co.id, user_id, co.goods_id, order_sum, order_price, createTime, cg.goods_name, cg.goods_img, u.stu_id, u.username, u.header_img, u.sex from can_order co join can_goods cg on co.goods_id = cg.id join user u on co.user_id = u.id where order_status = 3 and business_id = ?';
    result = await sqlQuery(sqlStr, [userId]);
    console.log(result);

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

module.exports = router;