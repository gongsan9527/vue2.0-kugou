import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const App = resolve => require(['../App.vue'], resolve)
const Index = resolve => require(['../components/Index.vue'], resolve)
const IndexList = resolve => require(['../components/IndexList.vue'], resolve)
const Rank = resolve => require(['../components/Rank.vue'], resolve)
const RankList = resolve => require(['../components/RankList.vue'], resolve)
const BigPlayer = resolve => require(['../components/BigPlayer.vue'], resolve)
const Search = resolve => require(['../components/Search.vue'], resolve)

export default new VueRouter({
	routes: [
		{
			path:'',
			redirect:'/index'
		},
		{
			path:'/index',
			component: App,
			children : [
				{
					path: '',
					component: Index,
					redirect:'/new',
					children: [
						{
							path: '/new',
							component:IndexList
						},
						{
							path: '/rank',
							component:Rank
						}
					]
				},
				{
					path: '/rank_list/:id',
					component:RankList
				},
				{
					path: '/music_content',
					component:BigPlayer
				},
				{
					path: '/search',
					component:Search
				}
			]
		}
	]
})