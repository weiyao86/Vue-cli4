<template>
  <div class="main-page">
    <div id="iCenter"></div>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <tab-foot-menu v-if="$route.meta.isNavBar"></tab-foot-menu>
  </div>
</template>
<script>
import TabFootMenu from '@components/TabMenu.vue';
import { CellGroup, Cell, Collapse, CollapseItem, Switch } from 'vant';
import VConsole from 'vconsole';
export default {
  name: 'Main',
  data() {
    return {
      wangyiData: []
    }
  },

  components: {
    TabFootMenu,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Switch.name]: Switch
  },
  mounted() {
    let me = this;
    me.initAmap();
    new VConsole();
  },
  methods: {
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
}

</script>
<style lang="scss">
#iCenter {
  height: 300px;
}

</style>
