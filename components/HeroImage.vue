<template>
  <div class="hero-image">
    <img
      :src="src"
      :alt="alt"
      :class="{ roundal: isRoundal }"
      loading="lazy"
      :width="width"
      :height="height"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    required: true
  },
  isRoundal: {
    type: Boolean,
    default: false
  },
  width: {
    type: Number,
    default: 1920
  },
  height: {
    type: Number,
    default: 1080
  }
});
</script>

<style scoped>
.hero-image {
  width: 100%;
  height: 100%;
}

.hero-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
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