<template>
  <transition-group name="fade" tag="nav" key="nav"
    :class="{ collapsed: (!isActive && !isOnHome), 'home-nav': isOnHome, moved: (!isOnHome && !(deviceType == 'phone')) }"
    @mouseover="toggle('forward', true)"
    @mouseleave="toggle('reverse', false)">
    <div class="link-wrapper" v-for="(page, index) in pages" :key="page.name" >
      <router-link
        class="link"
        :key="page.name"
        :page="page.name"
        :to="page.path"
        @mouseover="toggle('forward', true)"
        @click.native="toggle('clicked', false)">
        {{ page.name }}
      </router-link>
      <div id="`dot-${index}`" class="dot" :key="`dot_${index}`"></div>
    </div>
    <ul id="sm-links" key="links">
      <li v-for="link in smLinks"
        class="link"
        :key="link.name"
        @mouseenter="hovered = true"
        @mouseleave="hovered = false">
        <a :href="link.path" target="_blank">
          <icon-base :icon-name="link.icon" width="30" height="30">
            <component :is="`icon-${link.icon}`" />
            {{ link.name }}
          </icon-base>
        </a>
      </li>
    </ul>
  </transition-group>
</template>

<script>
import { mapState } from 'vuex'
import EventBus from '../event-bus'

import IconBase from '../components/icons/IconBase'
import IconLinkedin from '../components/icons/social/IconLinkedin'
import IconAngellist from '../components/icons/social/IconAngellist'
import IconGithub from '../components/icons/social/IconGithub'
import IconTwitter from '../components/icons/social/IconTwitter'

export default {
  name: 'AppNavigation',
  components: {
    IconBase,
    IconLinkedin,
    IconAngellist,
    IconGithub,
    IconTwitter
  },
  data: function() {
    return {
      isActive: false,
      pages: [
        { name: 'Home', path: '/'},
        { name: 'Creative Tech', path: '/gallery' },
        { name: 'About', path: '/about'}
      ],
      hovered: false,
      smLinks: [
        { name: 'LinkedIn',
          icon: 'linkedin',
          path: 'https://www.linkedin.com/in/alexander-charette-creativetech/'
        },
        { name: 'Angel List',
          icon: 'angellist',
          path: 'https://angel.co/alexander-charette'
        },
        { name: 'GitHub',
          icon: 'github',
          path: 'https://github.com/AlexCharette'
        },
        { name: 'Twitter',
          icon: 'twitter',
          path: 'https://twitter.com/acharette_wake'
        }
      ]
    }
  },
  computed: {
    ...mapState(['currentPage', 'deviceType']),
    isOnHome: function() {
      return this.currentPage == 'home'
    },
    iconColour: function() {
      return this.hovered ? '#75B4D2' : '#2F4777'
    }
  },
  methods:{
    toggle: function(eventMsg, newState) {
      if (this.isActive == newState) return
      this.isActive = newState
    }
  },
  mounted() {
    if (this.isOnHome) this.isActive = true
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
    top: 0px;
    right: 0px;
    width: 10vw;
    .link-wrapper {
      display: inline-flex;
      flex-flow: row;
      width: 100%;
      text-align: left;
      .link {
        font-family: 'Oatmeal Stout';
        background: linear-gradient(to left, #49CE75, #026DB1);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        filter: saturate(90%);
        text-decoration: none;
        &.router-link-exact-active {
          opacity: 0.75;
        }
        &:not(.router-link-exact-active):hover {
          filter: saturate(150%);
          transition: filter 0.25s ease-out;
        }
      }
      .dot {
        margin: auto;
        margin-right: 0;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: #49CE75;
      }
    }
    #sm-links {
      display: inline-flex;
      margin-top: 0;
      margin-right: auto;
      flex-flow: row;
      justify-content: space-evenly;
      align-items: center;
      list-style-type: none;
      padding: 0;
      padding-top: 20px;
      li {
        min-width: 60px;
        min-height: 45px;
        a {
          position: relative;
          display: flex;
          flex-flow: column;
          justify-content: space-evenly;
          align-content: center;
          text-decoration: none;
          color: #49CE75;
          &:hover svg {
            color: #026DB1;
            transition: color 0.25s ease-out;
          }
        }
      }
    }
    @include desktop-laptop {
      &.home-nav {
        position: relative;
        align-content: flex-start;
        justify-content: flex-start;
        margin-top: 35vh;
        margin-left: 60vw;
        width: 30vw;
        //height: 45vh;
        text-align: left;
        font-size: 70px;
        .dot {
          opacity: 0;
        }
      }
      &.collapsed {
        width: 17vw;
        padding-right: 10px;
        .link-wrapper {
          justify-content: flex-end;
          margin: 0;
          min-width: 100px;
          min-height: 44px;
          padding-top: 1rem;
          //filter: saturate(100%);
          z-index: 999;
          .link {
            opacity: 0;
            font-size: 40px;
            text-align: right;
          }
          .dot {
            opacity: 1;
          }
        }
        #sm-links {
          opacity: 0;
        }
        &:hover, &:focus {
            .link, #sm-links {
              opacity: 1;
              transition: opacity 0.25s ease-out;
              &.router-link-exact-active {
                opacity: 0.75;
              }
            }
            .dot {
              background-color: #026DB1;
              transition: background 0.25s ease-out;
            }
          }
        }
      }
    @include mobile-portrait {
      transition: background-color 0.25s ease;
      a {
        display: none;
        flex: 0 1 auto;
      }
      &:not(.expanded) {
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
