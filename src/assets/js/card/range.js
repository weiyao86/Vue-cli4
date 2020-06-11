const globalRangeCardConfig = {
  urls: {
    // getCardBalance: 'http://192.168.30.84/api/shop.Statistics/cardBalance'
    getCardBalance: '/shop.Statistics/cardBalance'
  }
};


import {
  NumAdd
} from '@/lib/plug';
import {
  Cell,
  Collapse,
  CollapseItem,
  Switch
} from 'vant';

export default ({
  name: 'Range',
  filters: {
    fixed2(val) {
      if (!val) return 0;

      return val.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d)+)/g, ',');
    }
  },
  components: {
    [Cell.name]: Cell,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Switch.name]: Switch
  },
  data() {
    return {
      activeTab: 1,
      tab: (function() {
        return [{
          name: '有效卡',
          code: 1
        }, {
          name: '过期卡',
          code: 2
        }];
      })(),
      showBorder: false,
      listDetail: [],
      checked: false,
      activeNames: ['1'],
      totalNum: 0,
      totalMoney: 0
    }
  },

  mounted() {
    let me = this;
    me.getCardBalance();
  },
  methods: {

    onTabChange(code) {
      let me = this;
      me.activeTab = code;
      me.getCardBalance();
    },

    onToggleChange(val) {
      let me = this;

      if (val) {
        if (me.listDetail.length) {
          me.activeNames = Array.from({
            length: me.listDetail.length
          }, (v, k) => k);
        }
      } else {
        me.activeNames = [];
      }

    },

    getCardBalance() {
      let me = this;

      me.$http.axios({
        isLoading: true,
        method: 'post',
        url: globalRangeCardConfig.urls.getCardBalance,
        data: {
          type: me.activeTab
        }
      }).then(res => {
        if (res.data.code == 1) {
          me.listDetail = res.data.data;

          let nums = 0,
            moneys = 0;

          me.listDetail.forEach(item => {
            nums = NumAdd(nums, item.num);
            moneys = NumAdd(moneys, item.money);
          })

          me.totalNum = nums;
          me.totalMoney = moneys;

        } else {
          me.$toast(res.msg);
        }
      });
    }
  }
})
