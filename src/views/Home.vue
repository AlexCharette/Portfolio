<template>
  <main :class="{ 'not-ready': !dataLoaded }">
    <div id="hero">
        <h1 id="welcome" >Hey <span>{{ nameText }},</span> I'm Alexander.</h1>
        <h5 id="interrogative">
          {{ locationText }}
        </h5>
    </div>
  </main>
</template>

<script>
import ipapi from 'ipapi.co'
import EventBus from '../event-bus'

export default {
  name: 'Home',
  data: function() {
    return {
      clientName: '',
      clientLocation: '',
      dataLoaded: false,
      pages: [
        { name: 'Home', path: '/'},
        { name: 'Creative Technology', path: '/gallery' },
        { name: 'About', path: '/about'}
      ]
    };
  },
  computed: {
    nameText: function() {
      if (this.clientName) {
        return this.clientName
      } else {
        return 'there'
      }
    },
    locationText: function() {
      if (this.clientLocation) {
        return `I see that you're coming from ${this.clientLocation}, but what matters
            now is that we're both here. What would you like to know?`
      } else {
        return `I can't tell where you're coming from, but that's fine because what matters
            now is that we're both here. What would you like to know?`
      }
    }
  },
  created() {
    let state = this
    return ipapi.location(function(res) {
      state.clientName = res.ip
      state.clientLocation = res.region
      state.dataLoaded = true
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
      #welcome {
        display: block;
        top: 10rem;
        margin: 0 auto;
        margin-top: 2rem;
        margin-left: 4rem;
        width: 50vw;
        text-align: left;
        background: linear-gradient(to left, #0077C4, #5245A0);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        span {
          display: block;
          &.inline {
            display: inline-block;
          }
        }
      }
      #interrogative {
        display: block;
        float: left;
        margin-top: 2rem;
        margin-left: 4rem;
        width: 50vw;
        color: $charcoal;
      }
    }
    &.not-ready * {
      display: none;
    }
  }
</style>
