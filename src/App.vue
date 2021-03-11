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
  methods: {
    handleScroll: function(scrollDirection) {
      var scrollObj,
          scrollThreshold = 5
      if (scrollDirection == 'up') {
          this.scrollCount.down = 0
          this.scrollCount.up++
          //if (scrollCount.up >= scrollThreshold) this.scrollCount.up = scrollThreshold
          scrollObj = {
            direction: scrollDirection,
            count: this.scrollCount.up
          }
      } else if (scrollDirection == 'down') {
          this.scrollCount.up = 0
          this.scrollCount.down++
          //if (scrollCount.down >= ) this.scrollCount.down = 5
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
    const state = this
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    window.onkeydown = (e) => {
      if (e.key == 'Escape' || e.key == 'Backspace') {
        EventBus.$emit('reverse-key-pressed', e)
      }
    }
    window.addEventListener('resize', () => {
      vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    })
    window.addEventListener('wheel', function(e) {
      if (!state.$store.state.shouldDisplayProject) {
        if (e.deltaY < 0) {
          state.handleScroll('up')
        }
        if (e.deltaY > 0) {
          state.handleScroll('down')
        }
      }
    })
    EventBus.$on('page-changed', function(name) {
      const body = document.getElementById('app').closest('body')
      if (name == 'home' || (name == 'gallery' && !state.$store.state.shouldDisplayProject)) {
        body.classList.add('lock-scroll')
      }
    })
  }
};
</script>

<style lang="scss">

  body {
    margin: 0px;
    min-height: 100vh;
    min-height: -webkit-fill-available;
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);
    ::-webkit-scrollbar { width: 0 !important; }
    overflow: -moz-scrollbars-none;
    &.lock-scroll {
      overflow: hidden;
    }
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
      //font-size: nth($h-font-scales, 6) * $aug-4th-factor;
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
