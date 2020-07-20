import Vue from 'vue'
import App from './App.vue'
import Plug from './lib/plug'
import CommonHttp from './lib/commonHttp'
import Config from './lib/config'
import Adjust from './lib/adjust'
import {
  Toast,
  Form,
  Field,
  Button
} from 'vant';
import router from './router'

import store from './store'
import 'animate.css'


Vue.config.productionTip = false

Vue.use(Plug, CommonHttp);
Vue.use(Config);
Vue.use(require('vue-wechat-title'));

var attachFastClick = require('fastclick');
attachFastClick.attach(document.body);

// 将所有 loading Toast 设置为背景不可点击
Toast.setDefaultOptions('loading', {
  forbidClick: true
});
Vue.use(Toast).use(Form).use(Field).use(Button);

window.GlobalVue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
