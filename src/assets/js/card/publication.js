var globalExpireCardConfig = {
	urls: {
		// getListByTime: 'http://192.168.30.84/api/shop.Statistics/getCardProductNum'
		getListByTime: '/shop.Statistics/getCardProductNum'
	}
};
// import ECharts from 'vue-echarts/components/ECharts.vue'
// Vue.component('v-chart',VueECharts);
import {
	Popup,
	DatetimePicker
} from 'vant';

import {
	DateFormat
} from '@/lib/plug';

export default ({
	name: "Publication",
	components: {
		[Popup.name]: Popup,
		[DatetimePicker.name]: DatetimePicker
	},
	data() {
		return {
			showYear: false,
			yearColumns: ['2020'],
			activeTab: 1,
			tab: (function() {
				return [{
					name: '点卡',
					code: 1
				}, {
					name: '次卡',
					code: 2
				}];
			})(),
			totalCardNum: 0,
			curDateTime: null,
			curDate: new Date(),
			curYear: null,
			listDetail: [],
			polar: {
				title: {
					text: '折线图堆叠'
				},
				tooltip: {
					trigger: 'axis'
				},
				legend: {
					data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true
				},
				toolbox: {
					feature: {
						saveAsImage: {}
					}
				},
				xAxis: {
					type: 'category',
					boundaryGap: false,
					data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
				},
				yAxis: {
					type: 'value'
				},
				series: [{
					name: '邮件营销',
					type: 'line',
					stack: '总量',
					data: [120, 132, 101, 134, 90, 230, 210]
				}, {
					name: '联盟广告',
					type: 'line',
					stack: '总量',
					data: [220, 182, 191, 234, 290, 330, 310]
				}, {
					name: '视频广告',
					type: 'line',
					stack: '总量',
					data: [150, 232, 201, 154, 190, 330, 410]
				}, {
					name: '直接访问',
					type: 'line',
					stack: '总量',
					data: [320, 332, 301, 334, 390, 330, 320]
				}, {
					name: '搜索引擎',
					type: 'line',
					stack: '总量',
					data: [820, 932, 901, 934, 1290, 1330, 1320]
				}],
				animationDuration: 2000
			}

		}
	},

	mounted() {
		let me = this;

		me.curDateTime = DateFormat(me.curDate, 'yyyy-MM-dd');
		me.initSetting();
		me.getListByTime();
	},
	methods: {

		initSetting() {
			let me = this;


		},

		calcNum(now, prev) {
			let me = this;
			let cur = now - prev;
			return cur >= 0 ? '+' + cur : cur;

		},

		onConfirm(value, index) {
			let me = this;
			me.showYear = false;
			me.curDateTime = DateFormat(value, 'yyyy-MM-dd');
			me.getListByTime();
		},

		onTabChange(code) {
			let me = this;
			me.activeTab = code;
			me.getListByTime();
		},

		getListByTime() {
			let me = this;

			me.$http.axios({
				isLoading: true,
				method: 'post',
				url: globalExpireCardConfig.urls.getListByTime,
				data: {
					date: me.curDateTime,
					type: me.activeTab
				}
			}).then(res => {
				res = res.data;
				if (res.code == 1) {
					let len = res.data.length,
						tempTotal = 0;
					for (let i = 0; i < len; i++) {
						res.data[i]['noLine'] = false;
						tempTotal += (+res.data[i]['dayNum']);
					}
					if (len % 2 == 0) {
						res.data[len - 2]['noLine'] = true;
						res.data[len - 1]['noLine'] = true;
					} else {
						res.data[len - 1]['noLine'] = true;
					}
					me.listDetail = res.data;
					me.totalCardNum = tempTotal

				} else {
					me.$toast(res.msg);
				}
			});
		}
	}
});