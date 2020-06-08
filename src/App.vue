<template>
  <div id="app">
    <keep-alive>
       <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>

      <tab-foot-menu></tab-foot-menu>
  </div>
</template>

<script>
  import TabFootMenu from '@components/TabMenu.vue'
  export default({
    name:'App',
    components:{
      TabFootMenu
    }
  })
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

</style>
