<template>
  <section class="p-fluid">
    <h1>Playlists</h1>
    <div v-for="playlist in playlists" :key="playlist.id" class="playlist">
      <h2>{{ playlist.name }}</h2>
      <div v-for="person in playlist.people" :key="person.id" class="person">
        <h3>{{ person.name }}</h3>
        <ul>
          <li v-for="section in person.sections" :key="section.id">{{ section.title }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
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