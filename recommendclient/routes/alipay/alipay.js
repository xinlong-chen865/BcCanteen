var express = require('express');
var router = express.Router();
var sqlQuery = require('../../lcMysql.js');
const fs = require("fs");
const path = require("path");
 
const AlipaySDK = require("alipay-sdk").default;
const AlipayFormData = require("alipay-sdk/lib/form").default;

const alipaySdk = new AlipaySDK({
    appId: '2021000117634888',
    privateKey: fs.readFileSync(
        path.join(__dirname, "../../pem/app_private_key.pem"),
        "ascii"
    ), // 私钥
    signType: "RSA2", // 签名类型
    alipayPublicKey: fs.readFileSync(
        path.join(__dirname, "../../pem/alipay_public_key.pem"),
        "ascii"
    ),
    gateway: "https://openapi.alipaydev.com/gateway.do",
    timeout: 5000,
    camelcase: true
});

/* 获取分类logo */
router.get('/paying',async function(req, res, next) {
	const id = req.query.id;
    const subject = req.query.subject;
	let sqlStr = 'select * from can_order where id=? and order_status=?';
	let result = await sqlQuery(sqlStr, [id, 0]);

    const formData = new AlipayFormData();
    formData.setMethod("get");
    formData.addField("appId", "2021000117634888");
    formData.addField("charset", "utf-8");
    formData.addField("signType", "RSA2");
    formData.addField('returnUrl', 'http://127.0.0.1:7070/canteen/main');//支付成功之后跳转的页面
	formData.addField('quitUrl', 'http://127.0.0.1:7070/canteen/main');//退出支付后跳转的页面
    formData.addField("bizContent", {
        outTradeNo: result[0].id,// 【必选】商户订单号：64个字符内，包含数字，字母，下划线；需要保证在商户端不重复
        productCode: "FAST_INSTANT_TRADE_PAY",// 【必选】销售产品码，目前仅支持FAST_INSTANT_TRADE_PAY
        totalAmount: result[0].order_price,// 【必选】订单总金额，精确到小数点后两位
        subject: subject,// 【必选】 订单标题
    });

    const retUrl = await alipaySdk.exec(
        "alipay.trade.page.pay",
        {},
        { formData }
    );
    
    res.append('Access-Control-Allow-Origin','*');
	res.append('Access-Control-Allow-Content-Type','*');
    res.json({ url: retUrl });
});

// 把未付款改为付款
router.get('/confirm',async function(req, res, next) {
    const id = req.query.id;
    const sqlStr = "update can_order set order_status = ? where id = ?";
    await sqlQuery(sqlStr, [2, id]);
    res.json({
        state:200,
        message: '支付成功',
    });
});


module.exports = router;