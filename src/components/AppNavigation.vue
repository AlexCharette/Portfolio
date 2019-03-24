<template>
  <transition-group name="move-nav" tag="div" ref="wrapper"
    :class="{ expanded: (isActive || isOnHome), 'home-nav': isOnHome, moved: (!isOnHome && !(deviceType == 'phone')) }"
    @mouseover="toggle('forward', true)"
    @mouseleave="toggle('reverse', false)">
    <icon-three-dots key="icon" v-if="(!isOnHome && !(deviceType == 'phone'))" />
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
      isActive: true,
      pages: [
        { name: 'Home', path: '/'},
        { name: 'Creative Tech', path: '/gallery' },
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
    flex-flow: column;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 1em;
    margin-left: -400px;
    top: 0px;
    right: 0px;
    width: 10vw;
    height: 6rem;
    //overflow: hidden;
    opacity: none;
    background-color: none;
    nav {
      display: flex;
      flex-flow: column;
      a {
        display: none;
        text-align: left;
      }
    }
    @include desktop-laptop {
      &:not(.home-nav), &.moved {
          margin-right: 3em;
      }
      &:hover, &:focus,
      &.expanded {
        opacity: 1;
        z-index: 999;
        &:not(.home-nav), &.moved {
          display: inline-flex;
          justify-content: flex-end;
          align-content: center;
          width: 35em;
          min-width: 204px;
          height: 20vh;
          min-height: 321px;
          nav {
            margin-right: 16em;
            width: 350px;
            height: 600px;
            a {
              width: auto;
              text-align: right;
              font-size: 4em;
              background-position: 25px;
            }
          }
        }
        nav {
          width: 600px;
          transition: width 0.25s ease-out;
          opacity: 1;
          a {
            display: inline-block;
            margin: 0;
            width: auto;
            min-width: 100px;
            min-height: 44px;
            padding-top: 1rem;
            text-decoration: none;
            font-family: 'Oatmeal Stout';
            font-size: 5rem;
            background: linear-gradient(to left, #49CE75, #026DB1);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            filter: saturate(100%);
            opacity: 0.75;
            z-index: 999;
            &:hover, &:not(.router-link-exact-active) {
              opacity: 1;
              filter: saturate(150%);
              transition: 0.10s opacity ease-in-out;
              -moz-transition: 0.1s opacity ease-in-out;
              -moz-transition: 0.1s -moz-filter ease-in-out;
              transition: 0.10s filter ease-in-out;
            }
          }
        }
      }
      &.home-nav {
        position: relative;
        //margin: 0 auto;
        margin-top: 35vh;
        margin-left: 60vw;
        width: 30vw;
        height: auto;
        min-height: 44px;
        nav {
          display: flex;
        }
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
