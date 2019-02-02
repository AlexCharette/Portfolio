<template>
  <nav
    id="main-nav"
    :class="{ expanded: isExpanded }"
  >
    <router-link
      v-for="page in pages"
      :key="page.id"
      :page="page"
      :to="page.path"
    >
      {{ page.name }}
    </router-link>
    <button
      class="nav-btn"
      @click="isExpanded = !isExpanded"
    />
  </nav>
</template>

<script>
export default {
  name: 'MainNav',
  data: function () {
    return {
      isExpanded: false,
      pages: [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Blog', path: '/blog' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  #main-nav {
    position: fixed;
    top: 0;
    overflow: hidden;
    background-color: #333;
    @media only screen
    and (max-width: 800px)
    and (orientation: portrait)  {
      // Fix the nav to the bottom, collapsed
      display: inline-flex;
      flex-flow: row-reverse nowrap;
      justify-content: space-evenly;
      align-items: center;
      position: absolute;
      top: 90vh;
      left: 0;
      width: 100vw;
      height: 10vh;
      a {
        display: none;
        flex: 0 1 auto;
      }
      .nav-btn {
        float: left;
        order: 4;
      }
      &.expanded {
        flex-flow: row nowrap;
        &.portrait {
          top: 0;
          height: 100vh;
          flex-flow: column nowrap;
        }
      }
    }
  }
</style>
