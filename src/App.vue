<template>
  <div id="app">
    <main-overlay />
    <router-view class="main" />
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

<style lang="scss" scoped>
  .main {
    margin: 0;
    z-index: 1;
  }
</style>
