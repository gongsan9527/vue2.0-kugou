<template>
	<div v-show="isView" class="player-container">
		<router-link :to="{ path: '/music_content' }" tag="div" class="player-link">
	      	<img :src="playerInfo.singerPic" alt="" class="singer-img">
	      	<div class="sing-box">
	        	<div class="sing-name">{{playerInfo.singName}}</div>
	        	<div class="singer-name">{{playerInfo.singerName}}</div>
	      	</div>  
	      	<div id="small-play-bar"></div>	
	    </router-link>
	    <audio src="" id="audio"></audio>
	    <div :class="getPlayBtnState" class="play-btn" @click="playType"></div>
	    <div class="play-next-btn play-btn" @click="nextPlay"></div>
	</div>
</template>


<script>

	import tools from '../../static/js/tools.js'
	import { mapGetters } from 'vuex'

	export default {
	  	computed: {
	    	...mapGetters({
	      		playerInfo:'GET_PLAYER_INFO',
	      		isView : 'GET_PLAYER_ISVIEW',
	      		isPlay: 'GET_PLAYER_PLAYSTATE'
	    	}),
	    	getPlayBtnState (){
	    		return this.isPlay?'play-pause-btn':'play-state-btn';
	    	}
	  	},
	  	methods: {
	  		nextPlay (){
	  			tools.nextPlay();
	  		},
	  		playType (){
	  			tools.playState();
	  		}
	  	},
	  	mounted() {
	  		tools.isEnded();
	  	}
	}

</script>

<style>
.player-link {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2.133333rem;
    background-color: rgba(0,0,0,.8);
    z-index: 20;
}
#small-play-bar {
	position: absolute;
	bottom: 0;
	left: 0;
	width: 0%;
	height: 3px;
	background-color: #3195FD;
}
.singer-img {
    position: absolute;
    top: 0.133333rem;
    left: 0.133333rem;
    width: 1.866667rem;
    height: 1.866667rem;
    border-radius: 5px;
}
.sing-box {
    position: absolute;
    left: 2.266667rem;
    top: 0.133333rem;
}
.sing-name {
    color: white;
    font-size: 0.4rem;
}
.singer-name {
    margin-top: 0.133333rem;
    color: white;
}
.play-btn {
    position: fixed;
    bottom: 0.133333rem;
    width: 0.666667rem;
    height: 0.666667rem;
    background-size: 100%;
    background-repeat: no-repeat;
    z-index: 21;
}
.play-state-btn {
    right: 1.333333rem;
    background-image: url(../../static/play_icon.png);
}
.play-pause-btn {
    right: 1.333333rem;
    background-image: url(../../static/pause_icon.png);
}
.play-next-btn {
    right: 0.4rem;
    background-image: url(../../static/next_icon.png);
}
</style>