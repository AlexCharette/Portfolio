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
      v-if="$mq === 'mobile'"
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
    &.mobile {
      // Fix the nav to the bottom, all elements layed out
      display: inline-flex;
      flex-flow: row nowrap;
      justify-content: space-evenly;
      align-items: center;
      position: absolute;
      top: 90vh;
      left: 0;
      width: 100vw;
      height: 10vh;
      a { display: none; }
      &.expanded {
        &.portrait {
          a { display: block; }
        }
        &.landscape {
          a { display: inline-block; }
        }
        a {
          display: inline-block;
        }
      }
      a {
        flex: 0 1 auto;
      }
    }
  }
</style>
