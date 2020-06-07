import Vue from 'vue';

export default ({
	install(Vue, options) {
		let prop = {};
		//通用http
		let cmpName = options && options['cmpName'] || '';
		if (cmpName == "axios") {
			prop['$http'] = {
				get() {
					return options;
				}
			}
		}

		Object.defineProperties(Vue.prototype, prop);
	}
})