<template>
	<div id="canteenCategoryList">
		<van-nav-bar
		  title="分类"
		  left-text="返回"
		  left-arrow
		  @click-left="onClickLeft"
		/>
		
		<!-- 分类标签 -->
		<van-tabs v-model="active" @click="chooseBusiness">
		  <van-tab v-for="(item, index) in canteen.categoryList" :key="index" :title=item.c_name>
			  <!-- 商家 -->
			  <van-card v-for="(item2, index2) in cateLists" :key='index2'
				:desc=item2.bus_address
				:title=item2.bus_name
				:thumb="require('@/assets/img/business/' + item2.bus_img)"
				@click="handleGoodsDesc(item2.id)"
			  />
			  
		  </van-tab>
		</van-tabs>
	</div>
</template>

<script>
	import axios from 'axios';
	import Vue from 'vue';
	import { CategoryBusinessList } from '../../api/categoryList'
	import { mapState } from "vuex";
	import { Card } from 'vant';
	import { Tab, Tabs } from 'vant';
	import { NavBar } from 'vant';
	
	
	Vue.use(Card);
	Vue.use(Tab);
	Vue.use(Tabs);
	Vue.use(NavBar)
	
	let mapStateObj = mapState(['canteen']);
	
	export default {
		props:['id'],
		data(){
			return {
				active:0,
				content:this.$route.query.content,
				cateLists:[],
				cid:0, //改变标签时的id号
			}
		},
		computed:{
			...mapStateObj,
		},
		methods:{
			onClickLeft(){
				this.$router.go(-1);
			},
			//切换标签时,发送请求
			async chooseBusiness(key){
				this.cid = key + 1;
				let res = await CategoryBusinessList({ id: this.cid })
				
				this.cateLists = res.data
			},
			handleGoodsDesc(id) {
				this.$router.push({
					path:`/canteen/goods/${id}`
				})
			}
		},
		created(){
			this.active = Number(this.id) - 1;
			console.log(this);
		},
		async mounted() {
			let res = await CategoryBusinessList({ id: this.id });
			this.cateLists = res.data
			
		}
	}
</script>

<style lang="less">
	#canteenCategoryList{
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
