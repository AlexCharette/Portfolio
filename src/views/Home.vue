<template>
  <div id="home" class="page">
    <div class="hero">
        <h1>Hey {{ clientIp }}, I'm Alexander</h1>
        <h3>
          I see that you're coming from {{ clientLocation }}, but what matters
          now is that we're both here. What would you like to know?
        </h3>
    </div>
    <div id="placeholder">
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
  #placeholder {
    width: 100vw;
    height: 80vw;
  }
  .hero {
    width: 100vw;
    height: 100vh;
    //background-image: url('~@/assets/images/alley-min.jpg');
    // background-repeat: no-repeat;
    // background-position: center center;
    // background-attachment: fixed;
    // background-size: cover;
    overflow: hidden;
    h1 {
      position: relative;
      margin: 0;
      width: 100vw;
      height: 50vh;
      //mask: url('~@/assets/images/alley-mask.png');
      //mask-size: cover;
      //position: fixed;
      top: 10rem;
      font-size: 6.5rem;
      display: inline-block;
      text-align: center;
      color: $navy-blue;
    }
    h3 {
      top: 5rem;
      margin-left: 10rem;
      font-size: 2.5rem;
      width: 50vw;
    }
  }
}
</style>
