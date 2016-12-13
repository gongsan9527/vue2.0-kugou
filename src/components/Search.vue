<template>
	<div class="search-container">
		<div class="search-header">
			<span class="goback" @click="goBack"></span>
			<p class="header-title">搜索</p>
		</div>	
		<div class="search-box clear">
			<input @keyup.enter="searchMusic" placeholder="歌手/歌名/拼音" type="text" class="search-txt" v-model.trim="searchTxt">
			<div class="search-btn" @click.stop="searchMusic">搜索</div>
		</div>
		<ul class="content-list" v-infinite-scroll="loadMore" infinite-scroll-immediate-check="false" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
			<li @click="playMuisc(index)" v-for="(vulue,index) in musicList">{{vulue.songname}} - {{vulue.singername}}</li>
		</ul>
	</div>
</template>
<script>

	import Vue from 'vue'
	import { Toast,Indicator,InfiniteScroll  } from 'mint-ui'
	import tools from '../../static/js/tools.js'
	import { mapActions,mapGetters } from 'vuex'


	Vue.use(InfiniteScroll)

	export default {
		data (){
			return {
				searchTxt:'',
				musicList:[],
				isPush:true,
				allPages:0,
				nowPages:1
			}
		},
		computed : {
			...mapGetters({
				preSearchList:'GET_SEARCH_LIST'  
			})
		},
		created (){
			this.musicList = this.preSearchList.sarchList;
			this.searchTxt = this.preSearchList.searchKey;
			this.allPages = this.preSearchList.allPages;
			this.nowPages = this.preSearchList.nowPages;
		},
		methods : {
			goBack (){
				this.$router.go(-1);
			},
			loadMore (){
				let _this = this;
				if(this.nowPages < this.allPages + 1) {
					Indicator.open();
					this.nowPages++;
					this.$http.get('https://route.showapi.com/213-1?keyword='+this.searchTxt+'&page='+this.nowPages+'&showapi_appid=26626&showapi_timestamp='+tools.getTime()+'&showapi_sign=3117074cbb014a72a1a57df4832dcbed').then((response) => {
						_this.isPush = true;
						response.data.showapi_res_body.pagebean.contentlist.forEach( (value) => {
							_this.musicList.push(value);
						});
					

						_this.setSearchList({
				    		dataList:response.data.showapi_res_body.pagebean.contentlist,
				    		isClear:false,
				    		nowPages:_this.nowPages
				    	});

				    	Indicator.close();
				 	}, (response) => {
				  	
				  	});
				}else{
					Toast({
					  	message: '没有更多了',
					  	duration: 2000
					});
				};

			},
			searchMusic (){
				let _this = this;
				if(this.searchTxt.length == 0) {
					Toast({
					  	message: '不能填写空格哦',
					  	duration: 2000
					});
				}else{
					Indicator.open();
					this.nowPages = 1;
					this.allPages = 0;
					this.isPush = true;
					this.$http.get('https://route.showapi.com/213-1?keyword='+this.searchTxt+'&page='+this.nowPages+'&showapi_appid=26626&showapi_timestamp='+tools.getTime()+'&showapi_sign=3117074cbb014a72a1a57df4832dcbed').then((response) => {
				    	_this.musicList = response.data.showapi_res_body.pagebean.contentlist;
				    	_this.allPages = response.data.showapi_res_body.pagebean.allPages;

				    	_this.setSearchList({
				    		dataList:response.data.showapi_res_body.pagebean.contentlist,
				    		isClear:true,
				    		nowPages:_this.nowPages,
				    		allPages:response.data.showapi_res_body.pagebean.allPages,
				    		searchKey:this.searchTxt
				    	});

				    	Indicator.close();
				 	}, (response) => {
				  	
				  	});
				}
			},
			playMuisc (index) {
				if(this.isPush){
					this.setSongiList(this.musicList);
					this.isPush = false;
				};
				tools.playMusic(index);
			},
			...mapActions({
	   			setSongiList:'SONG_LIST_ACTION',
	   			setSearchList: 'SEARCH_LIST_ACTION'
	   		})
		}
	}
</script>
<style>
	.search-header {
		position: relative;
		width: 100%;
		height: 1.066667rem;
		background-color: #2CA2F9;
	}
	.search-box {
		margin-top: 0.266667rem;
	}
	.search-txt {
		float: left;
		width: 78%;
		margin-left: 2%;
		height: 0.666667rem;
		padding: 0 0.266667rem;
		line-height: 0.666667rem;
		box-sizing: border-box;
		border-radius: 0.133333rem;
		border: 1px solid black;
	}
	.search-btn {
		float: left;
		width: 16%;
		margin-left: 2%;
		height: 0.666667rem;
		line-height: 0.666667rem;
		color: white;
		background-color: #2CA2F9;
		border-radius: 0.133333rem;
		text-align: center;
	}
</style>