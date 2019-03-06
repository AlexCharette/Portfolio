<template>
  <transition-group
    name="expand" tag="nav"
    :class="{ expanded: isExpanded, collapsed: !isExpanded, 'home-nav': isOnHome }">
    <router-link
      v-for="page in pages"
      :key="page.name"
      :page="page.name"
      :to="page.path"
      @click="updateExpandedStatus">
      {{ page.name }}
    </router-link>
  </transition-group>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AppNavigation',
  components: {

  },
  props: ['propIsExpanded', 'propIsOnHome'],
  data: function() {
    return {
      pages: [
        { name: 'Home', path: '/'},
        { name: 'Creative Technology', path: '/gallery' },
        { name: 'About', path: '/about'}
      ]
    };
  },
  computed: {
    ...mapState(['currentPage']),
    isExpanded: function () {
      return this.propIsExpanded
    },
    isOnHome: function() {
      return this.propIsOnHome
    }
  },
  methods:{
    updateExpandedStatus: function(event) {
      this.$emit("update-is-expanded", !this.isExpanded)
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
  width: 50vw;
  height: 3rem;
  overflow: hidden;
  background-color: none;
  &.collapsed {
    background-color: none;
    a { display: none; }
  }
  @include desktop-laptop {
    &.home-nav {
      position: relative;
      margin: 0 auto;
      margin-top: 75vh;
      min-height: 44px;
      a { z-index: 0; }
      &.expanded {
        a { z-index: 999; }
      }
    }
  }
  a {
    margin: 0 auto;
    padding-top: 1rem;
    width: 33%;
    min-width: 44px;
    min-height: 44px;
    text-align: center;
    text-decoration: none;
    font-size: 1.5rem;
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
    right: 0;
    width: auto;
    height: auto;
  }
}
</style>
