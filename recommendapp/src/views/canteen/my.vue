<template>
	<div id="canteenMy">
		<div class="mycard">
			<div class="cardRight">
				<img :src=userInfo.header_img />
			</div>
			<div class="cardLeft">
				<span id="username">用户名: {{userInfo.username}}</span>
				<span id="number">学号: {{userInfo.stu_id}}</span>
			</div>
		</div>
		<div class="exit">
			<van-icon class="setting" name="setting-o" />
			<span @click="exitEvent"><van-icon id="exchange"  name="exchange" />退出当前账号</span>
		</div>
		<tab-nav></tab-nav>
	</div>
</template>

<script>
	import Vue from 'vue';
	import tabNav from '@/components/tabNav'
	import { Icon } from 'vant';
	
	Vue.use(Icon);
	export default {
		data(){
			return {
				userInfo: [], //用户信息数据
			}
		},
		components:{
			tabNav
		},
		methods:{
			getUserInfo(){
				if(localStorage.getItem('userInfo')){
					this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
					this.userInfo.password = '';
					console.log(this.userInfo);
					
				}else{
					let userInfoData = {
						header_img:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.huabanimg.com%2F0830450561b24f4573bed70d7f74bd43f39302e11bee-s2tj6i_fw658&refer=http%3A%2F%2Fhbimg.huabanimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621668824&t=2ff7ff3365a63f9534388c7eca916d6e',
						username:'普通用户',
						stu_id:'10000000000'
					};
					this.userInfo = userInfoData;
				}
			},
			exitEvent(){
				localStorage.removeItem('userInfo');
				this.$router.push({
					path: '/user/login'
				})
			}
		},
		mounted(){
			//获取用户列表
			this.getUserInfo();
		}
		
	}
</script>

<style lang="less">
	#canteenMy{
		.mycard{
			width: 90%;
			height: 6.25rem;
			margin: 20px auto;
			background-color: #dfdfdf;
			border-radius: 0.3125rem;
			display: flex;
			
		}
		.cardRight{
			width: 6.25rem;
			height: 6.25rem;
			img{
				box-sizing: border-box;
				width: 100%;
				border-radius: 50%;
				padding:0.3125rem
			}
		}
		.cardLeft{
			display: flex;
			flex-direction: column;
			justify-content: center;
			span{
				margin: 0.3125rem 0;
				font-size: 1.125rem;
				
			}
		}
		.exit{
			width: 90%;
			height: 1.875rem;
			margin: 0.625rem auto;
			background-color: #dfdfdf;
			border-radius: 0.3125rem;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.setting{
				
				margin-left: 0.625rem;
			}
			span{
				margin-right: 0.625rem;
				#exchange{
					padding: 0.125rem;
				}
			}
		}
	}
</style>