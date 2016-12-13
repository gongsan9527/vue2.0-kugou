<template>
	<div class="content-container">
		<ul class="menu-list clear">
			<router-link :to="{ path: '/new' }" tag="li">新歌</router-link>
			<router-link :to="{ path: '/rank'}" tag="li">排行</router-link>
		</ul>
		<router-view></router-view>
	</div>
</template>
<script>


export default {
  components: {
    
  }
}
</script>

<style>
	.menu-list {
		width: 90%;
		margin: 0 auto;
	}
	.menu-list li {
		float: left;
		width: 50%;
		height: 100%;
		text-align: center;
		line-height: 1.066667rem;
		font-size: 0.373333rem;
	}
	.menu-list .router-link-active {
		border-bottom: 3px solid #33A3F5;
	}
	.goback {
		position: absolute;
		top: 50%;
		left: 0.666667rem;
		margin-top: -0.266667rem;
		width: 0.32rem;
		height: 0.533333rem;
		background-image: url(../../static/back.png);
		background-repeat: no-repeat;
		background-size: 100%;
	}
	.header-title {
		width: 100%;
		height: 100%;
		padding: 0 1.333333rem;
		text-align: center;
		font-size: 0.48rem;
		box-sizing: border-box;
		color: white;
		line-height: 1.066667rem;
		overflow: hidden;
	}
</style>