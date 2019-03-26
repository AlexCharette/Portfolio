<template>
  <div id="app">
    <app-background />
    <transition name="router-anim" mode="out-in">
      <router-view class="main" />
    </transition>
    <app-overlay />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import EventBus from './event-bus'
import AppOverlay from './components/AppOverlay.vue'
import AppBackground from './components/AppBackground.vue'

export default {
  name: 'App',
  components: {
    AppOverlay,
    AppBackground
  },
  data: function() {
    return {
      scrollCount: {
        up: 0,
        down: 0
      }
    }
  },
  computed: {
    ...mapState(['currentPage']),
    galleryClass: function() {
      return (this.currentPage == 'gallery') ? 'on-gallery' : ''
    }
  },
  methods: {
    handleScroll: function(scrollDirection) {
      var scrollObj
      if (scrollDirection == 'up') {
          this.scrollCount.down = 0
          this.scrollCount.up++
          scrollObj = {
            direction: scrollDirection,
            count: this.scrollCount.up
          }
      } else if (scrollDirection == 'down') {
          this.scrollCount.up = 0
          this.scrollCount.down++
          scrollObj = {
            direction: scrollDirection,
            count: this.scrollCount.down
          }
      }
      EventBus.$emit('scrolling', scrollObj)
    }
  },
  beforeCreate: function() {
    document.body.className = 'body'
  },
  mounted() {
    window.onresize = () => {
      this.$store.dispatch('setDeviceType', window.innerWidth)
    }
    window.onkeydown = (e) => {
      if (e.key == 'Escape' || e.key == 'Backspace') {
        EventBus.$emit('reverse-key-pressed', e)
      }
    }
    const state = this
    window.addEventListener('wheel', function(e) {
      if (e.deltaY < 0) {
        state.handleScroll('up')
      }
      if (e.deltaY > 0) {
        state.handleScroll('down')
      }
    })
  }
};
</script>

<style lang="scss">
// TODO: Change font-size
  body {
    margin: 0px;
    color: $navy-blue;
    overflow: hidden;
    h1 {
      font-family: 'Oatmeal Stout';
      font-size: 8rem;
      @include gradient-text;
    }
    h2 {
      font-family: 'Oatmeal Stout';
      font-size: 6rem;
      @include gradient-text;
    }
    h3 {
      font-family: $sans-font-stack;
      font-size: 3rem;
      color: $charcoal;
    }
    h5 {
      font-family: $sans-font-stack;
      font-size: 2rem;
      color: $charcoal;
    }
    p {
      font-family: $sans-font-stack;
      font-size: 1rem;
      color: $charcoal;
    }
  }
  a {
    @include gradient-text;
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
    background-color: $off-white;
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
  }

  @keyframes coming {
    from {
      transform: translate3d(-50px, 0, 0);
      opacity: 0;
    }
    to {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }

  @keyframes going {
    from {
      transform: translate3d(0, 0, 0);
    }
    to {
      transform: translate3d(-50px, 0, 0);
      opacity: 0;
    }
  }
</style>
