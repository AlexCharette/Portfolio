<template>
  <div id="app">
    <main-overlay />
    <router-view />
  </div>
</template>

<script>
import MainOverlay from './components/MainOverlay.vue';

export default {
  name: 'App',
  components: {
    MainOverlay
  }
};
</script>

<style lang="scss">
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
