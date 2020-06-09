import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
	path: '/',
	name: 'HelloWorld',
	component: () =>
		import ( /* webpackChunkName: "about" */ '../components/HelloWorld.vue')
}, {
	path: '/expire',
	name: 'Expire',
	// route level code-splitting
	// this generates a separate chunk (about.[hash].js) for this route
	// which is lazy-loaded when the route is visited.
	component: () =>
		import ( /* webpackChunkName: "about" */ '@views/card/Expire.vue'),
	meta: {
		keepAlive: false
	}
}, {
	path: '/publication',
	name: 'Publication',
	component: () =>
		import ('@views/card/Publication.vue'),
	meta: {
		keepAlive: false
	}
}, {
	path: '/company',
	name: 'Company',
	component: () =>
		import ('@views/card/Company.vue'),
	meta: {
		keepAlive: false
	}
}]

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