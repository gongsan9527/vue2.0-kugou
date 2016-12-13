<template>
	<ul class="rank-list">
		<router-link :to="{ path: '/rank_list/3' }" tag="li">
			<img src="../../static/pic.png" alt="" class="rank-list-pic">
			<span>欧美</span>
		</router-link>
		<router-link :to="{ path: '/rank_list/5' }" tag="li">
			<img src="../../static/pic.png" alt="" class="rank-list-pic">
			<span>内地</span>
		</router-link>
		<router-link :to="{ path: '/rank_list/6' }" tag="li">
			<img src="../../static/pic.png" alt="" class="rank-list-pic">
			<span>港台</span>
		</router-link>
		<router-link :to="{ path: '/rank_list/16' }" tag="li">
			<img src="../../static/pic.png" alt="" class="rank-list-pic">
			<span>韩国</span>
		</router-link>
		<router-link :to="{ path: '/rank_list/17' }" tag="li">
			<img src="../../static/pic.png" alt="" class="rank-list-pic">
			<span>日本</span>
		</router-link>
		<router-link :to="{ path: '/rank_list/18' }" tag="li">
			<img src="../../static/pic.png" alt="" class="rank-list-pic">
			<span>民谣</span>
		</router-link>
		<router-link :to="{ path: '/rank_list/19' }" tag="li">
			<img src="../../static/pic.png" alt="" class="rank-list-pic">
			<span>摇滚</span>
		</router-link>
		<router-link :to="{ path: '/rank_list/23' }" tag="li">
			<img src="../../static/pic.png" alt="" class="rank-list-pic">
			<span>销量</span>
		</router-link>
	</ul>
</template>
<script>
	export default {

	}
</script>
<style>
	.rank-list {
		padding-bottom: 2.133333rem;
	}
	.rank-list li {
		position: relative;
		padding: 0.4rem 0;
		width: 90%;
		margin: 0 auto;
		font-size: 0.4rem;
		border-bottom: 1px solid #e5e5e5;
		line-height: 
	}
	.rank-list li img {
		width: 2.666667rem;
	}
	.rank-list li span {
		position: absolute;
		top: 46%;
		margin-left:0.8rem;

	}
</style>