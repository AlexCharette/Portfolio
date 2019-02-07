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
  },
  beforeCreate: function() {
    document.body.className = 'body';
  }
};
</script>

<style lang="scss">
  body {
      margin: 0px;
      color: $navy-blue;
  }
</style>


<style lang="scss" scoped>
  #app {
    top: 0;
    left: 0;
    margin: 0;
    width: 100vw;
    height: 100vh;
    font-family: 'Sign45', 'Fjalla One', serif;
    background-color: #fff;
  }
  .main {
    margin: 0;
    z-index: 1;
  }
</style>
