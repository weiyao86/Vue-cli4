<template>
  <van-tabbar v-model="active" fixed route>
    <van-tabbar-item icon="home-o" replace to="/expire">过期卡汇总</van-tabbar-item>
    <van-tabbar-item icon="search" replace to="/publication">发行汇总</van-tabbar-item>
    <van-tabbar-item icon="search" class="animate__animated animate__heartBeat" replace to="/">主页</van-tabbar-item>
    <van-tabbar-item icon="friends-o" replace to="/company">单位卡汇总</van-tabbar-item>
    <van-tabbar-item icon="setting-o" replace to="/range">卡余额汇总</van-tabbar-item>
  </van-tabbar>
</template>
<script>
import { Tabbar, TabbarItem } from 'vant';
export default ({
  name: 'TabFootMenu',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  data() {
    return {
      active: 0
    }
  }
})

</script>
