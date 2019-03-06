<template>
  <div id="main-overlay" ref="mainOverlay">
    <app-navigation id="main-nav"
              :prop-is-expanded="navIsExpanded"
              @update-is-expanded="updateNavIsExpanded"
              :prop-is-on-home="isOnHome" />
    <icon-hamburger
            :style="{ display: buttonDisplayState }"
            @update-is-expanded="updateNavIsExpanded(!navIsExpanded)" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AppNavigation from './AppNavigation.vue'
import AppLogo from './AppLogo.vue'
import IconHamburger from './icons/IconHamburger.vue'

export default {
  components: {
    AppNavigation,
    AppLogo,
    IconHamburger
  },
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
    updateNavIsExpanded: function(newValue) {
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
    pointer-events: none;
    * { pointer-events: auto; }
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
  }
</style>
