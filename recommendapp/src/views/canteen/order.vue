<template>
	<div id="canteenOrder">
		<van-nav-bar
		  title="我的订单"
		/>
		<van-tabs v-model="active" style="height:100vh">
		  <!-- 未支付 -->
		  <van-tab title="未支付的订单">
			  <template v-if="this.userId">
				<div class="allOrder" v-for="(item,index) in unreadList" :key="index" >
					<div class="orderItem" >
						<div class="title">{{ item.business_name }}</div>
						<van-divider :style="{ borderColor: '#1989fa', padding: '0 16px' }" />
						<div style="height: 100px; overflow: scroll">
							<div class="desc" v-for="(good, goodIndex) in item.goods_arr" :key='goodIndex'>
								<span>{{ good.goods_name }}</span>
								<span>X {{ good.order_sum }}</span>
							</div>
						</div>
					</div>
						
					<div class="footer">
						支付金额：{{ item.order_price }}
					</div>
			  	</div>
				<div style="height: 50px"></div>
			  </template>
			  <template v-else>
				无
			  </template>
			  
		  </van-tab>
		  <!-- 已支付 -->
		  <van-tab title="已支付的订单">
			  <template v-if="this.userId">
				<div class="allOrder" v-for="(item,index) in readList" :key="index" >
					<div class="orderItem" >
						<div class="title">{{ item.business_name }}</div>
						<van-divider :style="{ borderColor: '#1989fa', padding: '0 16px' }" />
						<div style="width: 100%; overflow: scroll">
							<div class="desc" v-for="(good, goodIndex) in item.goods_arr" :key='goodIndex'>
								<span>{{ good.goods_name }}</span>
								<span>X {{ good.order_sum }}</span>
							</div>
						</div>
						
					</div>
						
					<div class="footer">
						支付金额：{{ item.order_price }}
					</div>
			  	</div>
				<div style="height: 50px"></div>
			  </template>
			  <template v-else>
				无
			  </template>
		  </van-tab>
		  
		</van-tabs>
		<tab-nav></tab-nav>
	</div>
</template>

<script>
	import tabNav from '@/components/tabNav'
	import {getOrder} from '../../api/order'
	import Vue from 'vue';
	import { NavBar } from 'vant';
	import { SwipeCell } from 'vant';
	import { Cell, CellGroup } from 'vant';
	import { Button } from 'vant';
	import { Divider } from 'vant';
	
	Vue.use(Cell);
	Vue.use(CellGroup);
	Vue.use(Button);	
	Vue.use(SwipeCell);
	Vue.use(NavBar);
	Vue.use(Divider);
	export default {
		data(){
			return {
				active: 0,
				unreadList: [],
				readList: []
			}
		},
		computed: {
			userId() {
				let user_id = localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).id;
				return user_id;
			}
		},
		components:{
			tabNav
		},
		created(){
			this.userId && this.fetchData(0);
			this.userId && this.fetchData(2);
		},
		methods:{
			//获取订单
			async fetchData(state){
				if(state == 0){
					let {data} = await getOrder({state, userId: this.userId});
					this.unreadList = data;
				} else {
					let {data} = await getOrder({state, userId: this.userId});
					this.readList = data
				}
			}
		}
	}
</script>

<style lang="less">
	#canteenOrder{
		.van-tab__pane{
			margin-top: 5px;
			height: calc( 100vh - 140px );
		}
		.allOrder{
			position: relative;
			height: 30vh;
			width: 80%;
			margin: 0 auto;
			border: 1px solid black;
			margin-bottom: 20px;
		}
		.title{
			height: 40px;
			line-height: 40px;
			margin-left: 20px;
		}
		.desc{
			margin-left: 30px;
			font-size: 14px;
		}
		.footer{
			position: absolute;
			height: 30px;
			line-height: 30px;
			bottom: 0;
			margin-left: 20px;
		}
	}
</style>