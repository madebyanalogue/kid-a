<template>
  <section class="playlist--container">
    <img v-if="!props.section || props.section == 1" src="/images/hero-1.jpg" alt="Hero" />
    <img v-if="!props.section || props.section == 2" src="/images/hero-2.jpg" alt="Hero" />
    <img v-if="!props.section || props.section == 3" src="/images/hero-3.jpg" alt="Hero" />
    <img v-if="!props.section || props.section == 4" src="/images/hero-4.jpg" alt="Hero" />
    <img v-if="!props.section || props.section == 5" src="/images/hero-5.jpg" alt="Hero" />
  </section>
  <section class="p-fluid">
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
const props = defineProps({
  section: {
    type: [String, Number],
    default: null
  }
})
</script>

<style scoped>
.hero--container img {
  width: 100%;
}
</style> 