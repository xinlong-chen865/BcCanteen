<template>
	<div id="canteenCategory">
		<!-- navbar -->
		<van-nav-bar title="层食堂">
		  <template #left>
		    <van-icon name="location-o" size="20" @click="goPosition" />
		  </template>
		</van-nav-bar>
		
		<!-- 侧边分类 -->
		<van-tree-select height="100vw" :items="items" :main-active-index.sync="active" @click-nav='getBusEvent' >
		  <template #content>
		    <van-grid :column-num="3">
		      <van-grid-item v-for="(item, index) in floorBusiness" :key="index" :to="`/canteen/goods/${item.id}`">
				 <template slot='icon'>
					 <img class="image" :src="require('@/assets/img/business/' + item.bus_img)" @load="loadEvent" />
				 </template>
				 <template slot='text'>
				 	<h3 class="busName" :title=item.bus_name>{{item.bus_name}}</h3>
				 </template>
			  </van-grid-item>
			  
		    </van-grid>
			<div style="height:50px"></div>
		  </template>
		</van-tree-select>
		
		<tab-nav></tab-nav>
	</div>
</template>

<script>
	import Vue from 'vue';
	import { FloorBusinessLists, FloorLists } from '../../api/category'
	import { NavBar } from 'vant';
	import { Icon } from 'vant';
	import { Grid, GridItem } from 'vant';
	import { TreeSelect } from 'vant';
	import { Image as VanImage } from 'vant';
	
	Vue.use(NavBar);
	Vue.use(Icon);
	Vue.use(Grid);
	Vue.use(GridItem);
	Vue.use(TreeSelect);
	Vue.use(VanImage);
	
	import tabNav from '@/components/tabNav'
	export default {
		data(){
			return {
				active: 0,
				floorList:[],
				floorBusiness:[],
			}
		},
		components:{
			tabNav
		},
		methods:{
			loadEvent(){
				this.$loading.hide();
			},
			goPosition() {
				this.$router.push('/canteen/position');
			},
			async getBusEvent(index){
				this.floorBusiness = []
				index = (index + 1) * 1000;
				let res2 = await FloorBusinessLists({floor_id:index});
				this.floorBusiness = res2.data;
			},
		},
		computed:{
			//层分类
			items:function(){
				if(this.floorList == undefined){
					return [];
				}else{
					let arr = [];
					this.floorList.forEach((item)=>{
						item['text'] = item.floor_name;
						arr.push(item);
					});
					return arr;
					
				}
			}
		},
		created() {
			this.$loading.show('请稍等，正在加载');
		},
		async mounted() {
			let res = await FloorLists();
			this.floorList = res.data;
			
			//进入页面，第一层先要获取数据
			let prepareRes = await FloorBusinessLists({floor_id:1000});
			this.floorBusiness = prepareRes.data;
			
		}
	}
</script>

<style lang="less">
	#canteenCategory{
		height: 100vh;
		display: flex;
		flex-direction: column;
		.van-tree-select{
			flex: 1;
		}
		.van-grid-item{
			overflow: hidden;
		}
		.image{
			width: 100%;
			height: 3.125rem;
		}
		.busName{
			width: 100%;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		.img-loading{
			width:100%;
			height: 80%;
		}
		.display-flex{
			width: 100%;
			
		}
		
	}
</style>
