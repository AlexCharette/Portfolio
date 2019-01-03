<template>
  <div id="app">
    <main-nav />
    <hello-component name="World" />
    <router-view />
  </div>
</template>

<script>
import HelloComponent from './components/HelloComponent.vue'
import MainNav from './components/MainNav.vue'
export default {
  name: 'App',
  components: {
    HelloComponent,
    MainNav
  }
}
</script>

<style lang="scss" scoped>

</style>
