<template>
  <nav id="main-nav" :class="{ expanded: isExpanded }">
    <router-link
      v-for="page in pages"
      :key="page.id"
      :page="page.name"
      :to="page.path"
      v-on:click.native="updateExpandedStatus"
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
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Blog', path: '/blog' }
      ]
    };
  },
  computed: {
    isExpanded: function () {
      return this.propIsExpanded;
    }
  },
  methods:{
    updateExpandedStatus: function(event) {
      this.$emit("update-is-expanded", !this.isExpanded);
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
    a {
      display: none;
      flex: 0 1 auto;
    }
    &.expanded {
      top: 0;
      width: 100vw;
      height: 100vh;
      flex-flow: column nowrap;
      background-color: #333;
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
