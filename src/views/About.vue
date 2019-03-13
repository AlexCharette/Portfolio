<template>
  <main>
    <h1>This is a little bit aboot mahself.</h1>
    <h3>A brief description of who I am and what I do</h3>
    <ul id="sm-links">
      <li v-for="link in smLinks"
        :key="link.name">
        <a :href="link.path" targe="_blank">
          <img height="32" width="32" :src="`https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${link.filename}.svg`" />
        </a>  
      </li>
    </ul>   
  </main>
</template>

<script>
import LinkedinIcon from 'simple-icons/icons/linkedin'
import AngelListIcon from 'simple-icons/icons/angellist'

export default {
  name: 'About',
  data: function() {
    return {
      smLinks: [
        { name: 'Linkedin', filename: 'linkedin',  path: 'https://www.linkedin.com/in/alexander-charette-creativetech/' },
        { name: 'Angel List', filename: 'angellist', path: 'https://angel.co/alexander-charette' },
        { name: 'GitHub', filename: 'github', path: 'https://github.com/AlexCharette' },
        { name: 'Twitter', filename: 'twitter', path: 'https://twitter.com/acharette_wake' }
      ]
    }
  }
};
</script>

<style lang="scss" scoped>
  #sm-links {
    display: inline-flex;
    flex-flow: row;
    justify-content: center;
    align-items: center;
    list-style-type: none;
    a {
      text-decoration: none;
    }
  }
</style>

