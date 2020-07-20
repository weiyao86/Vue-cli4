import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'Main',
  component: () =>
    import( /* webpackChunkName: "about" */ '@views/main/Index')
}, {
  path: '/expire',
  name: 'Expire',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () =>
    import( /* webpackChunkName: "about" */ '@views/card/Expire.vue'),
  meta: {
    keepAlive: false,
    title: '过期卡汇总'
  }
}, {
  path: '/publication',
  name: 'Publication',
  component: () =>
    import('@views/card/Publication.vue'),
  meta: {
    keepAlive: false,
    title: '发行卡汇总'
  }
}, {
  path: '/company',
  name: 'Company',
  component: () =>
    import('@views/card/Company.vue'),
  meta: {
    keepAlive: false,
    title: '单位卡汇总'
  }
}, {
  path: '/range',
  name: 'Range',
  component: () =>
    import('@views/card/Range.vue'),
  meta: {
    keepAlive: false,
    title: '卡余额汇总'
  }
}, {
  path: '/login',
  name: 'Login',
  component: () =>
    import('@views/login/login'),
  meta: {
    keepAlive: false,
    title: '登录'
  }
}]



// 解决导航栏中的vue-router在3.0版本以上重复点菜单报错问题
// const originalReplace = VueRouter.prototype.replace;
// VueRouter.prototype.replace = function replace(location) {
//   return originalReplace.call(this, location).catch(err => err)
// }


const router = new VueRouter({
  routes
})


router.beforeEach((to, from, next) => {

  if (window.GlobalVue) {
    window.GlobalVue.$store.commit("removeCancelToken");
  }
  next();
});


export default router
