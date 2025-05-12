<template>
  <section class="hero--container">
    <div class="wrapper">
      <div v-if="!props.section || props.section == 1" class="draggable--container" style="aspect-ratio: 1/1;">
        <div v-for="(element, index) in heroElements[0]" 
             :key="index"
             :ref="el => { if (el) elementRefs[0][index] = el }"
             class="hero--element"
             :class="{ 'no-pointer': !element.isDraggable }"
             :style="element.style">
          <HeroImage 
            :src="element.image" 
            :alt="element.alt" 
            :isRoundal="element.isRoundal"
            :class="element.class" 
          />
        </div>
      </div>

      <div v-if="!props.section || props.section == 2" class="draggable--container" style="aspect-ratio: 15/13.6;">
        <div v-for="(element, index) in heroElements[1]" 
             :key="index"
             :ref="el => { if (el) elementRefs[1][index] = el }"
             class="hero--element"
             :class="{ 'no-pointer': !element.isDraggable }"
             :style="element.style">
          <HeroImage 
            :src="element.image" 
            :alt="element.alt" 
            :isRoundal="element.isRoundal"
            :class="element.class" 
          />
        </div>
      </div>

      <div v-if="!props.section || props.section == 3" class="draggable--container" style="aspect-ratio: 15/13.6;">
        <div v-for="(element, index) in heroElements[2]" 
             :key="index"
             :ref="el => { if (el) elementRefs[2][index] = el }"
             class="hero--element"
             :class="{ 'no-pointer': !element.isDraggable }"
             :style="element.style">
          <HeroImage 
            :src="element.image" 
            :alt="element.alt" 
            :isRoundal="element.isRoundal"
            :class="element.class" 
          />
        </div>
      </div>

      <div v-if="!props.section || props.section == 4" class="draggable--container" style="aspect-ratio: 5/4;">
        <div v-for="(element, index) in heroElements[3]" 
             :key="index"
             :ref="el => { if (el) elementRefs[3][index] = el }"
             class="hero--element"
             :class="{ 'no-pointer': !element.isDraggable }"
             :style="element.style">
          <HeroImage 
            :src="element.image" 
            :alt="element.alt" 
            :isRoundal="element.isRoundal"
            :class="element.class" 
          />
        </div>
      </div>

      <div v-if="!props.section || props.section == 5" class="draggable--container" style="aspect-ratio: 5/4;">
        <div v-for="(element, index) in heroElements[4]" 
             :key="index"
             :ref="el => { if (el) elementRefs[4][index] = el }"
             class="hero--element"
             :class="{ 'no-pointer': !element.isDraggable }"
             :style="element.style">
          <HeroImage 
            :src="element.image" 
            :alt="element.alt" 
            :isRoundal="element.isRoundal"
            :class="element.class" 
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import HeroImage from './HeroImage.vue';

const props = defineProps({
  section: {
    type: [String, Number],
    default: null
  }
});

// Initialize elementRefs as a nested array
const elementRefs = ref(Array(5).fill().map(() => []));
const currentZIndex = ref(100);

const heroElements = [
  // Section 1 - About
  [
    { style: 'width: 58%;left:0%;top:4.5%;height: auto;', image: '/images/about-hero-1.jpg', alt: 'Hero 1', isDraggable: true },
    { style: 'width: 44%;left:56%;top:30%;height: auto;', image: '/images/about-hero-2.jpg', alt: 'Hero 2', isDraggable: true },
    { style: 'width: 56%;left:23%;top:12%;height: auto;', image: '/images/about-hero-5.svg', alt: 'Hero 5', class: 'about--hero--svg', isDraggable: false },
    { style: 'width: 38%;left:0%;top:39%;height: auto;', image: '/images/about-hero-3.jpg', alt: 'Hero 3', isDraggable: true },
    { style: 'width: 27%;left:24%;top:59%;height: auto;', image: '/images/about-hero-4.jpg', alt: 'Hero 4', isDraggable: true },
    { style: 'width: 23%;left:73%;top:76%;height: auto;', image: '/images/about-hero-roundal.svg', alt: 'Hero Roundal', isRoundal: true, isDraggable: true },
    { style: 'width: 20%;left:17%;top:53.35%;height: auto;', image: '/images/about-hero-6.svg', alt: 'Hero 6', isDraggable: true }
  ],
  // Section 2 - What
  [
    { style: 'width: 58%;left:42%;top:0%;height: auto;', image: '/images/what-hero-5.jpg', alt: 'Hero 5', isDraggable: true },
    { style: 'width: 73%;left:0%;top:23%;height: auto;', image: '/images/what-hero-1.svg', alt: 'Hero 1', isDraggable: false },
    { style: 'width: 38%;left:22%;top:56%;height: auto;', image: '/images/what-hero-3.jpg', alt: 'Hero 3', isDraggable: true },
    { style: 'width: 29%;left:63%;top:30%;height: auto;', image: '/images/what-hero-4.jpg', alt: 'Hero 4', isDraggable: true },
    { style: 'width: 30%;left:30%;top:77%;height: auto;', image: '/images/what-hero-2.jpg', alt: 'Hero 2', isDraggable: true },
    { style: 'width: 23%;left:73%;top:76%;height: auto;', image: '/images/what-hero-roundal.svg', alt: 'Hero Roundal', isRoundal: true, isDraggable: true }
  ],
  // Section 3 - Life
  [
    { style: 'width: 100%;left:0%;top:0%;height: auto;', image: '/images/life-hero-3.svg', alt: 'Hero 3', isDraggable: false },
    { style: 'width: 26%;left:38%;top:27%;height: auto;', image: '/images/life-hero-1.jpg', alt: 'Hero 1', isDraggable: true },
    { style: 'width: 44%;left:48%;top:34%;height: auto;', image: '/images/life-hero-2.png', alt: 'Hero 2', isDraggable: true },
    { style: 'width: 54%;left:12%;top:11%;height: auto;', image: '/images/life-hero-4.png', alt: 'Hero 4', isRoundal: true, isDraggable: true },
    { style: 'width: 34%;left:25%;top:73%;height: auto;', image: '/images/life-hero-5.png', alt: 'Hero 5', isDraggable: true },
    { style: 'width: 23%;left:73%;top:76%;height: auto;', image: '/images/life-hero-roundal.svg', alt: 'Hero Roundal', isRoundal: true, isDraggable: true }
  ],
  // Section 4 - Press
  [
    { style: 'width: 64%;left:0%;top:0%;height: auto;', image: '/images/press-hero-1.jpg', alt: 'Hero 1', isDraggable: true },
    { style: 'width: 100%;left:0%;top:7%;height: auto;', image: '/images/press-hero-4.svg', alt: 'Hero 4', isDraggable: false },
    { style: 'width: 34%;left:40%;top:38%;height: auto;', image: '/images/press-hero-2.jpg', alt: 'Hero 2', isDraggable: true },
    { style: 'width: 18%;left:66%;top:24%;height: auto;', image: '/images/press-hero-3.svg', alt: 'Hero 3', isDraggable: true },
    { style: 'width: 23%;left:73%;top:72%;height: auto;', image: '/images/press-hero-roundal.svg', alt: 'Hero Roundal', isRoundal: true, isDraggable: true }
  ],
  // Section 5 - Playlists
  [
    { style: 'width: 100%;left:0%;top:0%;height: auto;', image: '/images/playlist-hero-1.svg', alt: 'Hero 1', isDraggable: false },
    { style: 'width: 44%;left:28%;top:11%;height: auto;', image: '/images/playlist-hero-2.jpg', alt: 'Hero 2', isDraggable: true },
    { style: 'width: 24%;left:18%;top:20%;height: auto;', image: '/images/playlist-hero-3.jpg', alt: 'Hero 3', isDraggable: true },
    { style: 'width: 20%;left:60%;top:46%;height: auto;', image: '/images/playlist-hero-4.jpg', alt: 'Hero 4', isDraggable: true },
    { style: 'width: 18%;left:58%;top:2%;height: auto;', image: '/images/playlist-hero-5.svg', alt: 'Hero 5', isDraggable: true }
  ]
];

onMounted(() => {
  // Initialize GSAP Draggable
  gsap.registerPlugin(Draggable);

  // Simple opacity animation with staggered delay
  heroElements.forEach((section, sectionIndex) => {
    section.forEach((element, elementIndex) => {
      const el = elementRefs.value[sectionIndex][elementIndex];
      if (el) {
        gsap.set(el, { 
          x: 0,
          y: 0,
          clearProps: 'transform'
        });
        
        gsap.to(el, {
          opacity: 1,
          duration: 0,
          delay: elementIndex * 0.15
        });
      }
    });
  });

  // Make elements draggable only if isDraggable is true
  heroElements.forEach((section, sectionIndex) => {
    section.forEach((element, elementIndex) => {
      const el = elementRefs.value[sectionIndex][elementIndex];
      if (el && element.isDraggable === true) {
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
            const rect = this.target.getBoundingClientRect();
            const container = this.target.parentElement.getBoundingClientRect();
            
            if (rect.left < container.left) {
              gsap.set(this.target, { x: 0 });
            }
            if (rect.top < container.top) {
              gsap.set(this.target, { y: 0 });
            }
          }
        });
      }
    });
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
.hero--element.no-pointer {
  pointer-events: none;
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