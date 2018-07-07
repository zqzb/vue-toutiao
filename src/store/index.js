import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'

Vue.use(Vuex)
const state={
	loading:true,
	ifRetrunMsg:'',
	userName:JSON.parse(localStorage.getItem('userName')) || {},
	logined:JSON.parse(localStorage.getItem('loginStatus')) || false,
	Sharebox:false,
	showLog_off:true,
	routerChange:true,
	downLoadMore:false,
	hasIntroduce:false,
	collected:false,
	introduce:'',
	vitality: {
		follow: 14,
		fans: 0,
		visitor: 1
	},	
	list:{
		_all_:[],
		news_hot:[],
		news_society:[],
		news_entertainment:[],
		news_tech:[],
		news_car:[],
		news_sports:[],
		news_finance:[],
		news_military:[],
		news_fashion:[]

	}
};

export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})








