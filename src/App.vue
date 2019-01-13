<template>
  <div id="app">
    <main-nav />
    <router-view />
  </div>
</template>

<script>
import MainNav from './components/MainNav.vue'

export default {
  name: 'App',
  components: {
    MainNav
  }
}
</script>

<style lang="scss">
  @font-face {
    font-family: 'Sign 45';
    src: url('./assets/fonts/Sign45.otf');
  }

  body {
    font-family: 'Sign 45', serif;
  }

  a {
      color: white;
      &.router-link-exact-active {
          color: lightgray;
      }
  }
</style>

<style lang="scss" scoped>
</style>
