<template>
	<div class="music-info-container">
		<div class="music-info-header">
			<span class="goback" @click="goBack"></span>
			<p class="header-title">{{musicInfo.singName}}</p>
		</div>	
		<div class="song-content">
			<div class="bg-cover" :style="{backgroundImage:'url('+musicInfo.singerBigPic+')'}"></div>
			<div class="bg-over"></div>
			<img :src="musicInfo.singerBigPic" alt="" class="big-pic">
			<p class="lyric">{{lyricTxt}}</p>
			<div class="big-player-container">
				<div class="big-player-bar-container" id="big-player-bar-container">
					<div id="big-player-bar"></div>
					<div id="big-player-dot"></div>
					<div class="sum-time">{{musicTime.songTime}}</div>
					<div class="now-time">{{musicTime.songNowTime}}</div>
				</div>
			</div>
			<div class="big-btn-container">
				<div class="big-play-pre big-play-btn" @click="prePlay"></div>
				<div class="big-play-state" :class="getPlayBtnState" @click="playType"></div>
				<div class="big-play-next big-play-btn" @click="nextPlay"></div>
			</div>
		</div>
	</div>
		
</template>
<script>

	import tools from '../../static/js/tools.js'
	// import LrcAnalysis from '../../static/js/lrcAnalysis.js';
	import { mapActions,mapGetters } from 'vuex';

	export default {
		computed: {
			...mapGetters({
				musicInfo:'GET_PLAYER_INFO',
				musicTime:'GET_PLAYER_TIME',
				isPlay: 'GET_PLAYER_PLAYSTATE',
				lyricTxt: 'GET_SONG_LYRIC'
			}),
			getPlayBtnState (){
	    		return this.isPlay?'big-play-pause':'big-play-play';
	    	}
		},
		methods: {
			goBack (){
				this.$router.go(-1);
			},
			...mapActions({
	   			setSmallPlayer:'PLAYER_ISVIEW_ACTION'
	   		}),
	   		nextPlay (){
	  			tools.nextPlay();
	  		},
	  		playType (){
	  			tools.playState();
	  		},
	  		prePlay () {
	  			tools.prePlay();
	  		}
		},
		beforeRouteEnter (to, from, next) {
			next(vm => {
		    	vm.setSmallPlayer(false);
		  	});
		},
		beforeRouteLeave (to, from, next) {
			this.setSmallPlayer(true);
			next();
		},
		mounted (){
			tools.getEle();
		}
	}
</script>
<style>
	
	.lyric {
		position: absolute;
		top: 8rem;
		width: 100%;
		padding: 0 0.266667rem;
		box-sizing: border-box;
		color: white;
		z-index: 10;
		text-align: center;
	}
	.big-btn-container {
		position: absolute;
		top: 11rem;
		width: 100%;
		z-index: 10;
	}
	.big-play-state {
		position: absolute;
		top: -0.213333rem;
		left: 50%;
		width: 1.186667rem;
		height: 1.186667rem;
		margin-left: -0.586667rem;
		background-repeat: no-repeat;
		background-size: 100%;
	}
	.big-play-pause {
		background-image: url(../../static/play_pause.png);
	}
	.big-play-play {
		background-image: url(../../static/play_play.png);
	}
	.big-play-btn {
		position: absolute;
		left: 50%;
		width: 0.853333rem;
		height: 0.853333rem;
		background-size: 100%;
		background-repeat: no-repeat;
	}
	.big-play-pre {
		margin-left: -1.76rem;
		background-image: url(../../static/play_prev.png);
	}
	.big-play-next {
		margin-left: 0.906667rem;
		background-image: url(../../static/play_next.png);
	}
	.sum-time,.now-time  {
		position: absolute;
		top: -0.133333rem;
		color: white;
	}
	.sum-time {
		right: -1.2rem;
	}
	.now-time {
		left: -1.2rem;
	}
	.big-player-container {
		position: absolute;
		top: 9.333333rem;
		width: 100%;
		z-index: 3;
	}
	.big-player-bar-container {
		position: relative;
		width: 70%;
		height: 3px;
		margin: 0 auto;
		background-color: #6C6B70;
	}
	#big-player-dot {
		position: absolute;
		top: 50%;
		left: 0;
		width: 0.4rem;
		height: 0.4rem;
		margin-top: -0.2rem;
		background-color: #2CA2F9;
		border-radius: 100%;
	}
	#big-player-bar {
		position: absolute;
		top: 0;
		left: 0;
		width: 0;
		height: 100%;
		background-color: #2CA2F9;
	}
	.music-info-header {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 1.066667rem;
		z-index: 3;
	}
	.music-info-container {
		position: relative;
		height: 91.6%;
	}
	.song-content {
		position: relative;
		height: 100%;
	}
	.bg-cover {
		position: absolute;
		width: 100%;
		height: 100%;
		background-size: cover;
		background-repeat: no-repeat;
		-webkit-filter: blur(16px);
    	filter: blur(16px);
	}
	.bg-over {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 2;
		background-color: rgba(0,0,0,.6);
	}
	.big-pic {
		position: absolute;
		top: 1.333333rem;
		left: 50%;
		z-index: 3;
		margin-left: -3.0rem;
		width: 6.0rem;
	}
</style>