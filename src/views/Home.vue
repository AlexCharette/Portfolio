<template>
  <main :class="{ 'not-ready': !dataLoaded }">
    <div id="hero">
        <h1 id="welcome" >Good <span>{{ timeText }}.</span>I'm Alexander.</h1>
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
      clientTime: '',
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
    },
    timeText: function() {
      if (this.clientTime) {
        const date = new Date(Date.now())
        this.clientTime = (parseInt(date.getUTCHours(), 10) * 100) + this.clientTime
        if (this.clientTime >= 330 && this.clientTime < 1200) {
          return 'morning'
        } else if (this.clientTime >= 1200 && this.clientTime < 1800) {
          return 'afternoon'
        } else {
          return 'evening'
        }
        console.log("Client time: " + this.clientTime)
      } else {
        return 'to meet you'
      }
    }
  },
  created() {
    let state = this
    return ipapi.location(function(res) {
      state.clientName = res.ip
      state.clientLocation = res.region
      state.clientTime = parseInt(res.utc_offset, 10)
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
      width: 60vw;
      height: 100vh;
      #welcome {
        display: block;
        top: 10rem;
        margin: 0 auto;
        //margin-top: 2rem;
        margin-left: 4rem;
        width: 50vw;
        text-align: left;
        background: linear-gradient(to left, #0077C4, #5245A0);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      #interrogative {
        display: block;
        margin-top: 1rem;
        margin-left: 4rem;
        width: 50vw;
        color: $charcoal;
      }
    }
    &.not-ready * {
      display: none;
    }
    @include desktop-laptop {
      #hero {
        width: 60vw;
        height: 100%;
        //overflow: hidden;
        #welcome {
          height: 70%;
          overflow: visible;
        }
        #interrogative {
          height: 30%;
        }
        span {
          display: block;
        }
      }
    }
    @include phone-portrait {
      #hero {
        width: 100vw;
        height: 60vh;
        span {
          display: inline-block;
        }
      }
    }
  }
</style>
