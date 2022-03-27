<template>
	<div id="canteenMain">
		<!-- 搜索框 -->
		<form action="/">
		  <van-search
		    v-model="searchData"
		    show-action
		    placeholder="请输入商家,商品名称"
		    @search="onSearch"
		    @cancel="onCancel"
		  />
		</form>
		<!-- 横向滚动 -->
		<div id="scroll">
			<marquee id='scrollItem'></marquee>
		</div>
		<!-- 轮播图 -->
		<van-swipe :autoplay="3000">
		  <van-swipe-item class="my-swipe" v-for="(image, index) in images" :key="index">
			<img :src=image style="width: 375px;height:200px" />
		  </van-swipe-item>
		</van-swipe>
		<!-- 投诉建议 -->
		<div class="suggest">
			<span>投诉建议：13121716998</span>
			<a href="tel:13121716998">立刻拨打</a>
		</div>
		<!-- 标签 -->
		<van-grid :column-num="4">
		  <van-grid-item  @click="chooseCategory(item.id)" v-for="(item, index) in canteen.categoryList" :key="index" :icon="require('@/assets/img/category/' + item.c_logo)" :text=item.c_name />
		</van-grid>
		<div class="anime">
			<LiveRecommendAnime></LiveRecommendAnime>
			<div class="anime__title">大明白带你买</div>
		</div>
		<!-- 最新商家 -->
		<van-divider content-position="left">最新商家</van-divider>
		<van-grid :column-num="3">
		  <van-grid-item class="abc" v-for="(item2, index2) in newsLists" :key="index2" :to="`/canteen/goods/${item2.id}`" >
			  <template slot='icon'>
				  <img class="newsImg" v-lazy="require('@/assets/img/business/' + item2.bus_img)" @load="loadEvent" />
			  </template>
			  <template slot='text'>
				  <div class="title">{{item2.bus_name}}</div>
				  <div class="address">{{item2.bus_address}}</div>
			  </template>
		  </van-grid-item>
		</van-grid>
		
		<!-- 最热商家 -->
		<van-divider content-position="left">最热商家</van-divider>
		<van-grid :column-num="3">
		  <van-grid-item v-for="(item3, index3) in hotsLists" :key="index3" :to="`/canteen/goods/${item3.id}`">
			  <template slot='icon'>
				  <img class="newsImg" v-lazy="require('@/assets/img/business/' + item3.bus_img)" @load="loadEvent" />
			  </template>
			  <template slot='text'>
				  <div class="title">{{item3.bus_name}}</div>
				  <div class="address">{{item3.bus_address}}</div>
			  </template>
		  </van-grid-item>
		</van-grid>


		<div class="content"></div>
		<tab-nav></tab-nav>
	</div>
</template>

<script>
	import Vue from 'vue';
	import tabNav from '@/components/tabNav'
	import { NewBusinessList, HotBusinessList} from '../../api/main'
	import {mapState, mapActions, mapMutations} from 'vuex'
	
	import LiveRecommendAnime from '@/components/LiveRecommendAnime'
	import { Swipe, SwipeItem } from 'vant';
	import { Lazyload } from 'vant';
	import { Search } from 'vant';
	import { Grid, GridItem } from 'vant';
	import { Divider } from 'vant';
	
	
	Vue.use(Swipe);
	Vue.use(SwipeItem);
	Vue.use(Lazyload);
	Vue.use(Lazyload, {
	  lazyComponent: true
	});
	Vue.use(Search);
	Vue.use(Grid);
	Vue.use(GridItem);
	Vue.use(Divider);
	
	let mapStateObj = mapState(['canteen']);
	let mapMutationsObj = mapMutations({setcategory:'canteen/setcategory'});
	let mapActionsObj = mapActions({getcategory:'canteen/getcategory'});
	
	export default {
		data(){
			return{ 
				images:[
					require('@/assets/img/banner/banner1.jpg'),
					require('@/assets/img/banner/banner2.jpg'),
					require('@/assets/img/banner/banner3.jpg')
				],
				searchData:'',//搜索框的内容
				newsLists:[],//最新的商家
				hotsLists:[],//最热的商家
			}
		},
		components:{
			tabNav,
			LiveRecommendAnime
		},
		computed:{
			//logo数据
			...mapStateObj,
		},
		methods:{
			...mapMutationsObj,
			...mapActionsObj,
			loadEvent(){
				this.$loading.hide();
			},
			onSearch(){
				this.$router.push({
					path:'/canteen/search',
					query:{
						content:this.searchData
					}
				})
			},
			onCancel(){
				this.searchData = "";
			},
			textScroll(x, y, text){
				let eleId = document.getElementById('scrollItem');
				eleId.style.left = x + 'px';
				eleId.style.top = x + 'px';
				eleId.innerHTML = text;
			},
			chooseCategory(id){
				this.$router.push({
					path:`/canteen/categorylist/${id}`
				})
			}
		},
		created(){
			this.$loading.show('请稍等，正在加载');
			this.getcategory();
		},
		async mounted(){
			let text = "顺义大明白：北城食堂，随你挑选。享你所享，爱你所爱！";
			this.textScroll(5,0,text);
			
			let res2 = await NewBusinessList();
			this.newsLists = res2.data;
			
			let res3 = await HotBusinessList();
			this.hotsLists = res3.data;

		}
	}
</script>

<style lang="less">
	#canteenMain{
		.content{
			height: 50px;
		}
		#scroll{
			width: 100%;
			height: 30px;
			text-align: center;
			position: relative;
			marquee{
				width: 95%;
				height: 30px;
				position: absolute;
			}
		}
		.suggest{
			width: 100%;
			height: 30px;
			box-sizing: border-box;
			padding: 0 5px;
			display: flex;
			justify-content: space-between;
			a{
				font-size: 20px;
			}
			span{
				font-size: 20px;
			}
		}
		.van-grid-item{
			box-sizing: border-box;
			overflow: hidden;
			.newsImg{
				width: 100%;
				height: 80px;
			}
			.title{
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.address{
				width: 100%;
				font-size: 12px;
				color: #ccc;
				box-sizing: border-box;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}
		.anime {
			height: 40px;
			display: flex;
			align-items: center;
			margin-left: 10px;
			&__title {
				font-size: 20px;
				color: transparent;
				-webkit-text-stroke: 1px #fe3666;
				margin-left: 10px;
			}
		}
	}
</style>
