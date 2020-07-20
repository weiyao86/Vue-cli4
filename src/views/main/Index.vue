<template>
  <div class="page">
    <div id="iCenter"></div>
    <div class="vip-title-wrap">
      <span class="item"><i class="vip"></i>菜单</span>
      <span class="item total"></span>
    </div>
    <div class="content">
      <van-cell class="title-wrap" center title="展开/收起" :border="showBorder">
        <template #right-icon>
          <van-switch v-model="checked" size="24" active-color="#ff7700" @change="onToggleChange" />
        </template>
      </van-cell>
      <van-collapse v-model="activeNames">
        <template v-for="(item,idx) in menuList">
          <van-collapse-item :title="item.name" :name="idx" :key="idx">
            <van-cell-group :border="showBorder">
              <template v-for="(menu,i) in item.list">
                <van-cell :title="menu.name" is-link :to="menu.link" :key="i" />
              </template>
            </van-cell-group>
          </van-collapse-item>
        </template>
      </van-collapse>
    </div>
  </div>
</template>
<script>
import { CellGroup, Cell, Collapse, CollapseItem, Switch } from 'vant';

import VConsole from 'vconsole'

export default ({
  name: 'Main',
  components: {
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Switch.name]: Switch
  },
  data() {
    return {
      checked: true,
      showBorder: false,
      activeNames: [],
      menuList: [{
        name: '卡相关',
        list: [{
          name: '过期卡汇总',
          link: '/expire'
        }, {
          name: '发行汇总',
          link: '/publication'
        }, {
          name: '单位卡汇总',
          link: '/company'
        }, {
          name: '卡余额汇总',
          link: '/range'
        }]
      }, {
        name: '登录',
        list: [{
          name: '登录',
          link: '/login'
        }]
      }]
    }
  },
  created() {
    let me = this;
    if (me.menuList.length) {
      me.activeNames = Array.from({
        length: me.menuList.length
      }, (v, k) => k);
    }

    let vConsole = new VConsole();
  },
  mounted() {
    let me = this;
    me.initAmap();
  },
  methods: {
    onToggleChange(val) {
      let me = this;

      if (val) {
        if (me.menuList.length) {
          me.activeNames = Array.from({
            length: me.menuList.length
          }, (v, k) => k);
        }
      } else {
        me.activeNames = [];
      }
    },

    //测试地图
    initAmap() {
      let me = this;
      let amap = new AMap.Map("iCenter"),
        geolocation;
      AMap.plugin('AMap.Geolocation', function() {
        geolocation = new AMap.Geolocation({
          timeout: 10000,
          GeoLocationFirst: false,
          maximumAge: 0,
          // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
          buttonOffset: new AMap.Pixel(10, 20),
          buttonPosition: 'RB'
        });
        amap.addControl(geolocation);
        geolocation.getCurrentPosition();

        AMap.event.addListener(geolocation, 'complete', function(data) {
          data.position.getLng();
          data.position.getLat();
          alert('获取当前位置成功!')
        })
        AMap.event.addListener(geolocation, 'error', function(data) {

          if (data.info == 'FAILED') {
            alert('获取当前位置失败!')
          }
        })

      });

      // setTimeout(() => {
      // window.location.href = "https://uri.amap.com/marker?position=116.473195,39.993253"
      // }, 5000)


    }
  }
});

</script>
<style lang="scss">
#iCenter {
  height: 300px;
}

.vip-title-wrap {
  flex: 1;
  display: flex;
  flex-flow: column;
  padding: 0.625rem 1.0rem;
  color: #333;
  font-size: 0.875rem;
  align-items: center;
  justify-content: center;
}

.range-wrap {
  background: #fff;
  border-bottom: 1px solid #f5f5f5;
  padding: 0 0.3125rem;

  .van-collapse-item {
    margin-bottom: 0.9375rem;
    border-radius: 0.625rem;
    overflow: hidden;

    .van-collapse-item__title--expanded::after {
      display: none;
    }

    .van-cell--clickable,
    .van-collapse-item__content {
      background: #f5f5f5;
    }
  }

}

</style>
