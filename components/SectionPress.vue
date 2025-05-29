<template>
  <!-- POSTS -->
  <section>
    <div class="wrapper">
      <div class="">
        <div class="grid py2 pbottom">
          <div v-for="post in posts" :key="post._id" class="col-span-12 col-span-6-md py1 pbottom" :data-summary="post.summary">
            <div class="post rte">
              <div class="">
                <div class="h5">{{ formatDate(post.publishedAt) }}</div>
              </div>
              <NuxtImg 
                v-if="post.featuredImage"
                :src="getImageUrl(post.featuredImage)" 
                :alt="post.title"
                class="mb2 square"
              />
              <div class="h4">{{ post.title }}</div>
              <a 
                  v-if="post.pdf?.asset?.url" 
                  :href="post.pdf.asset.url" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="with-circle"
                >
                  <div class="circle--heading"><span class="circle"></span><span>More</span></div>
                </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useSanityImage } from '~/composables/useSanityImage'
import { isDark, useHeaderPadding } from '~/composables/usePageUi.js'

const posts = ref([])
const { getImageUrl } = useSanityImage()

onMounted(async () => {
  const res = await $fetch('/api/sanity', { params: { type: 'press' } })
  posts.value = res
})

isDark.value = false
useHeaderPadding.value = true

definePageMeta({
  pageTitle: 'Press'
})

function formatDate(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  // Get month name in uppercase
  const month = date.toLocaleString('en-US', { month: 'long' }).toUpperCase()
  const year = date.getFullYear()
  return `${month} ${year}`
}
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