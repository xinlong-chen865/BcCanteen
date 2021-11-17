const ApiRootUrl = 'http://127.0.0.1:3000/';

module.exports = {
	CategoryLogoLists: ApiRootUrl + 'canteen/getCategoryLogo', //食堂分类logo
	SearchLists: ApiRootUrl + 'canteen/searchBusiness', //搜索的商家列表
	NewBusinessList: ApiRootUrl + 'canteen/newBusinessList', //最新的商家列表
	HotBusinessList: ApiRootUrl + 'canteen/hotBusinessList', //最热的商家列表
	
	CategoryBusinessList: ApiRootUrl + 'canteen/categoryBusinessList', //分类商家 id
	FloorLists: ApiRootUrl + 'canteen/floorLists', //层分类'
	FloorBusinessLists: ApiRootUrl + 'canteen/floorBusinessLists', //根据id获取每层的商家
	
	IdToBusiness: ApiRootUrl + 'canteen/idToBusiness', //根据id获取商家的详情信息
	GoodsLists: ApiRootUrl + 'canteen/goodsLists', //获取菜品信息 id
	GoodsDesc: ApiRootUrl + 'canteen/goodsDesc', //获取菜品详情
	
	Login: ApiRootUrl + 'users/login', //用户登陆
	
	InsertOrder: ApiRootUrl + 'canteen/insertOrder', //生成订单
	getOrder: ApiRootUrl + 'canteen/getOrder', //获取订单
	
	PayingItem: ApiRootUrl + 'pay/phonePay' //跳转至支付宝支付页面
}