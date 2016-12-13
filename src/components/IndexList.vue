<template>
	<ul class="content-list">
		<li @click="playMuisc(index)" v-for="(vulue,index) in musicList">{{vulue.songname}} - {{vulue.singername}}</li>
	</ul>
</template>
<script>


	import tools from '../../static/js/tools.js'
	import { Indicator } from 'mint-ui'
	import { mapActions } from 'vuex'

	export default {
		data (){
			return {
				isPush:true,
				musicList:[]
			}
		},
		methods: {
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
		created (){
			let _this = this;
			Indicator.open();
			this.$http.get('https://route.showapi.com/213-4?showapi_appid=26626&showapi_timestamp='+tools.getTime()+'&topid=26&showapi_sign=3117074cbb014a72a1a57df4832dcbed').then((response) => {
		    	_this.musicList = response.data.showapi_res_body.pagebean.songlist;
		    	Indicator.close();
		 	}, (response) => {
		  	});
		}
	}
</script>
<style>
	.content-list {
		padding-bottom: 2.133333rem;
	}
	.content-list li {
		padding: 0.4rem 0;
		width: 90%;
		margin: 0 auto;
		font-size: 0.4rem;
		border-bottom: 1px solid #e5e5e5;
	}
</style>