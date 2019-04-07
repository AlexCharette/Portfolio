import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAnime from 'vue-animejs'
//import Hammer from 'hammerjs'
import VueMq from 'vue-mq'

Vue.config.productionTip = false

Vue.use(VueMq, {
  breakpoints: {
    phone: 567,
    tablet: 1024,
    laptop: 1440,
    desktop: Infinity
  }
})

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

Vue.directive('scroll', {
  inserted: function (el, binding) {
    let f = function (evt) {
      if (binding.value(evt, el)) {
        window.removeEventListener('scroll', f)
      }
    }
    window.addEventListener('scroll', f)
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
