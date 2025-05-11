<template>
  <SectionHero section="5"/>

  <section>
    <div class="wrapper">
      <img src="/images/playlist-0.jpg" alt="Playlist 0" />
    </div>
  </section>
  
  <section>
    <div class="wrapper"> 
      <img src="/images/playlist-1.jpg" alt="Playlist 1" />
    </div>
  </section>
  
  <section>
    <div class="wrapper">
      <img src="/images/playlist-2.jpg" alt="Playlist 2" />
    </div>
  </section>
  
  <section>
    <div class="wrapper">
      <img src="/images/playlist-3.jpg" alt="Playlist 3" />
    </div>
  </section>
  
  <section>
    <div class="wrapper">
      <img src="/images/playlist-4.jpg" alt="Playlist 4" />
    </div>
  </section>

</template>

<script setup>
import { isDark, useHeaderPadding } from '~/composables/usePageUi.js'
isDark.value = false
useHeaderPadding.value = true

const playlists = [
  {
    id: 1,
    name: 'Chill Vibes',
    people: [
      {
        id: 1,
        name: 'Alice',
        sections: [
          { id: 1, title: 'Morning Mix' },
          { id: 2, title: 'Evening Chill' },
        ],
      },
      {
        id: 2,
        name: 'Bob',
        sections: [
          { id: 1, title: 'Workout Beats' },
        ],
      },
    ],
  },
];

definePageMeta({
  pageTitle: 'Playlist'
})
</script>

<style scoped>
.playlist {
  margin-bottom: 2rem;
}
.person {
  margin-left: 2rem;
  margin-bottom: 1rem;
}
</style> 