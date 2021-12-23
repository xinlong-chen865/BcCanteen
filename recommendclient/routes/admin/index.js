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

module.exports = router;