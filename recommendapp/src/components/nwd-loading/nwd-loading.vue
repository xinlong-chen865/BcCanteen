<template>
	<div class="nwd-loading" v-show="show">
		<div class="loading-text">{{ text }}</div>
	</div>
</template>

<script>
	export default {
		props:{
			show: Boolean,
			text: '正在加载中...'
		}
	}
</script>

<style scoped>
	.nwd-loading{
		position: fixed;
		top: 0px;
		left: 0px;
		width: 100vw;
		height: 100vh;
		background-color: rgba(255,255,255,.9);
		text-align: center;
		
	}
	.loading-text{
		font-size: 24px;
		font-weight: 900;
		transform: translateY(300px);
		
	}
</style>
