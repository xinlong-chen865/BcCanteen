var express = require('express');
var router = express.Router();
var sqlQuery = require('../../lcMysql.js');


/* 获取分类logo */
router.get('/getCategoryLogo',async function(req, res, next) {
	let sqlStr = 'select * from can_category'
	let result = await sqlQuery(sqlStr);
	res.append('Access-Control-Allow-Origin','*')
	res.append('Access-Control-Allow-Content-Type','*')
	res.json(result);
});
/* 获取搜索的商家 */
router.get('/searchBusiness',async function(req, res, next) {
	let sqlStr = 'select * from can_business where bus_name LIKE "%'+ req.query.content +'%" ';
	let result = await sqlQuery(sqlStr);
	res.append('Access-Control-Allow-Origin','*')
	res.append('Access-Control-Allow-Content-Type','*')
	res.json(result);
});

/* 获取最新商家 */
router.get('/newBusinessList',async function(req, res, next) {
	let sqlStr = 'select * from can_business ORDER BY id DESC limit 0,6';
	let result = await sqlQuery(sqlStr);
	res.append('Access-Control-Allow-Origin','*')
	res.append('Access-Control-Allow-Content-Type','*')
	res.json(result);
});
/* 获取最热商家 */
router.get('/hotBusinessList',async function(req, res, next) {
	let sqlStr = 'select * from can_business ORDER BY bus_sales DESC limit 0,6';
	let result = await sqlQuery(sqlStr);
	res.append('Access-Control-Allow-Origin','*')
	res.append('Access-Control-Allow-Content-Type','*')
	res.json(result);
});
/* 获取分类的商家 */
router.get('/categoryBusinessList',async function(req, res, next) {
	let id = req.query.id;
	let sqlStr = 'select * from can_business where category_id=? order by bus_sales desc ';
	let result = await sqlQuery(sqlStr,[id]);
	res.append('Access-Control-Allow-Origin','*')
	res.append('Access-Control-Allow-Content-Type','*')
	res.json(result);
});
/* 获取层分类 */
router.get('/floorLists',async function(req, res, next) {
	let sqlStr = 'select * from can_floor';
	let result = await sqlQuery(sqlStr);
	res.append('Access-Control-Allow-Origin','*')
	res.append('Access-Control-Allow-Content-Type','*')
	res.json(result);
});
/* 根据层id获取每层的商家 */
router.get('/floorBusinessLists',async function(req, res, next) {
	let floor_id = req.query.floor_id;
	let sqlStr = 'select * from can_business where floor_id = ? order by bus_sales desc';
	let result = await sqlQuery(sqlStr,[floor_id]);
	res.append('Access-Control-Allow-Origin','*')
	res.append('Access-Control-Allow-Content-Type','*')
	res.json(result);
});
/* 通过商家id找到商家详情信息 */
router.get('/idToBusiness',async function(req, res, next) {
	let id = req.query.id;
	let sqlStr = 'select * from can_business where id = ?';
	let result = await sqlQuery(sqlStr,[id]);
	res.append('Access-Control-Allow-Origin','*')
	res.append('Access-Control-Allow-Content-Type','*')
	res.json(result);
});
/* 通过商家的id查can_goods表 */
router.get('/goodsLists',async function(req, res, next) {
	let bus_id = req.query.bus_id;
	let sqlStr = 'select * from can_goods where bus_id = ?';
	let result = await sqlQuery(sqlStr,[bus_id]);
	res.append('Access-Control-Allow-Origin','*')
	res.append('Access-Control-Allow-Content-Type','*')
	res.json(result);
});
/* 通过id获取菜品详情 */
router.get('/goodsDesc',async function(req, res, next) {
	let id = req.query.id;
	let sqlStr = 'select * from can_goods where id = ?';
	let result = await sqlQuery(sqlStr,[id]);
	res.append('Access-Control-Allow-Origin','*')
	res.append('Access-Control-Allow-Content-Type','*')
	res.json(result);
});
/* 生成订单 */
router.get('/insertOrder',async function(req, res, next) {
	let payId = req.query.payId;
	let user_id = req.query.user_id;
	let business_id = req.query.business_id;
	let id = req.query.id;
	let sum = req.query.sum;
	let all_price = req.query.all_price;
	let createTime = new Date().getTime()
	let sqlStr = 'Insert into can_order (id, user_id, business_id, goods_id, order_sum, order_price, order_status, createTime) values (?,?,?,?,?,?,?,?)';
	await sqlQuery(sqlStr, [payId, user_id, business_id, id, sum, all_price, 0, createTime])
});

/* 获取订单 */
router.get('/getOrder',async function(req, res, next) {
	let state = req.query.state;
	let userId = req.query.userId;
	res.append('Access-Control-Allow-Origin','*')
	res.append('Access-Control-Allow-Content-Type','*')
	if(!userId) {
		res.json({});
	} else {
		let sqlStr = 'select * from can_order where order_status = ? and user_id = ?';
		let result = await sqlQuery(sqlStr, [state, userId]);
		let filterObj = {};
		for(let i=0; i<result.length; i++) {
			let businessSqlStr = 'select bus_name from can_business where id = ? ';
			let goodsSqlStr = 'select goods_name from can_goods where id = ?';
			let businessRes = await sqlQuery(businessSqlStr, [result[i].business_id]);
			let goodsRes = await sqlQuery(goodsSqlStr, [result[i].goods_id]);
			if(filterObj[result[i].id]) {
				filterObj[result[i].id].goods_arr.push({
					'goods_name': goodsRes[0].goods_name,
					'order_sum': result[i].order_sum,
				})
			} else {
				filterObj[result[i].id] = {
					'business_name': businessRes[0].bus_name,
					'createTime': result[i].createTime,
					'order_price': result[i].order_price,
					'goods_arr': [{
						'goods_name': goodsRes[0].goods_name,
						'order_sum': result[i].order_sum,
					}]
				};
			}
		}
		res.json(filterObj);
	}
	
});

/* 添加收货地址 */
router.get('/info',async function(req, res, next) {
    const id = req.query.id
    const sqlStr = "select phone, address from user where id = ?";
    let result = await sqlQuery(sqlStr, [id]);
	res.append('Access-Control-Allow-Origin','*')
	res.append('Access-Control-Allow-Content-Type','*')
	res.json({
        state: 200,
        data: {
            phone: result[0].phone,
			address: result[0].address
        }
    });
});
/* 更新收货地址 */
router.post('/info/update',async function(req, res, next) {
    const id = req.body.id
    const phone = req.body.phone
	const address = req.body.address
    let sqlStr = "UPDATE user SET phone = ?, address = ? WHERE id = ?";
    await sqlQuery(sqlStr, [phone, address, id]);
	res.append('Access-Control-Allow-Origin','*')
	res.append('Access-Control-Allow-Content-Type','*')
	res.json({
        state: 200,
        data: {
            code: 200,
            message: '修改成功'
        }
    });
});

/* 成为商家 */
router.post('/join',async function(req, res, next) {
    const id = req.body.id
    let sqlStr = "UPDATE user SET status = 3 WHERE id = ?";
    await sqlQuery(sqlStr, [id]);
	res.append('Access-Control-Allow-Origin','*')
	res.append('Access-Control-Allow-Content-Type','*')
	res.json({
        state: 200,
        data: {
            code: 200,
            message: '修改成功'
        }
    });
});
/* 查看申请状态 */
router.post('/join/confirm',async function(req, res, next) {
    const id = req.body.id
    let sqlStr = "select status from user WHERE id = ?";
    const result = await sqlQuery(sqlStr, [id]);
	res.append('Access-Control-Allow-Origin','*')
	res.append('Access-Control-Allow-Content-Type','*')
	res.json({
        state: 200,
        data: {
            status: result[0].status
        }
    });
});

module.exports = router;
