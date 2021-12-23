var express = require('express');
var router = express.Router();
var sqlQuery = require('../lcMysql.js');

/* 用户登录 */
router.post('/login',async function(req, res, next) {
  let username = req.body.username;
  let password = req.body.password;
  let sqlStr = 'select * from user where username = ? and password = ?'
  let result = await sqlQuery(sqlStr,[username, password]);
  // 不发密码
  delete result[0].password;
  res.append('Access-Control-Allow-Origin','*')
  res.append('Access-Control-Allow-Content-Type','*')
  if(result.length > 0){
	 res.json({
		 state:200,
		 content:'登陆成功',
		 userInfo: result[0]
	 });
  }else{
	  res.json({
	  		 state:501,
	  		 content:'用户名或密码错误'
	  });
  }
});
/* 用户退出 */
router.post('/logout', function(req, res, next) {
  res.append('Access-Control-Allow-Origin','*')
  res.append('Access-Control-Allow-Content-Type','*')
  res.json({
    state: 200,
    data: 'success'
  });
})
/* 获取用户信息 */
router.get('/info',async function(req, res, next) {
  const token = req.query.token;
  let sqlStr = 'select username, header_img, status from user where stu_id = ?';
  let result = await sqlQuery(sqlStr, [token]);
  res.append('Access-Control-Allow-Origin','*')
  res.append('Access-Control-Allow-Content-Type','*')
  res.json({
    state: 200,
    data: result
  });
});

module.exports = router;
