<template>
  <SectionHero section="4"/>

  <section>
    <div class="wrapper"> 
      <img src="/images/press-2.jpg" alt="Press 0" />
    </div>
  </section>

</template>

<script setup>
import { isDark, useHeaderPadding } from '~/composables/usePageUi.js'
isDark.value = false
useHeaderPadding.value = true

const posts = [
  { id: 1, title: 'First Press Post', summary: 'Summary of the first press post.' },
  { id: 2, title: 'Second Press Post', summary: 'Summary of the second press post.' },
];

definePageMeta({
  pageTitle: 'Press'
})
</script>

<style scoped>
.posts {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.post h2 {
  margin-bottom: 0.5rem;
}
</style> 