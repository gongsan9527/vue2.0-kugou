export default {
	state : {
		songList:[],
		searchList:[],
		nowLyric:'',
		nowIndex:0,
		isView:false,
		singerPic:'',
		singerName:'',
		playState:false,
		singerBigPic:'',
		singName:'',
		songTime:'',
		songNowTime:'',
		songid:'',
		nowPages:0,
		allPages:0,
		searchKey:''
	},
	mutations : {

		SET_SEARCH_LIST (state, data) {

			if (data.isClear) {state.searchList.length = 0;};
			if(data.searchKey) {state.searchKey = data.searchKey;};
			if(data.nowPages) {state.nowPages = data.nowPages;};
			if(data.allPages) {state.allPages = data.allPages;};
			
			data.dataList.forEach( (value) => {
				state.searchList.push(value);
			});
		},
		SET_NOW_LYRIC (state, data) {
			state.nowLyric = data;
		},
		SET_PLAYER_TIME (state, data) {
			state.songTime = data.songTime;
			state.songNowTime = data.songNowTime;
		},
		SET_SONG_LIST (state, data) {
			state.songList.length = 0;
			data.forEach( (value) => {
				state.songList.push(value);
			});
		},
		SET_PLAYER_ISVIEW (state, data) {
			state.isView = data;
		},
		SET_PLAYER_PLAYSTATE (state, data){
			state.playState = data;
		},
		SET_PLAYER_INFO (state , data) {
			data.singerPic && (state.singerPic = data.singerPic);
			data.nowIndex && (state.nowIndex = data.nowIndex);
			data.singerName && (state.singerName = data.singerName);
			data.singName && (state.singName = data.singName);
			data.singerBigPic && (state.singerBigPic = data.singerBigPic);
			data.songid && (state.songid = data.songid);
		}
	},
	getters : {
	    GET_PLAYER_INFO: state => {
	    	return {
	    		singerPic: state.singerPic,
	    		singerName: state.singerName,
	    		singName: state.singName,
	    		nowIndex: state.nowIndex,
	    		singerBigPic: state.singerBigPic,
	    		songid:state.songid
	    	}
	    },
	    GET_SONG_LYRIC: state => {
	    	return state.nowLyric
	    },
	    GET_SEARCH_LIST: state => {
	    	return {
	    		sarchList:state.searchList,
	    		nowPages:state.nowPages,
	    		allPages:state.allPages,
	    		searchKey:state.searchKey
	    	}
	    },
	    GET_SONG_LIST: state => {
	    	return state.songList
	    },
	    GET_PLAYER_ISVIEW : state => {
	    	return state.isView
	    },
	    GET_PLAYER_PLAYSTATE: state => {
	    	return state.playState
	    },
	    GET_PLAYER_TIME : state => {
	    	return {
	    		songTime:state.songTime,
	    		songNowTime:state.songNowTime
	    	}
	    }
	},
	actions : {
		// 播放器面板信息
		PLAYER_ACTION ({ commit, state }, data) {
		   commit('SET_PLAYER_INFO',data);
		},
		// 设置播放器歌曲列表
		SONG_LIST_ACTION ({ commit, state }, data) {
		   commit('SET_SONG_LIST',data);
		},
		PLAYER_ISVIEW_ACTION ({ commit, state }, data) {
		   commit('SET_PLAYER_ISVIEW',data);
		},
		PLAYER_PLAYSTATE_ACTION ({ commit, state }, data) {
		   commit('SET_PLAYER_PLAYSTATE',data);
		},
		PLAYER_TIME_ACTION ({ commit, state }, data) {
		   commit('SET_PLAYER_TIME',data);
		},
		LYRIC_ACTION ({ commit, state }, data) {
		   commit('SET_NOW_LYRIC',data);
		},
		SEARCH_LIST_ACTION ({ commit, state }, data) {
		   commit('SET_SEARCH_LIST',data);
		}
	}
};

