import Vue from 'vue'
import App from './App.vue'
import Home from './pages/Home.vue'
import About from './pages/About.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
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
