var express = require('express');
var router = express.Router();
var sqlQuery = require('../../lcMysql.js');

/* 用户管理 */
router.get('/system',async function(req, res, next) {
    const searchData = req.query.searchData
    let sqlStr, result
    if (searchData) {
        sqlStr = `select id, stu_id, username, sex, header_img, time from user where username like "%${searchData}%"`;
        result = await sqlQuery(sqlStr);
    } else {
        sqlStr = 'select id, stu_id, username, sex, header_img, time from user';
        result = await sqlQuery(sqlStr);
    }
	res.append('Access-Control-Allow-Origin','*')
	res.append('Access-Control-Allow-Content-Type','*')
	res.json({
        state: 200,
        data: result
    });
});
/* 用户管理添加 */
router.post('/system/add',async function(req, res, next) {
    const stu_id = req.body.stu_id
    const username = req.body.username
    const sex = req.body.sex
    const password = 'admin'
    const header_img = 'https://img2.baidu.com/it/u=849177278,248626859&fm=26&fmt=auto'
    const time = new Date().getTime()
    let sqlStr_search = "select * from user where stu_id = ?"
    let result_search = await sqlQuery(sqlStr_search, [stu_id]);
    res.append('Access-Control-Allow-Origin','*')
	res.append('Access-Control-Allow-Content-Type','*')
    if (result_search.length > 0) {
        res.json({
            state: 200,
            data: {
                code: 500,
                message: '您的学号已经注册，不能重新注册'
            }
        });
    } else {
        let sqlStr_insert = "INSERT INTO user (stu_id, username, password, sex, header_img, time) VALUES (?, ?, ?, ?, ?, ?);"
        await sqlQuery(sqlStr_insert, [stu_id, username, password, sex, header_img, time]);
        res.json({
            state: 200,
            data: {
                code: 200,
                message: '添加成功'
            }
        })
    }
});
/* 用户管理修改 */
router.post('/system/update',async function(req, res, next) {
    const stu_id = req.body.stu_id
    const username = req.body.username
    const sex = req.body.sex
    let sqlStr = "UPDATE user SET username = ?, sex = ? WHERE stu_id = ?";
    await sqlQuery(sqlStr, [username, sex, stu_id]);
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
/* 用户管理删除 */
router.post('/system/delete',async function(req, res, next) {
    const id = req.body.id
    let sqlStr = "DELETE FROM user WHERE id = ?";
    await sqlQuery(sqlStr, [id]);
	res.append('Access-Control-Allow-Origin','*')
	res.append('Access-Control-Allow-Content-Type','*')
	res.json({
        state: 200,
        data: {
            code: 200,
            message: '删除成功'
        }
    });
});

/* 权限管理 */
router.get('/auth',async function(req, res, next) {
    const searchData = req.query.searchData
    let sqlStr, result
    if (searchData) {
        sqlStr = `select id, stu_id, username, header_img, time, status from user where username like "%${searchData}%"`;
        result = await sqlQuery(sqlStr);
    } else {
        sqlStr = 'select id, stu_id, username, header_img, time, status from user';
        result = await sqlQuery(sqlStr);
    }
    
	res.append('Access-Control-Allow-Origin','*')
	res.append('Access-Control-Allow-Content-Type','*')
	res.json({
        state: 200,
        data: result
    });
});
/* 权限管理修改 */
router.post('/auth/update',async function(req, res, next) {
    const id = req.body.id
    const status = req.body.status
    let sqlStr = "UPDATE user SET status = ? WHERE id = ?";
    await sqlQuery(sqlStr, [status, id]);
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

/* 商家信息查看 */
router.get('/information-view',async function(req, res, next) {
    const searchData = req.query.searchData
    console.log(searchData);
    let sqlStr, result
    if (searchData) {
        sqlStr = `select * from can_business where bus_name like "%${searchData}%"`;
        result = await sqlQuery(sqlStr);
    } else {
        sqlStr = 'select * from can_business';
        result = await sqlQuery(sqlStr);
    }
    
	res.append('Access-Control-Allow-Origin','*')
	res.append('Access-Control-Allow-Content-Type','*')
	res.json({
        state: 200,
        data: result
    });
});
/* 商家信息查看修改 */
router.post('/information-view/update',async function(req, res, next) {
    const id = req.body.id
    const floor_id = req.body.floor_id
    const category_id = req.body.category_id
    const bus_name = req.body.bus_name
    const bus_phone = req.body.bus_phone
    const bus_people = req.body.bus_people
    const bus_address = req.body.bus_address
    let sqlStr = "UPDATE can_business SET floor_id = ?, category_id = ?, bus_name = ?, bus_phone = ?, bus_people = ?, bus_address = ? WHERE id = ?";
    await sqlQuery(sqlStr, [floor_id, category_id, bus_name, bus_phone, bus_people, bus_address, id]);
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

/* 评价查看 */
router.get('/evaluation-view',async function(req, res, next) {
    sqlStr = 'select ce.id, content, cb.bus_name from can_evaluate ce join can_business cb on ce.business_id = cb.id ';
    result = await sqlQuery(sqlStr);
    
    
	res.append('Access-Control-Allow-Origin','*')
	res.append('Access-Control-Allow-Content-Type','*')
	res.json({
        state: 200,
        data: result
    });
});

/* 审核新用户 */
router.get('/audit-newuser',async function(req, res, next) {
    const searchData = req.query.searchData
    let sqlStr, result
    if (searchData) {
        sqlStr = `select id, stu_id, username, header_img, time, status from user where username like "%${searchData}%" and status = 3`;
        result = await sqlQuery(sqlStr);
    } else {
        sqlStr = 'select id, stu_id, username, header_img, time, status from user where status = 3';
        result = await sqlQuery(sqlStr);
    }
    
	res.append('Access-Control-Allow-Origin','*')
	res.append('Access-Control-Allow-Content-Type','*')
	res.json({
        state: 200,
        data: result
    });
});
/* 审核新用户修改 */
router.post('/audit-newuser/update',async function(req, res, next) {
    const id = req.body.id
    const status = req.body.status
    let sqlStr = "UPDATE user SET status = ? WHERE id = ?";
    await sqlQuery(sqlStr, [status, id]);
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

/* 购买统计查看 */
router.post('/purchase-statistics',async function(req, res, next) {
    const filterData = req.body.filterData
    let sqlStr, result
    const merge_obj = {
        bus_name: [],
        bus_sales: []
    }
    const dict = {
        1: [0, 100],
        2: [100, 300],
        3: [300, 800],
        4: [800, 100000],
    }

    if (filterData.floor_id !== 0 && filterData.sales === 0 && filterData.category_id === 0) {
        sqlStr = `select id, bus_name, bus_sales from can_business where floor_id = ? order by bus_sales desc limit 10`;
        result = await sqlQuery(sqlStr, [filterData.floor_id]);
    } else if (filterData.category_id !== 0 && filterData.sales === 0 && filterData.floor_id === 0) {
        sqlStr = `select id, bus_name, bus_sales from can_business where category_id = ? order by bus_sales desc limit 10`
        result = await sqlQuery(sqlStr, [filterData.category_id]);
    } else if (filterData.sales !== 0 && filterData.category_id === 0 && filterData.floor_id === 0) {
        sqlStr = `select * from can_business where bus_sales between ? and ? order by bus_sales desc limit 10`
        result = await sqlQuery(sqlStr, [dict[filterData.sales][0], dict[filterData.sales][1]]);
    } else if (filterData.sales !== 0 && filterData.category_id !== 0 && filterData.floor_id === 0) {
        sqlStr = `select * from can_business where category_id = ? AND bus_sales between ? and ? order by bus_sales desc limit 10`
        result = await sqlQuery(sqlStr, [filterData.category_id, dict[filterData.sales][0], dict[filterData.sales][1]]);
    } else if (filterData.sales !== 0 && filterData.category_id === 0 && filterData.floor_id !== 0) {
        sqlStr = `select * from can_business where floor_id = ? AND bus_sales between ? and ? order by bus_sales desc limit 10`
        result = await sqlQuery(sqlStr, [filterData.floor_id, dict[filterData.sales][0], dict[filterData.sales][1]]);
    } else if (filterData.sales === 0 && filterData.category_id !== 0 && filterData.floor_id !== 0) {
        sqlStr = `select * from can_business where floor_id = ? AND category_id = ? order by bus_sales desc limit 10`
        result = await sqlQuery(sqlStr, [filterData.floor_id, filterData.category_id]);
    } else if (filterData.sales !== 0 && filterData.category_id !== 0 && filterData.floor_id !== 0) {
        sqlStr = `select * from can_business where floor_id = ? AND category_id = ? AND bus_sales between ? and ? order by bus_sales desc limit 10`
        result = await sqlQuery(sqlStr, [filterData.floor_id, filterData.category_id, dict[filterData.sales][0], dict[filterData.sales][1]]);
    } else {
        sqlStr = 'select id, bus_name, bus_sales from can_business order by bus_sales desc limit 10';
        result = await sqlQuery(sqlStr);
    }

    for (let index = 0; index < result.length; index++) {
        const element = result[index];
        merge_obj.bus_name.push(element.bus_name);
        merge_obj.bus_sales.push(element.bus_sales);
    }
	res.append('Access-Control-Allow-Origin','*')
	res.append('Access-Control-Allow-Content-Type','*')
	res.json({
        state: 200,
        data: result,
        merge_obj
    });
});

/* 购买统计查看 */
router.post('/traffic-analysis',async function(req, res, next) {
    const filterData = req.body.filterData
    let sqlStr, result
    const merge_obj = {
        bus_name: [],
        bus_pageview: []
    }
    const dict = {
        1: [0, 2000],
        2: [2000, 8000],
        3: [8000, 15000],
        4: [15000, 100000],
    }

    if (filterData.floor_id !== 0 && filterData.sales === 0 && filterData.category_id === 0) {
        sqlStr = `select id, bus_name, bus_pageview from can_business where floor_id = ? order by bus_pageview desc limit 10`;
        result = await sqlQuery(sqlStr, [filterData.floor_id]);
    } else if (filterData.category_id !== 0 && filterData.sales === 0 && filterData.floor_id === 0) {
        sqlStr = `select id, bus_name, bus_pageview from can_business where category_id = ? order by bus_pageview desc limit 10`
        result = await sqlQuery(sqlStr, [filterData.category_id]);
    } else if (filterData.sales !== 0 && filterData.category_id === 0 && filterData.floor_id === 0) {
        sqlStr = `select id, bus_name, bus_pageview from can_business where bus_pageview between ? and ? order by bus_pageview desc limit 10`
        result = await sqlQuery(sqlStr, [dict[filterData.sales][0], dict[filterData.sales][1]]);
    } else if (filterData.sales !== 0 && filterData.category_id !== 0 && filterData.floor_id === 0) {
        sqlStr = `select id, bus_name, bus_pageview from can_business where category_id = ? AND bus_pageview between ? and ? order by bus_pageview desc limit 10`
        result = await sqlQuery(sqlStr, [filterData.category_id, dict[filterData.sales][0], dict[filterData.sales][1]]);
    } else if (filterData.sales !== 0 && filterData.category_id === 0 && filterData.floor_id !== 0) {
        sqlStr = `select id, bus_name, bus_pageview from can_business where floor_id = ? AND bus_pageview between ? and ? order by bus_pageview desc limit 10`
        result = await sqlQuery(sqlStr, [filterData.floor_id, dict[filterData.sales][0], dict[filterData.sales][1]]);
    } else if (filterData.sales === 0 && filterData.category_id !== 0 && filterData.floor_id !== 0) {
        sqlStr = `select id, bus_name, bus_pageview from can_business where floor_id = ? AND category_id = ? order by bus_pageview desc limit 10`
        result = await sqlQuery(sqlStr, [filterData.floor_id, filterData.category_id]);
    } else if (filterData.sales !== 0 && filterData.category_id !== 0 && filterData.floor_id !== 0) {
        sqlStr = `select id, bus_name, bus_pageview from can_business where floor_id = ? AND category_id = ? AND bus_pageview between ? and ? order by bus_pageview desc limit 10`
        result = await sqlQuery(sqlStr, [filterData.floor_id, filterData.category_id, dict[filterData.sales][0], dict[filterData.sales][1]]);
    } else {
        sqlStr = 'select id, bus_name, bus_pageview from can_business order by bus_pageview desc limit 10';
        result = await sqlQuery(sqlStr);
    }

    for (let index = 0; index < result.length; index++) {
        const element = result[index];
        merge_obj.bus_name.push(element.bus_name);
        merge_obj.bus_pageview.push(element.bus_pageview);
    }
	res.append('Access-Control-Allow-Origin','*')
	res.append('Access-Control-Allow-Content-Type','*')
	res.json({
        state: 200,
        data: result,
        merge_obj
    });
});

/* 菜品管理 */
router.get('/dish-management',async function(req, res, next) {
    const searchData = req.query.searchData
    let sqlStr, business_result

    if (searchData) {
        sqlStr = `select id, bus_name, bus_phone, bus_people from can_business where bus_name like "%${searchData}%"`;
        business_result = await sqlQuery(sqlStr);
    } else {
        // sqlStr = 'select cg.id, bus_id, goods_name, price, goods_img, goods_total, cb.bus_name from can_goods cg join can_business cb on cg.bus_id = cb.id ';
        sqlStr = 'select id, bus_name, bus_phone, bus_people  from can_business'
        business_result = await sqlQuery(sqlStr);
    }

    const goods_list = [];

    for (let index = 0; index < business_result.length; index++) {
        const { id: bus_id, bus_name, bus_phone, bus_people  } = business_result[index];
        const sqlStr2 = 'select id, goods_name, price, goods_img, goods_total from can_goods where bus_id = ?'
        const goods_result = await sqlQuery(sqlStr2, [bus_id]);
        goods_list.push({
            bus_id,
            bus_name,
            bus_phone, 
            bus_people, 
            childList: goods_result
        })
    }


	res.append('Access-Control-Allow-Origin','*')
	res.append('Access-Control-Allow-Content-Type','*')
	res.json({
        state: 200,
        data: goods_list
    });
});
/* 菜品管理修改 */
router.post('/dish-management/update',async function(req, res, next) {
    const id = req.body.id
    const goods_name = req.body.goods_name
    const price = req.body.price
    const goods_total = req.body.goods_total
    let sqlStr = "UPDATE can_goods SET goods_name = ?, price = ?, goods_total = ? WHERE id = ?";
    await sqlQuery(sqlStr, [goods_name, price, goods_total, id]);
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

// router.get('/handler-goods',async function(req, res, next) {
//     const searchData = req.query.searchData
//     function getRandomNumberByRange(start, end) { return Math.floor(Math.random() * (end - start) + start) }
//     let sqlStr

//     for (let index = 0; index < 934; index++) {
//         const count = getRandomNumberByRange(80, 2000)
//         sqlStr = "UPDATE can_goods SET goods_total = ? WHERE id = ?";
//         result = await sqlQuery(sqlStr, [count, index]);
//     }


// 	res.append('Access-Control-Allow-Origin','*')
// 	res.append('Access-Control-Allow-Content-Type','*')
// 	res.json({
//         state: 200
//     });
// });

module.exports = router;