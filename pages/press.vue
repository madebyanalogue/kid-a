<template>
  <SectionHero section="4"/>

  <!-- POSTS -->
  <section>
    <div class="wrapper">
      <div class="">
        <div class="grid py2 pbottom">
          <div v-for="post in posts" :key="post.id" class="col-span-12 col-span-6-md py1 pbottom" data-summary="{{ post.summary }}">
            <div class="post rte">
              <div class="">
                <div class="h5">{{ post.date }}</div>
              </div>
              <NuxtImg 
                :src="post.image" 
                :alt="post.title"
                class="mb2 square"
              />
              <div class="h4">{{ post.title }}</div>
              <button class="with-circle">
                <div class="circle--heading"><span class="circle"></span><span>More</span></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

</template>

<script setup>
import { isDark, useHeaderPadding } from '~/composables/usePageUi.js'
isDark.value = false
useHeaderPadding.value = true

const posts = [
  { id: 1, title: 'Kid-A has been formally recognised by one of the greatest business institutions on the planet, The Financial Times, as one of the fastest growing firms in Europe.', date: 'MARCH 2025', summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', image: '/images/press-1.jpg' },
  { id: 2, title: 'Everything in its right place? Industry-first for telecommunications consultancy.', date: 'DEC 2024', summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', image: '/images/press-2.jpg' },
  { id: 3, title: 'Kid-A has been formally recognised by one of the greatest business institutions on the planet, The Financial Times, as one of the fastest growing firms in Europe.', date: 'MARCH 2025', summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', image: '/images/press-1.jpg' },
  { id: 4, title: 'Everything in its right place? Industry-first for telecommunications consultancy.', date: 'DEC 2024', summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', image: '/images/press-2.jpg' },
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