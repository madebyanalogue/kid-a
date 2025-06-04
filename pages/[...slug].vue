<template>
  <div>
    <pre v-if="isDev" style="display: none">{{ JSON.stringify({ pageData, error, pending, slug: slug.value }, null, 2) }}</pre>
    <template v-if="error">
      <div class="wrapper py6">
        <h1>Error</h1>
        <p>{{ error.message }}</p>
        <p v-if="isDev">Status: {{ error.statusCode }}</p>
      </div>
    </template>
    <template v-else-if="pending">
      <div class="wrapper py6">
        <div class="loading-placeholder">
          <div class="loading-spinner"></div>
        </div>
      </div>
    </template>
    <template v-else-if="pageData?.sections?.length">
      <PageBuilder :sections="pageData.sections" />
    </template>
    <template v-else-if="pageData">
      <div class="wrapper py6">
        <h1>{{ pageData.title || 'Page' }}</h1>
        <p>This page is being prepared. Please check back soon!</p>
        <p v-if="isDev">Debug: No sections found</p>
      </div>
    </template>
  </div>
</template> 

<script setup>
const route = useRoute()
const config = useRuntimeConfig()

// Get the full path as the slug
const slug = computed(() => route.params.slug?.join('/') || '')

// Use a more unique key that includes the full path
const { data: pageData, error, pending } = await useAsyncData(
  `page-${route.fullPath}`,
  async () => {
    try {
      console.log('Fetching page data for:', {
        path: route.fullPath,
        slug: slug.value
      });
      
      const result = await $fetch('/api/sanity', {
        params: {
          type: 'page',
          identifier: slug.value,
          identifierType: 'slug'
        }
      });

      console.log('Received page data:', {
        hasData: !!result,
        hasSections: !!result?.sections,
        sectionCount: result?.sections?.length || 0,
        heroSections: result?.sections?.filter(s => s.sectionType === 'hero').map(s => ({
          _id: s._id,
          hasHeroContent: !!s.heroContent,
          heroElements: s.heroContent?.heroElements?.length || 0
        }))
      });

      if (!result || Object.keys(result).length === 0) {
        throw createError({
          statusCode: 404,
          message: `Page not found: ${slug.value}`
        })
      }

      return result
    } catch (err) {
      console.error('[Page] Error fetching page:', {
        slug: slug.value,
        error: err.message,
        statusCode: err.statusCode
      })
      throw err
    }
  },
  {
    watch: [() => route.fullPath]
  }
)

// Watch for changes in pageData to update title
watch(() => pageData.value, (newData) => {
  if (newData) {
    useHead({
      title: newData.title || route.path.split('/').pop()
    })
  }
}, { immediate: true })

// Keep error logging
watch(() => error.value, (error) => {
  if (error) {
    console.error('[Page] Page error:', {
      message: error.message,
      statusCode: error.statusCode,
      cause: error.cause
    })
  }
}, { immediate: true })

// Page meta
useHead(() => {
  const title = pageData.value?.title || 'Page Not Found';
  console.log('[Page] Setting head title:', title);
  return { title };
})

// Computed property for development mode
const isDev = computed(() => config.public.dev)
</script>

<style scoped>
.loading-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  gap: 1rem;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--gray-200);
  border-top-color: var(--black);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style> 