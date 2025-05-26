<template>
    <transition name="fade">
      <div v-if="showButton" class="wrapper py2">
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
  showButton.value = pageHeight > 1.5 * viewportHeight
}

onMounted(() => {
  window.addEventListener('resize', checkVisibility)
  checkVisibility() // Initial check
})
onUnmounted(() => {
  window.removeEventListener('resize', checkVisibility)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.back-to-top {
  display: block;
}

.back-to-top button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: inherit;
}
</style> 