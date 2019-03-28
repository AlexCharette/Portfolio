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
  $h-font-scales: (89.76, 67.34, 50.52, 37.90, 28.43, 21.33);
  $p-font-scale: 18;
  $aug-4th-factor: 1.414px;
  body {
    margin: 0px;
    color: $navy-blue;
    overflow: hidden;
    ::-webkit-scrollbar { width: 0 !important; }
    overflow: -moz-scrollbars-none;
    @for $i from 1 through 6 {
      h#{$i} {
        font-size: nth($h-font-scales, $i) * $aug-4th-factor;
        @if ($i <= 2) {
          font-family: 'Oatmeal Stout';
          @include gradient-text;
        } @else {
          font-family: $sans-font-stack;
          color: $charcoal;
        }
      }
    }
    p {
      font-family: $sans-font-stack;
      font-size: $p-font-scale * $aug-4th-factor;
      color: $charcoal;
    }
    a {
      @include gradient-text;
    }
    * { box-sizing: border-box; }
  }
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
