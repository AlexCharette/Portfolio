<template>
  <div id="home">
    <div class="hero">
      <div class="text">
        <h1>Hey {{ clientIp }}, I'm Alexander</h1>
        <h3>
          I see that you're coming from {{ clientLocation }}, but what matters
          now is that we're both here. What would you like to know?
        </h3>
      </div>
      <div class="hero-graphic" />
    </div>
  </div>
</template>

<script>
import ipapi from 'ipapi.co';

export default {
  name: 'Home',
  data: function() {
    return {
      clientIp: '',
      clientLocation: ''
    };
  },
  created: function() {
    let state = this;
    return ipapi.location(function(res) {
      state.clientIp = res.ip;
      state.clientLocation = res.region;
    });
  }
};
</script>

<style lang="scss" scoped>
#home {
  margin: 0;
  width: 100vw;
  height: 100vh;
  color: white;
  .hero {
    width: 100vw;
    height: 100vh;
    background-image: url('~@/assets/images/hero-bg.jpg');
    background-repeat: no-repeat;
    background-position: center center;
    background-attachment: fixed;
    background-size: cover;
    overflow: hidden;
    .text {
      float: left;
      margin-top: 5rem;
      margin-left: 2rem;
      width: 80%;
    }
    .hero-graphic {
      float: right;
      width: 300px;
      height: 200px;
    }
  }
}
</style>
