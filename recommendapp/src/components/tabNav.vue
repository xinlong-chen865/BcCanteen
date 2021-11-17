<template>
	<div>
		<div style="height: 50px"></div>
		<van-tabbar v-model="tabActive">
			<van-tabbar-item icon="home-o" to="/canteen/main">主页</van-tabbar-item>
			<van-tabbar-item icon="bag-o" to="/canteen/category">分类</van-tabbar-item>
			<van-tabbar-item icon="completed" to="/canteen/order">订单</van-tabbar-item>
			<van-tabbar-item icon="manager-o" to="/canteen/my">我的</van-tabbar-item>
		</van-tabbar>
	</div>
	
</template>

<script>
	import Vue from 'vue';
	import { Tabbar, TabbarItem } from 'vant';
	
	Vue.use(Tabbar);
	Vue.use(TabbarItem);
	
	export default {
		data(){
			return{
				tabActive:0
			}
		},
		mounted() {
			switch(this.$route.path){
				case '/canteen/main':
					this.tabActive = 0;
					break;
				case '/canteen/category':
					this.tabActive = 1;
					break;
				case '/canteen/order':
					this.tabActive = 2;
					break;
				case '/canteen/my':
					this.tabActive = 3;
					break;
			}
			
		}
		
	}
</script>

<style>
</style>
