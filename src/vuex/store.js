import Vue from "vue";
import Vuex from 'vuex';
import modulePlayer from './modules/Player.js';
// import moduleDetection from './modules/moduleDetection.js';
Vue.use(Vuex);

export default new Vuex.Store({  
	modules : {
		player: modulePlayer
	}
});