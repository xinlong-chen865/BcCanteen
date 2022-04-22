<template>
  <div id="vLogin">
    <!-- 导航栏 -->
    <van-nav-bar
      title="登录页"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 登录页 用户表单 -->
	<div class="container">
		<div class="wrapper">
			<div class="left-top-sign">LOGIN</div>
			<div class="welcome">
			  欢迎回来！
			</div>
			<div class="input-content">
			  <div class="input-item">
				<span class="tit">用户名</span>
				<input id="username" type="text" placeholder="请输入真实姓名" v-model="username" />
			  </div>
			  <div class="input-item">
				<span class="tit">密码</span>
				<input id="password" type="password"  placeholder="请输入密码" v-model="password" />
			  </div>
			</div>
			<button class="confirm-btn" v-if="!loading"  @click='login' >登录</button>
			<button class="confirm-btn" v-else disabled="disabled"  @click='login' >登陆中...</button>
			<div class="forget-section">
			  忘记密码?
			</div>
		</div>
		<div class="register-section">
			还没有账号?
			<span >马上注册</span>
		</div>
	</div>
  
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue';
import { mapActions } from 'vuex';

import { NavBar } from 'vant';
import { Toast } from 'vant';

Vue.use(Toast);
Vue.use(NavBar);

const token = '123456';
  export default {
    data () {
      return {
        username: "", //手机号
        password: "", //密码
		loading: false, //登陆状态
      }
    },
    methods: {
		...mapActions(['handleUserProfile']),
		onClickLeft() {
			this.$router.push({ path:'/canteen/main'});
		},
		async login() {
			this.loading = true;
			//前端验证
			if(this.username === ''){
				Toast.fail('用户名不能为空');
				return;
			}
			if(this.password === ''){
				Toast.fail('密码不能为空');
				return;
			}
			console.log(this.username)
			//后端验证
			const params = new URLSearchParams();
			params.append('username', this.username);
			params.append('password', this.password);
			let res = await axios.post(this.$root.api.Login,params,{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				}
			})
			if(res.data.state == 200){
				this.loading = false;
				//登陆成功
				Toast.success(res.data.content);
				//登陆成功后存储到本地
				localStorage.setItem('userInfo',JSON.stringify(res.data.userInfo));
				this.$store.commit('update', { userId: res.data.userInfo.id });
				
				const redirect = this.$route.query.redirect || "/canteen/main";
				this.$router.push(redirect);

				// 触发新用户进来的弹窗
				this.handleUserProfile();
			}else if(res.data.state == 501){
				this.loading = false;
				Toast.fail(res.data.content);
			}else{
				this.loading = false;
				Toast.fail('登陆失败');
			}
		}
      
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
  #vLogin{
	.wrapper{
	    position:relative;
	    z-index: 90;
	    padding-bottom: 20px;
		text-align: center;
	  }
	  
	  .left-top-sign{
	    font-size: 60px;
	    color: #f8f8f8;
	    position:relative;
	    left: -8px;
	  }
	  
	  .welcome{
	    position:relative;
	    left: 25px;
	    top: -45px;
	    font-size: 23px;
	    color: #555;
	  }
	  
	  
	  .input-content{
	    padding: 0 30px;
	  }
	  .input-item{
	    display:flex;
	    flex-direction: column;
	    align-items:flex-start;
	    justify-content: center;
	    padding: 0 30rpx;
	    background:#f8f6fc;
	    height: 60px;
	    border-radius: 4px;
	    margin-bottom: 25px;
	  
	  }
	  
	  .input-item:last-child{
	    margin-bottom: 0;
	  }
	  .input-item .tit{
	    height: 25px;
	    line-height: 28px;
	    font-size: 15px;
	    color: #606266;
	  }
	  .input-item input{
	    height: 30px;
	    font-size: 15px;
	    color: #303133;
	    width: 100%;
	  }
	  .confirm-btn{
	    width: 315px!important;
	    height: 38px;
	    line-height: 38px;
	    border-radius: 25px;
	    margin-top: 35px;
	    background: #d43c33;
	    color: #fff;
	    font-size: 16px;
	    padding: 0;
	  }
	  .confirm-btn2:after{
	    border-radius: 100px;
	  }
	  
	  .forget-section{
	    font-size: 14px;
	    color: #4399fc;
	    text-align: center;
	    margin-top: 20px;
	  }
	  
	  .register-section{
	    position:absolute;
	    left: 0;
	    bottom: 25px;
	    width: 100%;
	    font-size: 14px;
	    color: #606266;
	    text-align: center;
	  
	  }
	  .register-section text{
	    color: #4399fc;
	    margin-left: 5px;
	  }

  }
</style>

