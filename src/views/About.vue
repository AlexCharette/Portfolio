<template>
  <main>
    <header>
      <h2>What's this all about?</h2>
      <h5>I take a creative approach to tech to find new solutions to problems.</h5>
      <p>Get in touch at <a href="mailto:acharette.dev@gmail.com" target="_top">acharette.dev@gmail.com</a></p>
    </header>
    <div id="summary">
      <p>
      </p>
    </div>
    <div id="long-form">
      <h5>If that wasn't enough...</h5>
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
      <h5>What am I up to now?</h5>
      <p>
        I'm in the last weeks of a BFA, and am hopefully on my way to graduate school for another year and a half or so.
        In addition to whatever side projects are keeping me busy, I work in a reserve artillery regiment as a gunner (and social media coordinator).
      </p>
    </div>
  </main>
</template>

<script>

export default {
  name: 'About',
};
</script>

<style lang="scss" scoped>
  main {
    overflow: scroll;
    header {
      margin: 0 auto;
      margin-top: 10rem;
      width: 65%;
      text-align: center;
    }
    #long-form {
      margin: 0 auto;
      margin-bottom: 3em;
      width: 50%;
    }
    a {
      text-decoration: none;
    }
  }
</style>

