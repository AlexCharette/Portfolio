<template>
  <div id="blog">
    <header>
      <h1>Let's share some thoughts we might have. No fighting.</h1>
    </header>
    <main>This is where my posts will go.</main>
    <aside>
      <h2>Links I think you should follow.</h2>
      <nav>
        <a
          v-for="link in links"
          :key="link.id"
          :link="link"
          :href="link.href"
          target="_blank"
        >
          {{ link.name }}
        </a>
      </nav>
    </aside>
  </div>
</template>

<script>
const links = [
  { name: "Childhood's End - George Dyson", href: 'https://www.edge.org/conversation/george_dyson-childhoods-end' },
  { name: 'Martyrmade Podcast', href: 'http://www.martyrmade.com/' },
  { name: 'The Stoic Emperor, on Twitter', href: 'https://twitter.com/thestoicemperor?lang=en' },
  { name: 'Courage Under Fire - VADM James Stockdale', href: 'http://media.hoover.org/sites/default/files/documents/978-0-8179-3692-1_1.pdf' },
  { name: 'Lessons from War, Tribal Societies, and a Non-Fiction Life (Sebastian Junger)', href: 'https://tim.blog/2016/05/22/sebastian-junger/' }
]
export default {
  name: 'Blog',
  data: function () {
    return {
      links
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
