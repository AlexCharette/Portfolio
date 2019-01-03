<template>
  <div id="main-nav">
    <router-link to="/">
      Home
    </router-link>
    <router-link to="/about">
      About
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'MainNav'
}
</script>

<style lang="scss" scoped>
    #main-nav {
        margin: 0 auto;
        width: 80vw;
        height: 15vh;
        a {
            color: black;
            &.router-link-exact-active {
                color: lightgray;
            }
        }
    }
</style>
