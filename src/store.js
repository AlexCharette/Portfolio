import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentPage: 'home'
  },
  mutations: {
    updateCurrentPage(state, newPage) {
      state.currentPage = newPage
    }
  },
  actions: {
    setCurrentPage(context, newPage) {
      console.log("Current page is now: " + newPage)
      context.commit('updateCurrentPage', newPage)
    }
  }
})
