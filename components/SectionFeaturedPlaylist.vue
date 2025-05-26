<template>
  <section class="p-fluid">
    <div v-if="playlist" class="playlist wrapper space-y-3 py1">
      <h2 class="h2 circle--heading"><div class="circle"></div>{{ playlist.title }}</h2>
      <div class="grid">
        <div v-for="track in tracks" :key="track._key || track.id" class="col-span-12 col-span-4-md track">
          <div class="track-inner space-y-2">
            <div class="image-wrapper">
              <NuxtImg 
                v-if="track.image?.asset?.url"
                :src="track.image.asset.url" 
                :alt="track.title" 
                class="square"
                loading="lazy"
                @load="onImageLoad($event, track.image.asset.url)"
                @error="onImageError($event, track.image.asset.url)"
              />
              <div class="image-placeholder" :class="{ 'has-error': hasImageError(track.image?.asset?.url) }"></div>
              <a 
                v-if="track.link" 
                :href="track.link" 
                target="_blank" 
                rel="noopener" 
                class="play-button"
                :aria-label="`Listen to ${track.title}`"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 5.14v14l11-7-11-7z" fill="currentColor"/>
                </svg>
              </a>
            </div>
            <div class="track-content">
              <p class="artist">{{ track.artist }}</p>
              <h3 class="">{{ track.title }}</h3>
              <div class="">—</div>
              <p class="">{{ track.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  section: {
    type: Object,
    required: true,
    validator: (value) => value && value._type === 'section' && value.sectionType === 'featuredPlaylist'
  }
})

const playlist = computed(() => props.section?.playlistContent?.playlist)
const tracks = computed(() => playlist.value?.tracks || [])

const loadedImages = ref(new Set())
const errorImages = ref(new Set())

const onImageLoad = (event, imageSrc) => {
  if (imageSrc) {
    loadedImages.value.add(imageSrc)
    errorImages.value.delete(imageSrc)
  }
}

const onImageError = (event, imageSrc) => {
  if (imageSrc) {
    errorImages.value.add(imageSrc)
    loadedImages.value.delete(imageSrc)
  }
}

const hasImageError = (src) => {
  return errorImages.value.has(src)
}

const isImageLoaded = (src) => {
  return loadedImages.value.has(src)
}

watch(tracks, (val) => {
  console.log('SectionFeaturedPlaylist tracks:', val)
}, { immediate: true })
</script>

<style scoped>
.image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  background: #f7f7f7;
}

.image-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--color-bg-alt);
  transition: opacity 0.3s ease;
}

.image-placeholder.has-error {
  background: #f7f7f7;
  opacity: 1;
}

.square {
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.square[src] {
  opacity: 1;
}

.square[src] + .image-placeholder {
  opacity: 0;
}

.play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 48px;
  height: 48px;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  opacity: 0;
  transition: opacity 0.3s ease, transform 0.3s ease;
  z-index: 2;
}

.play-button:hover {
  background: rgba(0, 0, 0, 0.9);
  transform: translate(-50%, -50%) scale(1.1);
}

.image-wrapper:hover .play-button {
  opacity: 1;
}
</style> 