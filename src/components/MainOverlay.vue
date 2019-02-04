<template>
  <div id="main-overlay">
    <router-link class="link" :to="'/'" page="Home">
      <span id="logo" />
    </router-link>
    <main-nav :prop-is-expanded="navIsExpanded"
              @update-is-expanded="onUpdatePropNavIsExpanded" />
    <button class="nav-btn" @click="navIsExpanded = !navIsExpanded" />
  </div>
</template>

<script>
import MainNav from './MainNav.vue';

export default {
  components: {
    MainNav
  },
  data: function () {
    return {
      navIsExpanded: false
    }
  },
  methods: {
    onUpdatePropNavIsExpanded(newValue) {
      this.navIsExpanded = newValue;
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
      display: none;
      @include mobile {
        display: block;
        position: fixed;
        bottom: 0px;
        right: 0px;
        margin-right: 1rem;
        margin-bottom: 1rem;
        min-width: 44px;
        min-height: 44px;
      }
    }
  }
</style>
