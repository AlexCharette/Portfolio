<template>
  <div id="main-overlay" ref="mainOverlay">
    <router-link class="link" :to="'/'" page="Home">
      <span id="logo" />
    </router-link>
    <main-nav id="main-nav"
              :prop-is-expanded="navIsExpanded"
              @update-is-expanded="updatePropNavIsExpanded" />
    <button class="nav-btn"
            :style="{ display: buttonDisplayState }"
            @click="updatePropNavIsExpanded(!navIsExpanded)" />
  </div>
</template>

<script>
import MainNav from './MainNav.vue';

export default {
  components: { MainNav },
  data: function () {
    return {
      navIsExpanded: false
     }
  },
  computed: {
    isOnHome: function() {
      return (this.$store.state.currentPage == 'home')
    },
    deviceIsPhone: function() {
      return (this.$store.state.deviceType == 'phone')
    },
    deviceIsMobile: function() {
      return (this.$store.state.deviceType == 'phone') || (this.$store.state.deviceType == 'tablet')
    },
    buttonDisplayState: function() {
      if (this.isOnHome) { return 'block';}
      else { return 'none'; }
    }
  },
  methods: {
    updatePropNavIsExpanded(newValue) {
      this.navIsExpanded = newValue;
    }
  },
  mounted() {
    window.onresize = () => {
        this.$store.dispatch('setDeviceType', window.innerWidth)
    }
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
