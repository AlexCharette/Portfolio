import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from './store.js'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import(/* webpackChunkName: "blog" */ './views/Blog.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log("Page changed to: " + to.name)
  store.commit('updateCurrentPage', to.name)
  next()
})

export default router;