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
              />
              <div class="image-placeholder"></div>
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
        track: 'Everything In Its Right Place',
        summary: 'A hypnotic journey through electronic textures and haunting vocals.',
        image: '/images/playlist-1a.jpg',
        link: 'https://open.spotify.com/track/2kRFrWaLWiKq48YYVdGcm8'
      },
      {
        id: 2,
        artist: 'Aphex Twin',
        track: 'Windowlicker',
        summary: 'Complex rhythms and warped melodies that push electronic music boundaries.',
        image: '/images/playlist-1b.jpg',
        link: 'https://open.spotify.com/track/4PeQ24u1xy4ry4Uw2L1cBZ'
      },
      {
        id: 3,
        artist: 'Boards of Canada',
        track: 'Roygbiv',
        summary: 'Nostalgic electronic melodies that evoke childhood memories.',
        image: '/images/playlist-1c.jpg',
        link: 'https://open.spotify.com/track/2XQSgmtEY2titXhfY414dy'
      }
    ]
  },
  {
    id: 2,
    name: 'Tomsy',
    tracks: [
      {
        id: 1,
        artist: 'The Chemical Brothers',
        track: 'Block Rockin\' Beats',
        summary: 'Iconic big beat anthem that defined an era of electronic music.',
        image: '/images/playlist-2a.jpg',
        link: 'https://open.spotify.com/track/4u2ZJ3Jb1bJxgb6pL27A4N'
      },
      {
        id: 2,
        artist: 'Daft Punk',
        track: 'Around the World',
        summary: 'Minimalist electronic masterpiece with infectious repetition.',
        image: '/images/playlist-2b.jpg',
        link: 'https://open.spotify.com/track/1pKYYY0dkg23sQQXi0Q5zN'
      },
      {
        id: 3,
        artist: 'The Prodigy',
        track: 'Smack My Bitch Up',
        summary: 'Aggressive breakbeat that pushed electronic music into new territory.',
        image: '/images/playlist-2c.jpg',
        link: 'https://open.spotify.com/track/2Cjj5maf3gbiQgDMCIhWzu'
      }
    ]
  },
  {
    id: 3,
    name: 'Phil',
    tracks: [
      {
        id: 1,
        artist: 'Massive Attack',
        track: 'Teardrop',
        summary: 'Atmospheric trip-hop classic with haunting vocals.',
        image: '/images/playlist-3a.jpg',
        link: 'https://open.spotify.com/track/67Hna13dNDkZvBpTXRIaOJ'
      },
      {
        id: 2,
        artist: 'Portishead',
        track: 'Glory Box',
        summary: 'Soulful trip-hop with cinematic strings and powerful vocals.',
        image: '/images/playlist-3b.jpg',
        link: 'https://open.spotify.com/track/3l9Z9PprBsaKqBgO7Uc0Jv'
      },
      {
        id: 3,
        artist: 'UNKLE',
        track: 'Rabbit In Your Headlights',
        summary: 'Dark, cinematic collaboration featuring Thom Yorke.',
        image: '/images/playlist-3c.jpg',
        link: 'https://open.spotify.com/track/0jd7V0BtW2LjW4yXXmKzYX'
      }
    ]
  }
]

const filteredPlaylist = computed(() => {
  return playlists.find(playlist => playlist.name === props.name)
})

const loadedImages = ref(new Set())

const onImageLoad = (event, imageSrc) => {
  if (imageSrc) {
    loadedImages.value.add(imageSrc)
  }
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
</style> 