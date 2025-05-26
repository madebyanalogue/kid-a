<template>
  <div class="page-builder">
    <template v-for="(section, index) in sections" :key="section._id || index">
      <!-- Hero Section -->
      <SectionHero
        v-if="section._type === 'section' && section.sectionType === 'hero'"
        :section="section"
      />

      <!-- Basic Page Section -->
      <SectionBasicPage
        v-else-if="section._type === 'section' && section.sectionType === 'basicPage'"
        :section="section"
      />

      <!-- Image Section -->
      <SectionImage
        v-else-if="section._type === 'section' && section.sectionType === 'image'"
        :section="section"
      />

      <!-- Headline Section -->
      <SectionHeadline
        v-else-if="section._type === 'section' && section.sectionType === 'headline'"
        :section="section"
      />

      <!-- Playlist Section -->
      <SectionFeaturedPlaylist
        v-else-if="section._type === 'section' && section.sectionType === 'featuredPlaylist'"
        :section="section"
      />

      <!-- Contact Section -->
      <SectionContact
        v-else-if="section._type === 'section' && section.sectionType === 'contact'"
        :section="section"
      />

      <!-- Basic Content Section -->
      <SectionBasicContent
        v-else-if="section._type === 'section' && section.sectionType === 'basicContent'"
        :section="section"
      />

      <!-- Home Scroll Section -->
      <SectionHomeScroll
        v-else-if="
          section._type === 'section' &&
          section.sectionType === 'homeScroll' &&
          section.homeScrollContent &&
          Array.isArray(section.homeScrollContent.items) &&
          section.homeScrollContent.items.length > 0
        "
        :section="section"
      />

      <!-- Spotify Playlist Section -->
      <SectionSpotifyPlaylist
        v-else-if="section._type === 'section' && section.sectionType === 'spotifyPlaylist'"
        :section="section"
      />

      <!-- Two Column Section -->
      <SectionTwoColumn v-else-if="section._type === 'section' && section.sectionType === 'sectionTwoColumn'" v-bind="section.twoColumnContent" />

      <!-- Nested Section -->
      <SectionNested v-else-if="section._type === 'section' && section.sectionType === 'nested'" :section="section" />

      <!-- Banner Section -->
      <SectionBanner v-else-if="section._type === 'section' && section.sectionType === 'banner'" :section="section" />

      <!-- Press Section -->
      <SectionPress v-else-if="section._type === 'section' && section.sectionType === 'press'" :section="section" />

      <!-- Fallback for empty or misconfigured Home Scroll Section -->
      <div
        v-else-if="section._type === 'section' && section.sectionType === 'homeScroll'"
        class="wrapper py6"
      >
        <div class="grid">
          <div class="col-span-12">
            <p class="error">Home Scroll section is empty or misconfigured.</p>
          </div>
        </div>
      </div>

      <!-- Fallback for unknown section types -->
      <div v-else class="wrapper py6">
        <div class="grid">
          <div class="col-span-12">
            <p class="error">Unknown section type: {{ section._type }} - {{ section.sectionType }}</p>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'

const props = defineProps({
  sections: {
    type: Array,
    required: true,
    validator: (value) => {
      return value.every(section => 
        section && 
        typeof section === 'object' && 
        section._type === 'section' && 
        typeof section.sectionType === 'string'
      )
    }
  }
})

// Debug logging for sections
watch(() => props.sections, (newSections) => {
  // Log each section individually for better visibility
  console.log('PageBuilder sections count:', newSections?.length || 0)
  
  newSections?.forEach((section, index) => {
    console.log(`\n=== Section ${index + 1} ===`)
    console.log('Basic info:', {
      _id: section._id,
      _type: section._type,
      sectionType: section.sectionType,
      hasHeroContent: !!section.heroContent,
      hasSpotifyContent: !!section.spotifyPlaylistContent,
      hasPlaylistContent: !!section.playlistContent
    })
    
    // Use console.dir for full object inspection
    console.dir(section, { depth: null, colors: true })
    
    // Specifically check playlist content
    if (section.sectionType === 'featuredPlaylist') {
      console.log('Featured Playlist Content:', {
        hasPlaylistContent: !!section.playlistContent,
        playlistContent: section.playlistContent,
        tracks: section.playlistContent?.playlist?.tracks
      })
    }
  })
}, { immediate: true, deep: true })
</script>

<style scoped>
.page-builder {
  width: 100%;
}

.error {
  color: red;
  padding: var(--unit);
  border: 1px solid red;
  border-radius: 4px;
}
</style> 