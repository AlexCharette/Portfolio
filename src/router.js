import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Gallery from './views/Gallery.vue'
import About from './views/About.vue'
import EventBus from './event-bus'
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
      path: '/gallery',
      name: 'gallery',
      component: Gallery
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '*',
      component: Home
    }
  ]
})

router.beforeEach((to, from, next) => {
  store.commit('updateCurrentPage', to.name)
  EventBus.$emit('page-changed', to.name)
  next()
})

export default router;