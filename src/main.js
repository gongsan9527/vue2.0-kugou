import Vue from 'vue'
import router from './router/router.js'
import store from './vuex/store.js'
import VueResource from "vue-resource"

import Flexible from '../static/js/flexible.js'
import tools from '../static/js/tools.js'
import '../static/css/flexible.css'
import '../static/css/normalize.css'
import 'mint-ui/lib/style.css'

Vue.use(VueResource);

new Vue({
	el: '#app',
	router,
	store,
	VueResource
});







