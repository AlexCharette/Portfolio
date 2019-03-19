<template>
  <transition-group name="move-nav" tag="div" ref="wrapper"
    :class="{ expanded: isActive, 'home-nav': isOnHome, moved: (!isOnHome && !(deviceType == 'phone')) }"
    @mouseover="toggle('forward', true)"
    @mouseleave="toggle('reverse', false)">
    <icon-three-dots key="icon" />
    <nav key="nav"
      @mouseover="toggle('forward', true)"
      @mouseleave="toggle('reverse', false)">
      <router-link v-for="page in pages"
        :key="page.name"
        :page="page.name"
        :to="page.path"
        @mouseover="toggle('forward', true)"
        @click.native="toggle('clicked', false)">
        {{ page.name }}
      </router-link>
    </nav>
  </transition-group>
</template>

<script>
import { mapState } from 'vuex'
import EventBus from '../event-bus'
import IconThreeDots from './icons/IconThreeDots.vue'
import IconHamburger from './icons/IconHamburger.vue'

export default {
  name: 'AppNavigation',
  components: {
    IconThreeDots,
    IconHamburger
  },
  data: function() {
    return {
      isActive: false,
      pages: [
        { name: 'Home', path: '/'},
        { name: 'Creative Technology', path: '/gallery' },
        { name: 'About', path: '/about'}
      ]
    };
  },
  computed: {
    ...mapState(['currentPage', 'deviceType']),
    isOnHome: function() {
      return this.currentPage == 'home'
    }
  },
  methods:{
    toggle: function(eventMsg, newState) {
      if (this.isActive == newState) return
      this.isActive = newState
      EventBus.$emit('animate-icon', eventMsg)
    }
  }
};
</script>

<style lang="scss" scoped>
  #main-nav {
    position: fixed;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-evenly;
    align-items: center;
    top: 0px;
    right: 0px;
    width: 30vw;
    height: 6rem;
    overflow: hidden;
    opacity: none;
    background-color: none;
    a { display: none }
    @include desktop-laptop {
      &:hover, &:focus,
      &.expanded {
        opacity: 1;
        z-index: 999;
        a {
          display: inline-block;
          margin: 0 auto;
          padding-top: 1rem;
          width: 33%;
          min-width: 44px;
          min-height: 44px;
          text-align: center;
          text-decoration: none;
          font-size: 1.5rem;
          z-index: 999;
          &:hover {
            color: $light-blue;
          }
        }
      }
      &.home-nav {
        position: relative;
        //margin: 0 auto;
        margin-top: 62vh;
        margin-left: 55vw;
        min-height: 44px;
      }
    }
    @include mobile-portrait {
      transition: background-color 0.25s ease;
      a {
        display: none;
        flex: 0 1 auto;
      }
      &.expanded {
        top: 0;
        width: 100vw;
        height: 100vh;
        flex-flow: column nowrap;
        background-color: #fff;
        a {
          display: block;
          padding-top: 10%;
          padding-bottom: 10%;
          width: 80vw;
          height: 30vh;
          min-height: 44px;
          font-size: 3rem;
          text-align: center;
          text-decoration: none;
        }
      }
    }
    @include mobile-landscape {
      &.expanded {
        top: 0;
        width: 100vw;
        height: 100vh;
        flex-flow: row wrap;
        a { display: inline-block; }
      }
    }
    @include mobile {
      top: 90vh;
      left: 0;
      width: auto;
      height: auto;
    }
  }
</style>
