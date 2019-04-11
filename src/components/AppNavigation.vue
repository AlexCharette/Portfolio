<template>
  <transition-group name="fade" tag="nav" key="nav"
    :class="classList">
    <div class="link-wrapper" key="link-wrapper">
      <router-link
        v-for="page in pages" :key="page.name"
        class="link"
        :page="page.name"
        :to="page.path"
        @mouseover="toggle('forward', true)"
        @click.native="toggle('clicked', false)">
        {{ page.name }}
      </router-link>
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
    ...mapState(['currentPage']),
    isOnHome: function() {
      return this.currentPage == 'home'
    },
    usingPhone: function() {
      return (this.$mq == 'phone' || this.$mq == 'tablet')
    },
    iconColour: function() {
      return this.hovered ? '#75B4D2' : '#2F4777'
    },
    classList: function() {
      return {
        collapsed: (this.usingPhone && !this.isActive), 
        'home-nav': (!this.usingPhone && this.isOnHome)
      }
    }
  },
  methods:{
    toggle: function(eventMsg, newState) {
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
    margin-right: 2vw;
    top: 0px;
    right: 0px;
    width: 20vw;
    min-width: 310px;
    .link-wrapper {
      display: inline-flex;
      flex-flow: row;
      justify-content: space-between;
      //align-items: center;
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
        opacity: 0.5;
        font-size: 200%;
        &.router-link-exact-active {
          opacity: 0.25;
        }
        &:not(.router-link-exact-active):hover {
          filter: saturate(150%);
          opacity: 1;
          transition: all 0.25s ease-out;
        }
      }
    }
    #sm-links {
      display: inline-flex;
      margin-top: 0;
      flex-flow: row;
      justify-content: space-evenly;
      align-items: center;
      list-style-type: none;
      padding: 0;
      padding-top: 10px;
      li {
        min-width: 60px;
        min-height: 45px;
        a {
          position: relative;
          float: right;
          display: flex;
          flex-flow: column;
          justify-content: space-evenly;
          align-content: center;
          text-decoration: none;
          color: #49CE75;
          opacity: 0.5;
          &:hover {
            opacity: 1;
            transition: opacity 0.25s ease-out;
            svg {
              color: #026DB1;
              transition: color 0.25s ease-out;
            }
          }
        }
      }
    }
    @include desktop-laptop {
      &.home-nav {
          margin-top: 35vh;
          margin-right: 10vw;
          width: 30vw;
        .link-wrapper {
          flex-flow: column;
          position: relative;
          align-content: flex-start;
          justify-content: flex-start;
          //height: 45vh;
          text-align: left;
          .link {
            font-size: 500%;
            opacity: 1;
            &.router-link-exact-active {
              opacity: 0.75;
            }
            &:not(.router-link-exact-active):hover {
              filter: saturate(150%);
              transition: filter 0.25s ease-out;
            }
          }
        }
        #sm-links {
          margin-right: auto;
          padding-top: 20px;
          li {
            a {
              float: none;
              opacity: 1;
              &:hover {
                opacity: 1;
                transition: opacity 0.25s ease-in-out;
              }
            }
          }
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
          }
        }
      }
  }
</style>
