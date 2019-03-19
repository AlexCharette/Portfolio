<template>
  <main>
    <header>
      <h1>This is a little bit aboot mahself.</h1>
      <h3>A brief description of who I am and what I do</h3>
      <ul id="sm-links">
        <li v-for="link in smLinks"
          :key="link.name"
          @mouseenter="hovered = true"
          @mouseleave="hovered = false">
          <a :href="link.path" target="_blank">
            <icon-base :icon-name="link.icon" width="30" height="30">
              <component :is="`icon-${link.icon}`" />
              {{ link.name }}
            </icon-base>
          </a>
        </li>
      </ul>
    </header>
    <div id="summary">
      <p>
      </p>
    </div>
    <div id="long-form">
      <h2>If that wasn't enough...</h2>
      <p>
        I am a Montreal born-and-based, just-about-graduated creative technologist looking to figure out
        solutions to local problems through tech, whether they be economic or a matter of lifestyle.
        There’s nothing more rewarding than breaking down the fundamentals of a situation to find new
        angles of approach, and that’s what I look for in a project. A blend of technical experience with a
        visual arts background and a teamwork-heavy job has made me into someone who can bring
        disparate parts of a project together and see where breakdowns occur between them as well as in
        communication between those involved.
        <br><br>
        I have always tried to keep my personal and professional life as varied as possible while still
        building towards a fixed goal, because that’s how I believe you can find the most room for
        experimentation to keep your mind open yet sharp.
        <br><br>
        For the time being, I work mostly with web applications (using VueJS most recently) but I can’t
        seem to keep my eye off hardware since I started working with Arduino in college. The only
        thing that truly stops me from coding non-stop is the pull to actually build things and work in
        tangible space
      </p>
    </div>
  </main>
</template>

<script>
import IconBase from '../components/icons/IconBase'
import IconLinkedin from '../components/icons/social/IconLinkedin'
import IconAngellist from '../components/icons/social/IconAngellist'
import IconGithub from '../components/icons/social/IconGithub'
import IconTwitter from '../components/icons/social/IconTwitter'

export default {
  name: 'About',
  components: {
    IconBase,
    IconLinkedin,
    IconAngellist,
    IconGithub,
    IconTwitter
  },
  data: function() {
    return {
      hovered: false,
      smLinks: [
        { name: 'LinkedIn',
          icon: 'linkedin',
          path: 'https://www.linkedin.com/in/alexander-charette-creativetech/'
        },
        { name: 'Angel List',
          icon: 'angellist',
          path: 'https://angel.co/alexander-charette'
        },
        { name: 'GitHub',
          icon: 'github',
          path: 'https://github.com/AlexCharette'
        },
        { name: 'Twitter',
          icon: 'twitter',
          path: 'https://twitter.com/acharette_wake'
        }
      ]
    }
  },
  computed: {
    iconColour: function() {
      return this.hovered ? '#75B4D2' : '#2F4777'
    }
  }
};
</script>

<style lang="scss" scoped>
  main {
    header {
      margin: 0 auto;
      margin-top: 10rem;
      width: 50%;
      text-align: center;
      #sm-links {
        display: inline-flex;
        flex-flow: row;
        justify-content: space-evenly;
        align-items: center;
        list-style-type: none;
        width: 20vw;
        height: 7vh;
        padding: 0;
        li {
          min-width: 60px;
          min-height: 45px;
          text-align: center;
          a {
            position: relative;
            display: flex;
            flex-flow: column;
            justify-content: space-evenly;
            align-content: center;
            text-decoration: none;
            &:hover svg {
              color: $light-blue;
            }
          }
        }
      }
    }
    #long-form {
      margin: 0 auto;
      width: 50%;
    }
  }
</style>

