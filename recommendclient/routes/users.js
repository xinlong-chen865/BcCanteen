var express = require('express');
var router = express.Router();
var sqlQuery = require('../lcMysql.js');

/* GET users listing. */
router.post('/login',async function(req, res, next) {
  let username = req.body.username;
  let password = req.body.password;
  let sqlStr = 'select * from user where username = ? and password = ?'
  let result = await sqlQuery(sqlStr,[username, password]);
  res.append('Access-Control-Allow-Origin','*')
  res.append('Access-Control-Allow-Content-Type','*')
  if(result.length > 0){
	 res.json({
		 state:200,
		 content:'登陆成功',
		 userInfo:result[0]
	 });
  }else{
	  res.json({
	  		 state:501,
	  		 content:'用户名或密码错误'
	});
  }
  
});

module.exports = router;
