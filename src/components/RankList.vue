<template>
	<div class="rank-list-container">
		<div class="rank-header">
			<span class="goback" @click="goBack"></span>
			<p class="header-title">{{ headerTitle }}</p>
		</div>	
		<ul class="content-list">
			<li @click="playMuisc(index)" v-for="(vulue,index) in musicList">{{vulue.songname}} - {{vulue.singername}}</li>
		</ul>
	</div>
		
</template>
<script>
	import tools from '../../static/js/tools.js'
	import { Indicator } from 'mint-ui'
	import { mapActions } from 'vuex'

	export default {
		data () {
			return {
				headerTitle:'',
				musicList:[],
				isPush:true
			}
		},
		methods: {
			goBack (){
				this.$router.go(-1);
			},
			playMuisc (index) {
				if(this.isPush){
					this.setSongiList(this.musicList);
					this.isPush = false;
				};
				tools.playMusic(index);
			},
			...mapActions({
	   			setSongiList:'SONG_LIST_ACTION'
	   		})
		},
		created () {

			let _this = this,
				sId = parseInt(this.$route.params.id);
			
			switch(sId){
				case 3:
				this.headerTitle = '欧美排行榜';
				break;
				case 5:
				this.headerTitle = '内地排行榜';
				break;
				case 6:
				this.headerTitle = '港台排行榜';
				break;
				case 16:
				this.headerTitle = '韩国排行榜';
				break;
				case 17:
				this.headerTitle = '日本排行榜';
				break;
				case 18:
				this.headerTitle = '民谣排行榜';
				break;
				case 19:
				this.headerTitle = '摇滚排行榜';
				break;
				case 23:
				this.headerTitle = '销量排行榜';
				break;
			};

			Indicator.open();
			this.$http.get('https://route.showapi.com/213-4?showapi_appid=26626&showapi_timestamp='+tools.getTime()+'&topid='+sId+'&showapi_sign=3117074cbb014a72a1a57df4832dcbed').then((response) => {
		    	_this.musicList = response.data.showapi_res_body.pagebean.songlist;
		    	Indicator.close();
		 	}, (response) => {
		  	
		  	});
		}
	}

</script>
<style>
	.rank-header {
		position: relative;
		width: 100%;
		height: 1.066667rem;
		background-color: #2CA2F9;
	}
</style>