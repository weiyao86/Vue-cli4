const globalExpireCardConfig = {
	urls: {
		// getMonthByYear: 'http://192.168.30.84/api/shop.Statistics/getExpiredCard'
		getMonthByYear: '/shop.Statistics/getExpiredCard' //https://www.xinyingtong.cn/api
	}
};
import Vue from 'vue'
import {
	Popup,
	Picker
} from 'vant';

export default ({
	name: 'Expire',
	components: {
		[Popup.name]: Popup,
		[Picker.name]: Picker
	},
	data() {
		return {
			showYear: false,
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
			curTime: null,
			defaultYearIdx: 0,
			curYear: null,
			monthData: [],
			curMonth: '',
			dayList: [],
			yearColumns: (function() {
				let cur = 1980,
					rst = [];
				while (cur++ < 2040) {
					rst.push(cur);
				}
				return rst
			})(),

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

	watch: {
		curYear(val) {
			this.getMonthListByYear();
		}
	},
	mounted() {
		let me = this;
		let curTime = new Date();
		me.curYear = curTime.getFullYear();

		me.defaultYearIdx = me.yearColumns.indexOf(me.curYear);

		me.initSetting();

	},
	methods: {

		initSetting() {
			let me = this;

		},

		onConfirm(value, index) {
			let me = this;
			me.showYear = false;
			me.curYear = value;
		},

		onTabChange(code) {
			let me = this;
			me.activeTab = code;
			me.getMonthListByYear();
		},

		chooseMonth(month) {
			let me = this;
			me.curMonth = month;
			me.getDayListByYearAndMonth();
		},

		getMonthListByYear() {
			let me = this;

			me.$http.axios({
				method: 'post',
				url: globalExpireCardConfig.urls.getMonthByYear,
				data: {
					year: me.curYear,
					type: me.activeTab
				}
			}).then(res => {
				if (res.data.code == 1) {

					//12个月
					let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
						rst = [],
						data = res.data.data;

					for (let i = 1; i <= arr.length; i++) {
						let temp = i;
						if (('' + i).length == 1) {
							temp = '0' + i;
						}
						rst.push({
							month: i,
							num: data[temp]
						});
					}
					me.monthData = rst;
					me.curMonth = new Date().getMonth() + 1;

					me.getDayListByYearAndMonth();

				} else {
					me.$toast(res.data.msg);
				}
			});
		},

		getDayListByYearAndMonth() {
			let me = this;

			me.$http.axios({
				isLoading: true,
				method: 'post',
				url: globalExpireCardConfig.urls.getMonthByYear,
				data: {
					year: me.curYear,
					month: me.curMonth,
					type: me.activeTab
				}
			}).then(res => {

				let month = new Date(me.curYear, me.curMonth, 0);
				let days = month.getDate()
				if (res.data.code == 1) {
					let maxArr = [],
						rst = [],
						data = res.data.data;

					for (let key in data) {
						maxArr.push(data[key]);
					}

					//取最大值
					let maxNum = Math.max.call(null, ...maxArr);

					for (let i = 1; i <= days; i++) {
						let temp = i;
						if (('' + i).length == 1) {
							temp = '0' + i;
						}
						rst.push({
							day: i,
							num: data[temp],
							maxNum: maxNum == data[temp] ? maxNum : ''
						});
					}
					me.dayList = rst;

				} else {
					me.$toast(res.msg);
				}
			});
		}
	}
})