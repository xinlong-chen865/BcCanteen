let mysql = require('mysql')

let options = {
    //host:'localhost',
	host:'bj-cynosdbmysql-grp-8spvtql6.sql.tencentcdb.com',
    port:'27333',
    user:'root',
    password:'cxl20000427@',
    database:'aroundapp'
}
//���ص�
let localOptions = {
    host:'localhost',
    user:'root',
    password:'123456',
    database:'aroundapp'
}

let con = mysql.createConnection(options);

con.connect((err)=>{
    if(err){
        console.log(err)
    }else{
        console.log('连接成功')
    }
})

function sqlQuery(strSql,arr){
    return new Promise(function(resolve,reject){
        con.query(strSql,arr,(err,results)=>{
            if(err){
                reject(err)
            }else{
                resolve(results)
            }
        })
    })
}

module.exports = sqlQuery;