import Vue from 'vue';
import VueRouter from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect: '/main'
}, {
  path: '/main',
  name: 'Main',
  component: () =>
    import( /* webpackChunkName: "about" */ '@views/main/Main'),
  meta: {
    isNavBar: true
  },
  children: [{
    path: 'expire',
    name: 'Expire',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import( /* webpackChunkName: "about" */ '@views/card/Expire.vue'),
    meta: {
      keepAlive: false,
      title: '过期卡汇总',
      isNavBar: true
    }
  }, {
    path: 'publication',
    name: 'Publication',
    component: () =>
      import('@views/card/Publication.vue'),
    meta: {
      keepAlive: false,
      title: '发行卡汇总',
      isNavBar: true
    }
  }, {
    path: 'company',
    name: 'Company',
    component: () =>
      import('@views/card/Company.vue'),
    props: true,
    meta: {
      keepAlive: false,
      title: '单位卡汇总',
      isNavBar: true
    }
  }, {
    path: 'range',
    name: 'Range',
    component: () =>
      import('@views/card/Range.vue'),
    meta: {
      keepAlive: false,
      title: '卡余额汇总',
      isNavBar: true
    }
  }]
}, {
  path: '/publication',
  name: 'Publication',
  component: () =>
    import('@views/card/Publication.vue'),
  meta: {
    keepAlive: false,
    title: '发行卡汇总',
    isNavBar: true
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
  NProgress.start();
  if (window.GlobalVue) {
    window.GlobalVue.$store.commit("removeCancelToken");
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
})


export default router
