// import Vue from 'vue'
import $ from 'webpack-zepto';
import store from '../../src/vuex/store.js'

export default {
	timer:null,
	playMusic (index) {
		this.setPlayInfo(index);	
		store.dispatch('PLAYER_ISVIEW_ACTION',true);
		store.dispatch('PLAYER_PLAYSTATE_ACTION',true);
	},
	setPlayInfo (index){
		this.nowIndex = index;
		this.songList = store.getters.GET_SONG_LIST;
		store.dispatch('PLAYER_ACTION',{
			singerPic:this.songList[index].albumpic_small,
			singerName:this.songList[index].singername,
			singName:this.songList[index].songname,
			singerBigPic:this.songList[index].albumpic_big,
			songid:this.songList[index].songid,
			nowIndex: index
		});
		this.setPlay();
		// this.setPlayBar();
	},
	setPlay (){
		this.audioEle.src = this.songList[this.nowIndex].url;
		this.audioEle.play();
		this.getLyric();

	},
	getLyric() {
		var _this = this;
		$.get('https://route.showapi.com/213-2?musicid='+this.songList[this.nowIndex].songid+'&showapi_appid=26626&showapi_timestamp='+this.getTime()+'&showapi_sign=3117074cbb014a72a1a57df4832dcbed',(data) => {
			_this.parseLyric(data.showapi_res_body.lyric);
		});
	},
	playState (){
		if(this.audioEle.paused){
			store.dispatch('PLAYER_PLAYSTATE_ACTION',true);
			this.audioEle.play();
		}else{
			store.dispatch('PLAYER_PLAYSTATE_ACTION',false);
			this.audioEle.pause();
		};
	},
	nextPlay (){
		clearInterval(this.timer);
		if(this.nowIndex == this.songList.length - 1) {
			this.nowIndex = -1;
		};
		this.nowIndex++;
		this.setPlayInfo(this.nowIndex);
	},
	prePlay (){
		clearInterval(this.timer);
		this.nowIndex--;
		if(this.nowIndex < 0) {
			this.nowIndex = this.songList.length - 1;
		};
		this.setPlayInfo(this.nowIndex);
	},
	isEnded () {
		let _this = this,
			smallBar = $('#small-play-bar');
		this.audioEle = $('#audio')[0];
		

		this.audioEle.addEventListener('ended' ,() => {
			clearInterval(_this.timer);
			_this.nextPlay();
		});
		this.audioEle.ontimeupdate = function(event) {
			// console.log(event.target.currentTime);


			let scale = parseInt(_this.audioEle.currentTime)/parseInt(_this.audioEle.duration) * 100+'%';

			_this.getPlayerTime(_this.audioEle.duration,_this.audioEle.currentTime);

			smallBar.width(scale);
			_this.bigBar&&_this.bigBar.width(scale);
			_this.bigDot&&_this.bigDot.css({
				left:scale
			});

			for(let i = 0,len = _this.lyricList.length;i<len;i++){
				if(_this.audioEle.currentTime.toFixed(2) == parseInt(_this.lyricList[i][0]) ){
					console.log(_this.lyricList[i][1]);
				}
			}


		};
	},
	getEle () {
		this.bigDot = $('#big-player-dot');
		this.bigBar = $('#big-player-bar');
		this.bigBarContainer = $('#big-player-bar-container');
		this.hanlder();
	},
	getPlayerTime (time,nowTime){
		this.durationTime = time;
		store.dispatch('PLAYER_TIME_ACTION',{
			songTime:this.toDouble(parseInt(time/60))+':'+this.toDouble(parseInt(time%60)),
			songNowTime:this.toDouble(parseInt(nowTime/60))+':'+this.toDouble(parseInt(nowTime%60))
		});
	},
	hanlder (){
		let _this = this;
		this.bigDot.on('touchstart',function(event){
			_this.x = event.touches[0].clientX - _this.bigDot.position().left;
			_this.audioEle.pause();
			// clearInterval(_this.timer);
		});
		this.bigDot.on('touchmove',function(event){
			event.preventDefault();
			_this.nowX = event.touches[0].clientX - _this.x;

			if(_this.nowX<0){
				_this.nowX = 0;
			}else if(_this.nowX >= _this.bigBarContainer.width()){
				_this.nowX = _this.bigBarContainer.width();
			};

			_this.getPlayerTime(_this.durationTime,_this.nowX / _this.bigBarContainer.width() * _this.durationTime);
			_this.bigBar.width(_this.nowX / _this.bigBarContainer.width() * 100 +'%');


			_this.bigDot.css({
				left:_this.nowX
			});
		});
		this.bigDot.on('touchend',function(event){
			_this.audioEle.currentTime = _this.nowX / _this.bigBarContainer.width() * _this.durationTime;
			_this.audioEle.play();
			// _this.setPlayBar();
		});
	},




































	getTime () {
		let time = new Date();
		return ''+time.getFullYear()+this.toDouble(time.getMonth()+1)+this.toDouble(time.getDate())+this.toDouble(time.getHours())+this.toDouble(time.getMinutes())+this.toDouble(time.getSeconds());
	},
	toDouble (num) {
		return num < 10? '0'+num:num;
	},
	decodeHtmlEntity(str){
		return str.replace(/&#(\d+);/g, function(match, dec) {
	    	return String.fromCharCode(dec);
	  	});
	},
	parseLyric(text) {
	    
	    var lyricTxt = this.decodeHtmlEntity(text),
	    	lines = lyricTxt.split('\n'),
	        //用于匹配时间的正则表达式，匹配的结果类似[xx:xx.xx]
	        pattern = /\[\d{2}:\d{2}.\d{2}\]/g,
	        //保存最终结果的数组
	        result = [];
	    //去掉不含时间的行
	    while (!pattern.test(lines[0])) {
	        lines = lines.slice(1);
	    };
	    //上面用'\n'生成生成数组时，结果中最后一个为空元素，这里将去掉
	    lines[lines.length - 1].length === 0 && lines.pop();
	    lines.forEach(function(v /*数组元素值*/ , i /*元素索引*/ , a /*数组本身*/ ) {
	        //提取出时间[xx:xx.xx]
	        var time = v.match(pattern),
	            //提取歌词
	            value = v.replace(pattern, '');
	        //因为一行里面可能有多个时间，所以time有可能是[xx:xx.xx][xx:xx.xx][xx:xx.xx]的形式，需要进一步分隔
	        time.forEach(function(v1, i1, a1) {
	            //去掉时间里的中括号得到xx:xx.xx
	            var t = v1.slice(1, -1).split(':');
	            //将结果压入最终数组
	            result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
	        });
	    });
	    //最后将结果数组中的元素按时间大小排序，以便保存之后正常显示歌词
	    result.sort(function(a, b) {
	        return a[0] - b[0];
	    });
	    

	    this.lyricList = result;
	    store.dispatch('LYRIC_ACTION',result);

	    // return result;
	    
	}

	
}