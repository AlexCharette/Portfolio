<template>
  <div id="app">
    <app-overlay />
    <transition name="router-anim" mode="out-in">
      <router-view class="main" />
    </transition>
  </div>
</template>

<script>
import AppOverlay from './components/AppOverlay.vue';

export default {
  name: 'App',
  components: {
    AppOverlay
  },
  beforeCreate: function() {
    document.body.className = 'body';
  },
  mounted() {
    window.onresize = () => {
        this.$store.dispatch('setDeviceType', window.innerWidth)
    }
  }
};
</script>

<style lang="scss">
  body {
      margin: 0px;
      color: $navy-blue;
  }
  * { box-sizing: border-box; }
</style>


<style lang="scss" scoped>
  #app {
    display: grid;
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
    &.router-anim-enter-active {
      animation: coming 0.25s ease-out;
      animation-delay: 0.5s;
      opacity: 0;
    }
    &.router-anim-leave-active {
      animation: going 0.25s ease-in;
    }
  }

  @keyframes coming {
    from {
      transform: translateX(-50px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes going {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-50px);
      opacity: 0;
    }
  }
</style>
