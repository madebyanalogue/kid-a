<template>
  <section class="p-fluid">
    <div v-if="filteredPlaylist" class="playlist wrapper space-y-3 py1">
      <h2 class="h2 circle--heading"><div class="circle"></div>{{ filteredPlaylist.name }}</h2>
      <div class="grid">
        <div v-for="track in filteredPlaylist.tracks" :key="track.id" class="col-span-12 col-span-4-md track">
          <div class="track-inner space-y-2">
            <div class="image-wrapper">
              <NuxtImg 
                :src="track.image" 
                :alt="track.track" 
                class="square"
                loading="lazy"
                @load="onImageLoad($event, track.image)"
                @error="onImageError($event, track.image)"
              />
              <div class="image-placeholder" :class="{ 'has-error': hasImageError(track.image) }"></div>
              <a 
                v-if="track.link" 
                :href="track.link" 
                target="_blank" 
                rel="noopener" 
                class="play-button"
                aria-label="Listen to {{ track.track }}"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 5.14v14l11-7-11-7z" fill="currentColor"/>
                </svg>
              </a>
            </div>
            <div class="track-content">
              <h3 class="">{{ track.track }}</h3>
              <p class="artist">{{ track.artist }}</p>
              <div class="">—</div>
              <p class="summary">{{ track.summary }}</p>
              <!-- <a 
                v-if="track.link" 
                :href="track.link" 
                target="_blank" 
                rel="noopener" 
                class="track-link"
              >
                Listen
              </a> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
    validator: (value) => ['Andy', 'Tomsy', 'Phil'].includes(value)
  }
})

const playlists = [
  {
    id: 1,
    name: 'Andy',
    tracks: [
      {
        id: 1,
        artist: 'Radiohead',
        track: 'In Rainbows',
        summary: 'Airy, sparse, expansive and full of melody by one of the finest on the planet. A gamechanger by being one of the first groups to charge "whatever you want" for it.',
        image: '/images/kid-a-playlist-1a.jpg',
        link: 'https://open.spotify.com/album/5vkqYmiPBYLaalcmjujWxK'
      },
      {
        id: 2,
        artist: 'Roots Manuva',
        track: 'Brand New Second Hand',
        summary: 'Addictive, heartfelt, compelling and full of base. One of the finest homegrown records in UK Hip Hop on the visionary Big Dada.',
        image: '/images/kid-a-playlist-1b.jpg',
        link: 'https://open.spotify.com/album/7rpLc55Vg0N5S5drt7MOMt'
      },
      {
        id: 3,
        artist: 'Rival Consoles',
        track: 'Howl',
        summary: 'Spikey, imposing with musical shapeshifting. A gem of a record by an electronic genius.',
        image: '/images/kid-a-playlist-1c.jpg',
        link: 'https://open.spotify.com/album/0eXpCI3qvZqwdnq359v8A5'
      }
    ]
  },
  {
    id: 2,
    name: 'Ollie',
    tracks: [
      {
        id: 1,
        artist: 'Underworld',
        track: 'Rez',
        summary: 'A journey through techno, trance and house that just keeps building, timeless.',
        image: '/images/kid-a-playlist-2a.jpg',
        link: 'https://open.spotify.com/track/4TIn9uYOjTlXNrFkgmdaK5'
      },
      {
        id: 2,
        artist: 'Stone Roses',
        track: 'She Bangs The Drum',
        summary: 'Linking indie and dance rhythms, instantly transports me back to the times of Trainspotting and Euro 96…',
        image: '/images/kid-a-playlist-2b.jpg',
        link: 'https://open.spotify.com/track/5gOh4lcaOb71FqO09UXwbF'
      },
      {
        id: 3,
        artist: 'Bob Dylan',
        track: 'The Times They Are A-Changin',
        summary: "Highly emotive and personal song calling out that change is inevitable, if you resist, you'll be left behind. ",
        image: '/images/kid-a-playlist-2c.jpg',
        link: 'https://open.spotify.com/album/7DZeLXvr9eTVpyI1OlqtcS'
      }
    ]
  },
  {
    id: 3,
    name: 'Phil',
    tracks: [
      {
        id: 1,
        artist: 'Neil Young',
        track: 'Thrasher',
        summary: "Don't get bogged down, It was then that I knew I'd had enough, burned my credit card for fuel.",
        image: '/images/kid-a-playlist-3a.jpg',
        link: 'https://open.spotify.com/track/0trH3YCSs8VCqY3dCW6StO'
      },
      {
        id: 2,
        artist: 'Willie J Healey',
        track: 'We Should Hang',
        summary: "He's the musical equivalent of a nice mug of tea in front of a log fire in your favourite big cardigan.",
        image: '/images/kid-a-playlist-3b.jpg',
        link: 'https://open.spotify.com/track/1lTYdNZ1Hjc5gwU1lPvTmm'
      },
      {
        id: 3,
        artist: 'Rush',
        track: '2112',
        summary: 'Have you got what it takes to go the full 21 minutes?',
        image: '/images/kid-a-playlist-3c.jpg',
        link: 'https://open.spotify.com/album/5Bj8qP3GhOCmsV1gUIvjCI'
      }
    ]
  }
]

const filteredPlaylist = computed(() => {
  return playlists.find(playlist => playlist.name === props.name)
})

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