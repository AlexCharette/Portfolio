<template>
  <div id="home">
    <div class="hero">
      <div class="text">
        <h1>Hey {{ clientIp }}, I'm Alexander</h1>
        <h3>
          It looks like you're over in {{ clientLocation }}, but what matters
          now is that we're both here. How shall we proceed?
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
  margin: 0 auto;
  width: 80vw;
  height: 60vh;
  .hero {
    width: 100%;
    height: 40%;
    .text {
      float: left;
      width: 40%;
    }
    .hero-graphic {
      float: right;
      width: 300px;
      height: 200px;
      background-image: url(../assets/images/hero-bg.jpg);
    }
  }
}
main {
  text-align: center;
  color: red;
}
</style>
