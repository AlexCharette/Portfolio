import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentPage: 'home',
    deviceType: ''
  },
  mutations: {
    updateCurrentPage(state, newPage) {
      state.currentPage = newPage
    },
    updateDeviceType(state, newType) {
      state.deviceType = newType
    }
  },
  actions: {
    setCurrentPage(context, newPage) {
      context.commit('updateCurrentPage', newPage)
    },
    setDeviceType(context, screenWidth) {
      let currentType = '';
      if (screenWidth < 567) {
        currentType = 'phone'
      } else if (screenWidth >= 568 && screenWidth <= 1023) {
        currentType = 'tablet'
      } else {
        currentType = 'laptop'
      }
      context.commit('updateDeviceType', currentType)
    }
  }
})
