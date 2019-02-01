import Vue from 'vue'
import VueMq from 'vue-mq'
import VueRouter from 'vue-router'

import App from './App.vue'
import Home from './pages/Home.vue'
import About from './pages/About.vue'
import Blog from './pages/Blog.vue'

Vue.use(VueRouter)
Vue.use(VueMq, {
  breakpoints: {
    sm: 450,
    md: 800,
    lg: Infinity
  }
})

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/blog', component: Blog },
  { path: '*' }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

// this.$router.push('/non-existing')
// this.$route.params.pathMatch

/* eslint-disable-next-line no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
