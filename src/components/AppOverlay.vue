<template>
  <div id="main-overlay" ref="mainOverlay">
    <router-link class="link" :to="'/'" page="Home">
      <span id="logo" />
    </router-link>
    <app-navigation id="main-nav"
              :prop-is-expanded="navIsExpanded"
              @update-is-expanded="updatePropNavIsExpanded" 
              :prop-is-on-home="isOnHome" />
    <button class="nav-btn"
            @mouseover="showNavElems = true" 
            @mouseout="showNavElems = false"
            :style="{ display: buttonDisplayState }"
            @click="updatePropNavIsExpanded(!navIsExpanded)" />
  </div>
</template>

<script>
import AppNavigation from './AppNavigation.vue'
import { mapState } from 'vuex'

export default {
  components: { AppNavigation },
  data: function () {
    return {
      navIsExpanded: false
     }
  },
  computed: {
    ...mapState(['currentPage', 'deviceType']),
    isOnHome: function() {
      return (this.currentPage == 'home')
    },
    deviceIsPhone: function() {
      return (this.deviceType == 'phone')
    },
    deviceIsMobile: function() {
      return (this.deviceType == 'phone') || (this.deviceType == 'tablet')
    },
    buttonDisplayState: function() {
      if (this.isOnHome) { return 'block';}
      else { return 'none'; }
    }
  },
  methods: {
    updatePropNavIsExpanded: function(newValue) {
      this.navIsExpanded = newValue
    },
     initNavIsExpanded: async function(newState) {
      this.navIsExpanded = newState
    }
  },
  mounted() {
    let navState = (this.deviceIsPhone || this.isOnHome) ? false : true
    this.initNavIsExpanded(navState)
  }
};
</script>

<style lang="scss" scoped>
  #main-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    width: 100%;
    height: 100%;
    z-index: 10;
    #logo {
      display: inline-block;
      min-width: 44px;
      min-height: 44px;
      background-image: url('~@/assets/images/logo-large.png');
      .link {
        min-width: 44px;
        min-height: 44px;
        width: 100%;
        height: 100%;
      }
    }
    .nav-btn {
      position: relative;
      margin: 0 auto;
      margin-top: -37px;
      width: 20vw;
      min-height: 44px;
      z-index: 0;
      @include mobile {
        display: block !important;
        position: fixed;
        bottom: 0px;
        right: 0px;
        margin-right: 1rem;
        margin-bottom: 1rem;
        min-width: 44px;
        min-height: 44px;
        z-index: 999;
      }
    }
  }
</style>
