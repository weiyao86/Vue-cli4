<template>
    <van-tabbar v-model="active" fixed route>
  <van-tabbar-item icon="home-o" replace to="/expire">标签</van-tabbar-item>
  <van-tabbar-item icon="search" replace to="/publication" dot>标签</van-tabbar-item>
  <van-tabbar-item icon="friends-o" replace to="/company" badge="5">标签</van-tabbar-item>
  <van-tabbar-item icon="setting-o" badge="20">标签</van-tabbar-item>
</van-tabbar>
</template>
<script>
    import { Tabbar, TabbarItem } from 'vant';
    export default({
        name:'TabFootMenu',
        components:{
            [Tabbar.name]:Tabbar,[TabbarItem.name]:TabbarItem
        },
        data(){
            return {
                active:0
            }
        }
    })
</script>