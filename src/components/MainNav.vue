<template>
  <nav
    id="main-nav"
    :class="[ $mq, { expanded: isExpanded }, orientation ]"
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
      v-if="isMobileAndPortrait"
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
      ],
      orientation: ''
    }
  },
  computed: {
    isMobileAndPortrait: function () {
      return !!((this.orientation === 'portrait' && this.$mq === 'sm'))
    }
  },
  mounted () {
    this.debug_logScreenOrientation()
    this.$nextTick(function () {
      window.addEventListener('orientationchange', this.getScreenOrientation)
      this.debug_logScreenOrientation()
      this.getScreenOrientation()
    })
  },
  beforeDestroy () {
    window.removeEventListener('orientationchange', this.logScreenOrientation)
  },
  methods: {
    sanitizeString (string) {
      return string.substring(0, string.indexOf('-'))
    },
    getScreenOrientation (event) {
      this.orientation = this.sanitizeString(screen.orientation.type)
    },
    debug_logScreenOrientation () {
      console.log('the orientation of the device is now ' + this.sanitizeString(screen.orientation.type))
    }
  }
}
</script>

<style lang="scss" scoped>
  #main-nav {
    position: fixed;
    top: 20vh;
    left: 50vw;
    overflow: hidden;
    background-color: #333;
    &.sm {
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
