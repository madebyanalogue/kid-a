<template>
  <div class="wrapper py2">
    <transition name="fade">
      <div v-if="showButton" class="back-to-top">
      <button @click="scrollToTop">
        <div class="circle--heading"><span class="circle"></span><span>Back to top</span></div>
      </button>
    </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
const showButton = ref(false)
const buttonRef = ref(null)

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function checkVisibility() {
  const pageHeight = document.body.scrollHeight
  const viewportHeight = window.innerHeight
  const button = buttonRef.value
  if (!button) {
    showButton.value = false
    return
  }
  const rect = button.getBoundingClientRect()
  // Show if button is in viewport and page is tall enough
  showButton.value =
    pageHeight > 2 * viewportHeight &&
    rect.top < viewportHeight &&
    rect.bottom > 0
}

onMounted(() => {
  window.addEventListener('scroll', checkVisibility)
  window.addEventListener('resize', checkVisibility)
  setTimeout(checkVisibility, 100) // Initial check after render
})
onUnmounted(() => {
  window.removeEventListener('scroll', checkVisibility)
  window.removeEventListener('resize', checkVisibility)
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}
</style> 