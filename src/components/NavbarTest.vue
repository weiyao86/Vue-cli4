<template>
  <div>
    <!-- <van-nav-bar fixed></van-nav-bar> -->
    <van-nav-bar :title="title" :left-text="leftText" :right-text="rightText" @click.preventDefault @click-left="clickLeft" fixed :left-arrow='leftArrow'></van-nav-bar>
  </div>
</template>
<script>
import {
  NavBar
} from 'vant';

export default ({
  name: 'NavTestB',
  props: {
    'title': {
      type: String,
      default: '标题'
    },
    'leftText': {
      type: String,
      dafault: '返回'
    },
    'rightText': {
      type: String,
      dafault: '按钮'
    },
    'leftArrow': {
      type: Boolean,
      default: true
    }
  },
  components: {
    [NavBar.name]: NavBar
  },
  methods: {
    clickLeft() {

      this.$router ? this.$router.back() : window.history.back();
    }
  }
});

</script>
