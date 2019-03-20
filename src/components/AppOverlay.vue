<template>
  <div id="main-overlay" ref="mainOverlay">
    <pre-loader v-if="!pageLoaded" />
    <app-navigation id="main-nav"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import EventBus from '../event-bus'
import AppNavigation from './AppNavigation.vue'
import AppLogo from './AppLogo.vue'
import PreLoader from './PreLoader.vue'

export default {
  components: {
    AppNavigation,
    AppLogo,
    PreLoader
  },
  data: function() {
    return {
      pageLoaded: false
    }
  },
  computed: {
    ...mapState(['currentPage']),
    isOnHome: function() {
      return (this.currentPage == 'home')
    }
  },
  methods: {
    setPageLoaded: function() {
      console.log("Page loaded!")
      this.pageLoaded = true
    }
  },
  mounted() {
    EventBus.$once('user-data-loaded', this.setPageLoaded)
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
