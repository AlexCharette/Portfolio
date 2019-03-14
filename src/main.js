import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAnime from 'vue-animejs'
//import Hammer from 'hammerjs'

Vue.config.productionTip = false

Vue.use(VueAnime)

// Vue.directive("tap", {
//   bind: function(el, binding) {
//     if (typeof binding.value === "function") {
//       const mc = new Hammer(el);
//       mc.get("tap").set({ threshold: 2 });
//       mc.on("tap", binding.value);
//     }
//   }
// });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
