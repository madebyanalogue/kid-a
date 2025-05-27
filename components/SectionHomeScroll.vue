<template>
  <section class="home-scroll-section">
    <div class="home--container">
      <div class="home--logo">
        <div class="logo"><Logo /></div>
      </div>
      <div class="container" v-if="hasItems">
        <div 
          v-for="(item, index) in section.homeScrollContent.items" 
          :key="item._key"
          class="media"
        >
          <NuxtLink 
            v-if="item.link && item.link.page && item.link.page.slug && item.link.page.slug.current"
            :to="`/${item.link.page.slug.current}`"
            class="media-link"
          >
            <NuxtImg
              :src="getImageUrl(item.image)"
              :alt="item.title"
              loading="lazy"
            />
            <h3 class="media-title">{{ item.title }}</h3>
          </NuxtLink>
          <a 
            v-else-if="item.link && item.link.url"
            :href="item.link.url"
            class="media-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <NuxtImg
              :src="getImageUrl(item.image)"
              :alt="item.title"
              loading="lazy"
            />
            <h3 class="media-title">{{ item.title }}</h3>
          </a>
          <div v-else>
            <p class="error">Missing link for item: {{ item.title }}</p>
          </div>
        </div>
      </div>
      <div v-else class="wrapper py6">
        <p class="error">Home Scroll section is missing <b>homeScrollContent</b> or <b>items</b>.<br>
          <span>Raw section data:</span>
          <pre style="font-size:12px;max-width:100vw;overflow:auto;">{{ JSON.stringify(section, null, 2) }}</pre>
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref, computed } from 'vue'
import gsap from 'gsap';
import { useSanityImage } from '~/composables/useSanityImage'

const props = defineProps({
  section: {
    type: Object,
    required: true
  }
})

console.log('SectionHomeScroll data:', props.section);

const { getImageUrl } = useSanityImage()

const hasItems = computed(() => {
  return (
    props.section &&
    props.section.homeScrollContent &&
    Array.isArray(props.section.homeScrollContent.items) &&
    props.section.homeScrollContent.items.length > 0
  )
})

let incr = 800, deltaObject = ref({delta: 0}), deltaTo, tl, isWheeling
const mediaArray = ref([])
let currentCycle = 0
let trajectoryAngles = [0, 45, 90, 135, 180, 225, 270, 315]

onMounted(() => {
  if (!hasItems.value) {
    console.warn('HomeScroll: Missing or empty items', props.section)
    return;
  }
  document.body.classList.add('no-smooth')
  document.body.classList.add('has-home-scroll')

  const root = document.querySelector('.home--container')
  const container = root.querySelector('.container')

  // Build media array from Sanity images
  mediaArray.value = props.section.homeScrollContent.items.map(item => 
    getImageUrl(item.image)
  )

  const medias = root.querySelectorAll('.media')
  const mediasImg = root.querySelectorAll('.media img')

  // Set initial images
  mediasImg.forEach((img, index) => {
    img.setAttribute('src', mediaArray.value[index])
  })

  // QUICK TOS
  deltaTo = gsap.quickTo(deltaObject.value, 'delta', { duration: 2, ease: "power1" })
  const rotY = gsap.quickTo(container, "rotationY", {duration: 0.5, ease: 'power1'})
  const rotX = gsap.quickTo(container, "rotationX", {duration: 0.5, ease: 'power1'})

  medias.forEach(media => {
      updateMedia(media)
  })

  tl = gsap.timeline({
      paused: true
  })

  // First timeline for z-position movement
  tl.to(medias, {
      z: 0,
      ease: "none",
      duration: 12,
      stagger: {
          each: 1,
          repeat: -1,
          onRepeat() {
              updateMedia(this.targets()[0])
          }
      }
  })

  // Second timeline for opacity and blur
  tl.to(medias, {
      keyframes: [
          {
              opacity: 0,
              filter: "blur(40px)",
              duration: 0,
              ease: "none"
          },
          {
              opacity: 1,
              filter: "blur(0px)",
              duration: 1,
              ease: "power2.in"
          },
          {
              filter: "blur(0px)",
              duration: 10,
              ease: "none"
          },
          {
              filter: "blur(40px)",
              opacity: 0,
              duration: 1,
              ease: "power2.out"
          }
      ],
      stagger: {
          each: 1,
          repeat: -1
      }
  }, '<') // Run in parallel with the z-position animation

  gsap.ticker.add(tick)
  window.addEventListener("wheel", handleWheel, {passive: true});
  root.addEventListener("mousemove", e => {
      const valY = (e.clientX / window.innerWidth - 0.5) * 10
      const valX = (e.clientY / window.innerHeight - 0.5) * 10

      rotY(valY)
      rotX(-valX)
  })
})

onUnmounted(() => {
  document.body.classList.remove('has-home-scroll')
  document.body.classList.remove('no-smooth')
})

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function updateMedia(media) {
    // Get the index of the current media element
    const mediaIndex = Array.from(media.parentNode.children).indexOf(media);
    
    if (mediaIndex === 0) {
        currentCycle++;
        if (currentCycle > 0) {
            trajectoryAngles = shuffleArray([...trajectoryAngles]);
        }
    }
    
    const angle = trajectoryAngles[mediaIndex] * (Math.PI / 180);
    const distance = (0.45 + Math.random() * 0.2) * Math.min(window.innerWidth, window.innerHeight);
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    const x = centerX + Math.cos(angle) * distance;
    const y = centerY + Math.sin(angle) * distance;

    gsap.set(media, {
        xPercent: -50,
        yPercent: -50,
        x: x,
        y: y,
    })
}

function handleWheel(e) {
    deltaTo(e.deltaY)

    window.clearTimeout(isWheeling) // Kill setTimeout
    isWheeling = setTimeout(() => { // Init setTimeout
        deltaTo(0) // Reset speed
    }, 120)
}

function tick(time, dt) {
    incr += deltaObject.value.delta / 600 + dt / 800
    tl.time(incr) // time() : go to a specific time of a timeline
}
</script>

<style>
body.has-home-scroll main {
  min-height: unset !important;
  padding-top: 0 !important;
}

body.has-home-scroll .back-to-top {
  display: none !important;
}
</style>

<style scoped>
.home-scroll-section {
  /* Styles for the section itself */
}

/* When this section is present, these styles will affect the parent elements */
:global(.home-scroll-section ~ main) {
  min-height: unset;
  padding-top: 0 !important;
}

:global(.home-scroll-section ~ .back-to-top) {
  display: none;
}

.home--logo {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
}

.home--container {
  height: 100vh;
  perspective: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
}
.home--container .container {
  height: 100%;
  transform-style: preserve-3d;
}

.home--container .media {
  width: 24%;
  height: auto;
  position: absolute;
  transform: translateZ(-300vw);
}

.home--container .media-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.home--container .media-title {
  margin-top: calc(var(--unit) * 1);
  font-size: calc(var(--unit) * 2);
  text-align: center;
  color: #fff;
  font-weight: 500;
  text-transform: uppercase;
}

.home--container .media img {
  width: 100%;
  height: auto;
  display: block;
  box-shadow: 1px 1px 30px rgba(0, 0, 0, 0.08);
  transition: transform 0.6s ease;
  transform-origin: bottom;
}

@media (min-width: 1023px) {
  .home--container .media-title {
    margin-top: 15px;
    font-size: 30px;
  }
  .home--container .media {
    width: 280px;
  }
}

.home--container .media-link:hover img {
  transform: scale(1.05);
}

.home--container .preload-medias img {
  width: 1px;
  height: 1px;
  top: 0;
  left: 0;
  position: absolute;
  visibility: hidden;
  pointer-events: none;
}

@media (max-width: 768px) {
  .home--container .media {
    width: 40%;
  }
}
</style> 