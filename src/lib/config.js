let idx = process.env.NODE_ENV == "production" ? 0 : 1;
const URL_OPTS = ['https://www.xinyingtong.cn', 'http://192.168.2.103/'];
export default {
	install(Vue, opts) {

		let props = {
			BASE_URL: {
				get() {
					return URL_OPTS[idx];
				}
			}
		};


		Object.defineProperties(Vue, props);
	}
}