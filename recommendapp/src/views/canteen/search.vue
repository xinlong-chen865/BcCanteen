<template>
	<div id="canteenSearch">
		<!-- navbar头 -->
		<van-nav-bar
		  title="搜索到的商家"
		  left-text="返回"
		  left-arrow
		  @click-left="onClickLeft"
		/>
		<!-- 商家信息 -->
		<van-card v-for="(item, index) in busLists" :key="index"
		  :desc=item.bus_address
		  :title=item.bus_name
		  :thumb="require('@/assets/img/business/' + item.bus_img)"
		/>
	</div>
</template>

<script>
	import Vue from 'vue';
	import {SearchLists} from '../../api/search'
	import { NavBar } from 'vant';
	import { Card } from 'vant';
	
	
	Vue.use(NavBar);
	Vue.use(Card);
	
	export default {
		data(){
			return {
				content:this.$route.query.content,
				busLists:[],
			}
		},
		methods:{
			onClickLeft(){
				this.$router.go(-1);
			}
		},
		async mounted(){
			let res = await SearchLists({content:this.content});
			this.busLists = res.data;
		}
	}
</script>

<style lang="less">
	#canteenSearch{
		.van-card__title{
			height: 30px;
			line-height: 30px;
			font-size: 20px;
			font-weight: 900;
		}
		.van-card__content{
			justify-content: center;
		}
	}
</style>
