<template>
  <nav
    id="main-nav"
    v-responsive="{
      tiny: el => el.width < 400,
      small: el => el.width < 800,
      wide: el => el.width > el.height,
      tall: el => el.height > el.width
    }"
    :class="{ expanded: isExpanded }"
  >
    <router-link to="/">
      Home
    </router-link>
    <router-link to="/about">
      About
    </router-link>
    <router-link to="/blog">
      Blog
    </router-link>
    <button class="nav-btn" v-on:click="isExpanded = !isExpanded" />
  </nav>
</template>

<script>
import { ResponsiveDirective } from 'vue-responsive-components'

export default {
  name: 'MainNav',
  directives: {
    responsive: ResponsiveDirective
  },
  data: function () {
    return {
      isExpanded: false
    }
  }
}
</script>

<style lang="scss" scoped>
  #main-nav {
    position: fixed;
    top: 20vh;
    left: 50vw;
    .nav-btn {
      display: none;
    }
    &.small {
      // Fix the nav to the bottom, all elements layed out
      width: 100vw;
    }
    &.tiny {
      // Fix the nav to the bottom, collapsed
      .nav-btn {
        display: block;
      }
      &.expanded {
        &.tall { resize: vertical; }
        &.wide { resize: horizontal; }
      }
    }
  }

</style>
