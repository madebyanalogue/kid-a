<template>
  <div class="hero-image">
    <img v-if="!isSvg" :src="src" :alt="alt" :class="[className, { roundal: isRoundal }]" />
    <object v-else :data="src" type="image/svg+xml" :class="[className, { roundal: isRoundal }]" @load="handleSvgLoad" ref="svgObject">
      <img :src="src" :alt="alt" :class="[className, { roundal: isRoundal }]" />
    </object>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted, watch } from 'vue';
import gsap from 'gsap';

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    required: true
  },
  className: {
    type: [String, Object],
    default: ''
  },
  isRoundal: {
    type: Boolean,
    default: false
  }
});

const svgObject = ref(null);
const isSvg = computed(() => {
  return props.src.toLowerCase().endsWith('.svg');
});

const startAnimation = (svgDoc) => {
  try {
    if (!svgDoc) {
      console.warn('SVG document not accessible');
      return;
    }

    const gElements = Array.from(svgDoc.querySelectorAll('g'));
    if (gElements.length === 0) {
      // If no g elements found, animate the entire SVG
      const svgElement = svgDoc.documentElement;
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
    const totalDuration = (gElements.length + 1) * delay; // +1 for the final delay

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
    console.error('Error handling SVG animation:', error);
  }
};

const handleSvgLoad = (event) => {
  const svgDoc = event.target.contentDocument;
  startAnimation(svgDoc);
};

// Handle initial load
onMounted(() => {
  if (svgObject.value && isSvg.value) {
    const svgDoc = svgObject.value.contentDocument;
    if (svgDoc) {
      startAnimation(svgDoc);
    }
  }
});

// Watch for src changes (navigation)
watch(() => props.src, () => {
  if (svgObject.value && isSvg.value) {
    const svgDoc = svgObject.value.contentDocument;
    if (svgDoc) {
      startAnimation(svgDoc);
    }
  }
});

// Cleanup animation on component unmount
onUnmounted(() => {
  if (svgObject.value) {
    const svgDoc = svgObject.value.contentDocument;
    if (svgDoc) {
      const gElements = svgDoc.querySelectorAll('g');
      gElements.forEach(g => {
        g.style.opacity = '1';
      });
    }
  }
});
</script>

<style scoped>
.hero-image {
  width: 100%;
  height: 100%;
  position: relative;
  pointer-events: none;
}

.hero-image img,
.hero-image object {
  width: 100%;
  height: 100%;
  display: block;
  pointer-events: none;
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