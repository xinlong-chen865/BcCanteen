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

/* 个性化推荐 */
router.post('/recommend', async (req, res, next) => {
	const userId = req.body.userId;
    let sqlStr, result

    sqlStr = 'select * from user_footprint where user_id = ?';
    result = await sqlQuery(sqlStr, [userId]);

	res.append('Access-Control-Allow-Origin','*')
	res.append('Access-Control-Allow-Content-Type','*')

	if (result.length === 0) {
		res.json({
			state: 200,
			data: [],
		});
	}

	// 权重
    let footprintList = [];

    for (const item of result) {
        const index = footprintList.findIndex(v => v.bus_id === item.bus_id);
        if (index === -1) {
            const obj = {
                count: 1,
                bus_id: item.bus_id,
            }
            footprintList.push(obj);
        } else {
            footprintList[index].count++
        }
    }
	footprintList = footprintList.sort((a, b) => b.count - a.count);

	let sqlStr2, result2;

	sqlStr2 = 'select * from can_business';
	result2 = await sqlQuery(sqlStr2);

	for (const it of footprintList) {
		const index = result2.findIndex(v => v.id == it.bus_id);
		if (index !== -1) {
			it['bus_address'] = result2[index]['bus_address'] || '';
			it['bus_img'] = result2[index]['bus_img'] || '';
			it['bus_name'] = result2[index]['bus_name'] || '';
		}
	}


	res.json({
        state: 200,
        data: footprintList
    });
})

/** 新用户进来的 爱好选择 */
router.post('/newUserEnter', async (req, res) => {
	const userId = req.body.userId;
	let sqlStr, result

    sqlStr = 'select hobby_category_id, hobby_vector_id from user where id = ?';
    result = await sqlQuery(sqlStr, [userId]);

	res.append('Access-Control-Allow-Origin','*')
	res.append('Access-Control-Allow-Content-Type','*')
	console.log(result[0]['hobby_category_id']);

	// 选择过的
	if (result[0]['hobby_category_id'] || result[0]['hobby_vector_id']) {
		res.json({
			state: 200,
			data: {
				isChoose: true,
			},
		});
	} else {
		res.json({
			state: 200,
			data: {
				isChoose: false,
			},
		});
	}
	
});
/** 新用户进来的 提交向量化指数 */
router.post('/newUserEnter/update', async (req, res) => {
	const userId = req.body.userId;
	const hobby_category_id = req.body.hobby_category_id;
	const hobby_vector_id = req.body.hobby_vector_id;
	let sqlStr

    sqlStr = "UPDATE user SET hobby_category_id = ?, hobby_vector_id = ? WHERE id = ?";
    await sqlQuery(sqlStr, [hobby_category_id, hobby_vector_id, userId]);
	
	res.append('Access-Control-Allow-Origin','*')
	res.append('Access-Control-Allow-Content-Type','*')
	res.json({
		state: 200,
		message: '成功',
	});
});

router.post('/userProfile/recommend', async (req, res) => {
	const userId = req.body.userId;
	res.append('Access-Control-Allow-Origin','*')
	res.append('Access-Control-Allow-Content-Type','*')
	try {
		const sqlStr = "SELECT hobby_category_id, hobby_vector_id FROM user WHERE id = ?";
		const result = await sqlQuery(sqlStr, [userId]);
		const { hobby_category_id, hobby_vector_id } = result[0];
		const hobby_category_arr = hobby_category_id.split(',').map(it => Number(it));

		const sqlStr2 = "SELECT * FROM can_business";
		let businessList = await sqlQuery(sqlStr2);
		businessList = businessList.sort((a, b) => Math.abs(a.bus_vector - hobby_vector_id) - Math.abs(b.bus_vector - hobby_vector_id));
		
		const sqlStr3 = 'SELECT * FROM can_goods WHERE bus_id = ? ORDER BY goods_total DESC LIMIT 0,3'
		businessList = await Promise.all(
			businessList.map(it => {
			  return (async () => {
				console.log(it);
				let goodsList = await sqlQuery(sqlStr3, [it.id]);
				return {
					...it,
					childList: goodsList.slice()
				}
			  })();
			}),
	 	);

		const prev = [];
		const next = [];
		
		businessList.forEach(element => {
			// console.log(element.category_id, hobby_category_arr);
			if (hobby_category_arr.includes(element.category_id)) {
				prev.push(element);
			} else {
				next.push(element);
			}
		});
		res.json({
			state: 200,
			data: [...prev, ...next],
			message: '成功',
		});
	} catch (error) {
		console.log(error);
		res.json({
			state: 501,
			data: [],
			message: '失败',
		});
	}
	
});


module.exports = router;
