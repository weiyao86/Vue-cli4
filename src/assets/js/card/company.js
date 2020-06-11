var globalExpireCardConfig = {
  urls: {
    // getListByTime: 'http://192.168.30.84/api/shop.Statistics/getCompanyCard'
    getListByTime: '/shop.Statistics/getCompanyCard'
  }
};

import
NavTestB
from '@components/NavbarTest.vue';
alert(NavTestB)
import MescrollVue from 'mescroll.js/mescroll.vue'

export default ({
  name: "Company",
  components: {
    NavTestB,
    MescrollVue
  },
  data() {
    return {
      mescroll: null,
      mescrollUp: {},
      searchText: '',
      listDetail: [],
      pageNum: 0,
      limit: 10,
      noResult: require("@assets/images/noData.png") // 无结果图片

    }
  },

  watch: {
    searchText(val) {
      this.mescroll.resetUpScroll();
    }
  },

  created() {
    let me = this;

    me.mescrollUp = {
      auto: true,
      callback: me.upCallback,
      page: {
        num: me.pageNum,
        size: me.limit
      },
      empty: {
        warpId: 'ul_wrap',
        icon: me.noResult,
        tip: ""
      }
    }
  },

  mounted() {
    let me = this;
  },
  methods: {

    mescrollInit(mescroll) {

      this.mescroll = mescroll;
    },


    onSearch() {
      let me = this;
      me.mescroll.resetUpScroll();

    },

    upCallback(page) {
      let me = this;

      me.pageNum = page.num;
      me.limit = page.size;
      me.getListByTime();
    },

    getListByTime() {
      let me = this;

      me.$http.axios({
        isLoading: true,
        method: 'post',
        url: globalExpireCardConfig.urls.getListByTime,
        data: {
          name: me.searchText,
          page: me.pageNum,
          limit: me.limit
        }
      }).then(res => {
        res = res.data;
        if (res.code == 1) {
          let curData = res.data.list;

          if (me.pageNum == 1) {
            me.listDetail = [];
          }

          for (let i = 0; i < curData.length; i++) {
            curData[i]['dian_money'] = (+curData[i]['dian_money']).toFixed(2);
            curData[i]['dian_balance'] = (+curData[i]['dian_balance']).toFixed(2);
            curData[i]['ci_money'] = (+curData[i]['ci_money']).toFixed(2);
            curData[i]['ci_balance'] = (+curData[i]['ci_balance']).toFixed(2);
          }

          me.listDetail = me.listDetail.concat(curData);
          me.mescroll.endByPage(curData.length, 6); // res.data.total
        } else {
          me.$toast(res.msg);
        }
      });
    }
  }
});
