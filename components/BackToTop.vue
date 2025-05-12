<template>
    <transition v-if="showButton" name="fade">
      <div class="wrapper py2">
        <div class="back-to-top">
          <button @click="scrollToTop">
            <div class="circle--heading"><span class="circle"></span><span>Back to top</span></div>
          </button>
        </div>
      </div>
    </transition>
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
  const scrollY = window.scrollY || window.pageYOffset

  // Show if scrolled down more than 1 viewport height
  showButton.value = scrollY > viewportHeight
}

onMounted(() => {
  window.addEventListener('scroll', checkVisibility)
  window.addEventListener('resize', checkVisibility)
  checkVisibility() // Initial check
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