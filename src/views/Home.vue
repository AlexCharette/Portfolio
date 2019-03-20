<template>
  <main>
    <div id="hero">
        <h1>Hey <span>{{ clientIp }}, I'm</span> Alexander.</h1>
        <h3>
          I see that you're coming from {{ clientLocation }}, but what matters
          now is that we're both here. What would you like to know?
        </h3>
    </div>
    <nav id="home-nav">
      <router-link v-for="page in pages"
        :key="page.name"
        :page="page.name"
        :to="page.path">
        {{ page.name }}
      </router-link>
    </nav>
  </main>
</template>

<script>
import ipapi from 'ipapi.co'
import EventBus from '../event-bus'

export default {
  name: 'Home',
  data: function() {
    return {
      clientIp: '',
      clientLocation: '',
      pages: [
        { name: 'Home', path: '/'},
        { name: 'Creative Technology', path: '/gallery' },
        { name: 'About', path: '/about'}
      ]
    };
  },
  created() {
    let state = this
    return ipapi.location(function(res) {
      state.clientIp = res.ip
      state.clientLocation = res.region
      EventBus.$emit('user-data-loaded', true)
    });
  }
};
</script>

<style lang="scss" scoped>
  main {
    margin: 0;
    width: 100vw;
    height: 100vh;
    color: white;
    #placeholder {
      width: 100vw;
      height: 80vw;
    }
    #hero {
      display: flex;
      flex-flow: column;
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      h1 {
        display: block;
        top: 10rem;
        margin: 0 auto;
        margin-top: 10rem;
        margin-left: 4rem;
        width: 45vw;
        height: 50vh;
        text-align: left;
        color: $navy-blue;
        span {
          display: block;
        }
      }
      h3 {
        display: block;
        float: left;
        margin-top: -2rem;
        margin-left: 4rem;
        width: 50vw;
        color: $navy-blue;
      }
    }
  }
</style>
