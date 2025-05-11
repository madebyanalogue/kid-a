<template>
  <section class="hero--container">
    <div class="wrapper">
      <div v-if="!props.section || props.section == 1" class="draggable--container" style="aspect-ratio: 1/1;">
        <div v-for="(element, index) in heroElements[0]" 
             :key="index"
             :ref="el => { if (el) elementRefs[index] = el }"
             class="hero--element"
             :style="element.style">
          <img :src="element.image" :alt="element.alt" :class="{ roundal: element.isRoundal }" />
        </div>
      </div>

      <div v-if="!props.section || props.section == 2" class="draggable--container" style="aspect-ratio: 1/1;background:url('/images/hero-2.jpg') no-repeat top left / cover;">
        <div v-for="(element, index) in heroElements[1]" 
             :key="index"
             :ref="el => { if (el) elementRefs[index] = el }"
             class="hero--element"
             :style="element.style">
          <img :src="element.image" :alt="element.alt" :class="{ roundal: element.isRoundal }" />
        </div>
      </div>

      <div v-if="!props.section || props.section == 3" class="draggable--container" style="aspect-ratio: 1/1;background:url('/images/hero-3.jpg') no-repeat top left / cover;">
        <div v-for="(element, index) in heroElements[2]" 
             :key="index"
             :ref="el => { if (el) elementRefs[index] = el }"
             class="hero--element"
             :style="element.style">
          <img :src="element.image" :alt="element.alt" :class="{ roundal: element.isRoundal }" />
        </div>
      </div>

      <div v-if="!props.section || props.section == 4" class="draggable--container" style="aspect-ratio: 5/4;background:url('/images/hero-4.jpg') no-repeat top left / cover;">
        <div v-for="(element, index) in heroElements[3]" 
             :key="index"
             :ref="el => { if (el) elementRefs[index] = el }"
             class="hero--element"
             :style="element.style">
          <img :src="element.image" :alt="element.alt" :class="{ roundal: element.isRoundal }" />
        </div>
      </div>

      <div v-if="!props.section || props.section == 5" class="draggable--container" style="aspect-ratio: 1/1;background:url('/images/hero-5.jpg') no-repeat top left / cover;">
        <div v-for="(element, index) in heroElements[4]" 
             :key="index"
             :ref="el => { if (el) elementRefs[index] = el }"
             class="hero--element"
             :style="element.style">
          <img :src="element.image" :alt="element.alt" :class="{ roundal: element.isRoundal }" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';

const props = defineProps({
  section: {
    type: [String, Number],
    default: null
  }
});

const elementRefs = ref([]);
const currentZIndex = ref(100);

const heroElements = [
  // Section 1 - About
  [
    { style: 'width: 58%;left:0%;top:4.5%;height: auto;', image: '/images/about-hero-1.jpg', alt: 'Hero 1' },
    { style: 'width: 44%;left:56%;top:30%;height: auto;', image: '/images/about-hero-2.jpg', alt: 'Hero 2' },
    { style: 'width: 56%;left:23%;top:12%;height: auto;', image: '/images/about-hero-5.svg', alt: 'Hero 5' },
    { style: 'width: 38%;left:0%;top:39%;height: auto;', image: '/images/about-hero-3.jpg', alt: 'Hero 3' },
    { style: 'width: 27%;left:24%;top:59%;height: auto;', image: '/images/about-hero-4.jpg', alt: 'Hero 4' },
    { style: 'width: 23%;left:73%;top:76%;height: auto;', image: '/images/about-hero-roundal.svg', alt: 'Hero Roundal', isRoundal: true },
    { style: 'width: 20%;left:17%;top:53.35%;height: auto;', image: '/images/about-hero-6.svg', alt: 'Hero 6' }
  ],
  // Section 2 - What
  [
    { style: 'width: 58%;left:0%;top:0%;height: auto;', image: '/images/what-hero-1.jpg', alt: 'Hero 1' },
    { style: 'width: 44%;left:56%;top:30%;height: auto;', image: '/images/what-hero-2.jpg', alt: 'Hero 2' },
    { style: 'width: 38%;left:0%;top:39%;height: auto;', image: '/images/what-hero-3.jpg', alt: 'Hero 3' },
    { style: 'width: 27%;left:24%;top:59%;height: auto;', image: '/images/what-hero-4.jpg', alt: 'Hero 4' },
    { style: 'width: 56%;left:23%;top:12%;height: auto;', image: '/images/what-hero-5.svg', alt: 'Hero 5' },
    { style: 'width: 23%;left:73%;top:76%;height: auto;', image: '/images/what-hero-roundal.svg', alt: 'Hero Roundal', isRoundal: true }
  ],
  // Section 3 - Life
  [
    { style: 'width: 58%;left:0%;top:0%;height: auto;', image: '/images/life-hero-1.jpg', alt: 'Hero 1' },
    { style: 'width: 44%;left:56%;top:30%;height: auto;', image: '/images/life-hero-2.jpg', alt: 'Hero 2' },
    { style: 'width: 38%;left:0%;top:39%;height: auto;', image: '/images/life-hero-3.jpg', alt: 'Hero 3' },
    { style: 'width: 27%;left:24%;top:59%;height: auto;', image: '/images/life-hero-4.jpg', alt: 'Hero 4' },
    { style: 'width: 56%;left:23%;top:12%;height: auto;', image: '/images/life-hero-5.svg', alt: 'Hero 5' },
    { style: 'width: 23%;left:73%;top:76%;height: auto;', image: '/images/life-hero-roundal.svg', alt: 'Hero Roundal', isRoundal: true }
  ],
  // Section 4 - Press
  [
    { style: 'width: 58%;left:0%;top:0%;height: auto;', image: '/images/press-hero-1.jpg', alt: 'Hero 1' },
    { style: 'width: 44%;left:56%;top:30%;height: auto;', image: '/images/press-hero-2.jpg', alt: 'Hero 2' },
    { style: 'width: 38%;left:0%;top:39%;height: auto;', image: '/images/press-hero-3.jpg', alt: 'Hero 3' },
    { style: 'width: 27%;left:24%;top:59%;height: auto;', image: '/images/press-hero-4.jpg', alt: 'Hero 4' },
    { style: 'width: 56%;left:23%;top:12%;height: auto;', image: '/images/press-hero-5.svg', alt: 'Hero 5' },
    { style: 'width: 23%;left:73%;top:76%;height: auto;', image: '/images/press-hero-roundal.svg', alt: 'Hero Roundal', isRoundal: true }
  ],
  // Section 5 - Playlists
  [
    { style: 'width: 58%;left:0%;top:0%;height: auto;', image: '/images/playlist-hero-1.jpg', alt: 'Hero 1' },
    { style: 'width: 44%;left:56%;top:30%;height: auto;', image: '/images/playlist-hero-2.jpg', alt: 'Hero 2' },
    { style: 'width: 38%;left:0%;top:39%;height: auto;', image: '/images/playlist-hero-3.jpg', alt: 'Hero 3' },
    { style: 'width: 27%;left:24%;top:59%;height: auto;', image: '/images/playlist-hero-4.jpg', alt: 'Hero 4' },
    { style: 'width: 56%;left:23%;top:12%;height: auto;', image: '/images/playlist-hero-5.svg', alt: 'Hero 5' },
    { style: 'width: 23%;left:73%;top:76%;height: auto;', image: '/images/playlist-hero-roundal.svg', alt: 'Hero Roundal', isRoundal: true }
  ]
];

onMounted(() => {
  // Initialize GSAP Draggable
  gsap.registerPlugin(Draggable);

  // Simple opacity animation with staggered delay
  elementRefs.value.forEach((el, index) => {
    if (el) {
      gsap.set(el, { 
        x: 0,
        y: 0,
        clearProps: 'transform'
      });
      
      gsap.to(el, {
        opacity: 1,
        duration: 0,
        delay: index * 0.2
      });
    }
  });

  // Make elements draggable
  elementRefs.value.forEach((el, index) => {
    if (el) {
      Draggable.create(el, {
        type: 'x,y',
        bounds: '.draggable--container',
        inertia: true,
        onDragStart: function() {
          currentZIndex.value++;
          gsap.set(this.target, { zIndex: currentZIndex.value });
        },
        onDragEnd: function() {
          // Ensure the element stays within bounds
          const bounds = this.getBounds();
          if (bounds.x < 0) gsap.set(this.target, { x: 0 });
          if (bounds.y < 0) gsap.set(this.target, { y: 0 });
        }
      });
    }
  });
});
</script>

<style scoped>
.hero--container img {
  width: 100%;
}
.hero--element {
  position: absolute;
  will-change: transform;
  transform: none;
  opacity: 0;
}
.draggable--container {
  position: relative;
  overflow: hidden;
}
.roundal {
  animation: rotate 10s linear infinite;
} 
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style> 