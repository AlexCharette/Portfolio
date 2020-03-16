<template>
  <div id="app-overlay">
    <!-- <app-logo id="logo"/> -->
    <app-navigation id="main-nav" />
  </div>
</template>

<script>
import EventBus from '../event-bus'
import AppNavigation from './AppNavigation.vue'
import AppLogo from './AppLogo.vue'

export default {
  components: {
    AppNavigation,
    AppLogo,
  },
  data: function() {
    return {
      pageLoaded: false
    }
  },
  methods: {
    setPageLoaded: function() {
      this.pageLoaded = true
    }
  },
  mounted() {
    EventBus.$once('user-data-loaded', this.setPageLoaded)
  }

};
</script>

<style lang="scss" scoped>
  #app-overlay {
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
  }
</style>
