<template>
  <nav id="main-nav" :class="{ expanded: isExpanded, collapsed: (!isExpanded || isOnHome), 'home-nav': isOnHome }">
    <router-link
      v-for="page in pages"
      :key="page.id"
      :page="page.name"
      :to="page.path"
      v-on:click.native="updateExpandedStatus, changeCurrentPage(page.name)"
    >
      {{ page.name }}
    </router-link>
  </nav>
</template>

<script>
export default {
  name: 'MainNav',
  props: ['propIsExpanded'],
  data: function() {
    return {
      pages: [
        { name: 'Home', path: '/'},
        { name: 'About', path: '/about'},
        { name: 'Blog', path: '/blog'}
      ]
    };
  },
  computed: {
    isExpanded: function () {
      return this.propIsExpanded;
    },
    isOnHome: function() {
      return (this.$store.state.currentPage == 'home')
    }
  },
  methods:{
    changeCurrentPage(newPage) {
      this.$store.dispatch('setCurrentPage', newPage.toLowerCase())
    },
    updateExpandedStatus: function(event) {
      this.$emit("update-is-expanded", !this.isExpanded)
    }
  }
};
</script>

<style lang="scss" scoped>
#main-nav {
  position: fixed;
  display: inline-flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
  align-items: center;
  top: 0px;
  right: 0px;
  width: 40vw;
  height: 3rem;
  overflow: hidden;
  background-color: none;
  &.home-nav {
    top: 20rem;
    right: 30rem;
  }
  a {
    margin: 0 auto;
    padding-top: 1rem;
    width: 25%;
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
    &.collapsed {
      background-color: none;
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
  @include tablet-phone-landscape {
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
