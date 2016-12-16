import Vue from "vue";
import Vuex from 'vuex';
import modulePlayer from './modules/Player.js';
Vue.use(Vuex);

export default new Vuex.Store({  
	modules : {
		player: modulePlayer
	}
});