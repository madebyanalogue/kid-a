<template>
  <section class="hero--container">
    <div class="wrapper">
      <div class="draggable--container" :style="`aspect-ratio: ${aspectRatio}`">
        <div
          v-for="(element, index) in heroElements"
          :key="index"
          class="hero--element"
          :class="{ 'no-pointer': !element.isDraggable }"
          :style="element.style"
          :ref="el => { if (el) elementRefs[index] = el }"
        >
          <template v-if="element.htmlContent && element.htmlContent.trim()">
            <div class="hero-text-content" v-html="element.htmlContent" :ref="el => setTextContentRef(el, index)"></div>
          </template>
          <template v-else-if="element.imageUrl">
            <HeroImage
              :key="element.imageUrl"
              :src="element.imageUrl"
              :alt="element.alt"
              :isRoundal="element.isRoundal"
              :width="element.width"
              :height="parseInt(element.height) || 0"
            />
          </template>
          <template v-else>
            <!-- No content to render -->
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed, watch, nextTick, onUpdated } from 'vue';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import HeroImage from './HeroImage.vue';
import { useSanityImage } from '~/composables/useSanityImage';

const props = defineProps({
  section: {
    type: Object,
    default: null
  }
});

// Watch the section prop
watch(() => props.section, (newVal, oldVal) => {
  console.log('SectionHero section changed:', {
    old: oldVal ? {
      type: oldVal._type,
      sectionType: oldVal.sectionType,
      hasHeroContent: !!oldVal.heroContent,
      heroElements: oldVal.heroContent?.heroElements?.length || 0
    } : null,
    new: newVal ? {
      type: newVal._type,
      sectionType: newVal.sectionType,
      hasHeroContent: !!newVal.heroContent,
      heroElements: newVal.heroContent?.heroElements?.length || 0,
      rawHeroContent: newVal.heroContent,
      rawHeroElements: newVal.heroContent?.heroElements
    } : null
  });
}, { immediate: true, deep: true });

const elementRefs = ref([]);
const currentZIndex = ref(100);
const textContentRefs = ref([]);

// Map Sanity heroElements to the format your template expects
const heroElements = computed(() => {
  const elements = props.section?.heroContent?.heroElements || [];
  return elements.map(element => {
    const htmlContent = element.htmlContent || '';
    let imageUrl = '';
    if (element.image?.asset?.url) {
      imageUrl = element.image.asset.url;
    } else if (element.image?.asset?._ref) {
      try {
        imageUrl = useSanityImage().getImageUrl(element.image);
      } catch (err) {
        // Silent error handling
      }
    }
    const pixelWidth = Math.round((element.width || 100) * 20);
    return {
      ...element,
      htmlContent,
      imageUrl,
      width: pixelWidth,
      height: Math.round(pixelWidth * (element.height || 1)),
      style: `width: ${element.width || 100}%; left: ${element.left || 0}%; top: ${element.top || 0}%; height: auto;`
    };
  });
});

// Get aspect ratio from Sanity
const aspectRatio = computed(() => {
  return props.section?.heroContent?.aspectRatio || '1/1';
});

function setTextContentRef(el, index) {
  if (el) textContentRefs.value[index] = el;
}

const startAnimation = (svgDoc) => {
  try {
    if (!svgDoc) return;
    const gElements = Array.from(svgDoc.querySelectorAll('g'));
    if (gElements.length === 0) {
      const svgElement = svgDoc.documentElement || svgDoc;
      if (svgElement) {
        svgElement.style.opacity = '0';
        gsap.to(svgElement, {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out'
        });
      }
      return;
    }
    // Set initial state
    gElements.forEach(g => {
      g.style.opacity = '0';
    });
    // Create animation sequence
    let currentIndex = 0;
    const delay = 400;
    const totalDuration = (gElements.length + 1) * delay;
    const animate = () => {
      if (currentIndex < gElements.length) {
        gElements[currentIndex].style.opacity = '1';
        currentIndex++;
        setTimeout(animate, delay);
      } else {
        // Wait for final delay before resetting
        setTimeout(() => {
          gElements.forEach(g => {
            g.style.opacity = '0';
          });
          currentIndex = 0;
          setTimeout(animate, delay);
        }, delay);
      }
    };
    // Start animation
    animate();
  } catch (error) {
    // Silent error handling
  }
};

onMounted(() => {
  gsap.registerPlugin(Draggable);

  // Initialize elements with opacity
  nextTick(() => {
    heroElements.value.forEach((element, index) => {
      const el = elementRefs.value[index];
      if (el) {
        gsap.set(el, { 
          x: 0,
          y: 0,
          clearProps: 'transform',
          opacity: 1
        });
      }
    });

    // Initialize draggable elements
    heroElements.value.forEach((element, index) => {
      const el = elementRefs.value[index];
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

    // Initialize SVG animations
    textContentRefs.value.forEach((container) => {
      if (container?.innerHTML?.includes('<svg')) {
        const svg = container.querySelector('svg');
        if (svg) {
          startAnimation(svg.ownerDocument || svg);
        }
      }
    });
  });
});

onUpdated(() => {
  nextTick(() => {
    textContentRefs.value.forEach((container) => {
      if (container?.innerHTML?.includes('<svg')) {
        const svg = container.querySelector('svg');
        if (svg) {
          startAnimation(svg.ownerDocument || svg);
        }
      }
    });
  });
});
</script>

<style scoped>
.hero--container {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.draggable--container {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 100%; /* Default aspect ratio, will be overridden by dynamic style */
}

.hero--element {
  position: absolute;
}

.hero--element.no-pointer {
  pointer-events: none;
}

.svg-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.svg-wrapper :deep(svg) {
  width: 100%;
  height: 100%;
  display: block;
}

.svg-wrapper :deep(.svg-shape) {
  transition: fill 0.3s ease;
}

.svg-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.05);
  color: #666;
  font-size: 0.875rem;
}

.roundal {
  animation: rotate 10s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

</style> 