import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		cancelTokenList: []
	},
	mutations: {
		setCancelToken(state, cancel) {
			state.cancelTokenList.push(cancel);
		},

		removeCancelToken(state, opts) {
			for (let i = state.cancelTokenList.length - 1; i >= 0; i--) {
				state.cancelTokenList[i].call(null, '取消中。。。');
				state.cancelTokenList.splice(i, 1);
			}
			console.log(state.cancelTokenList)
		}

	},
	actions: {},
	modules: {}
})