<template>
    <transition name="fade">
      <div v-if="!isFooterHidden" class="wrapper py2">
        <div class="back-to-top">
          <button @click="scrollToTop">
            <div class="circle--heading"><span class="circle"></span><span>Back to top</span></div>
          </button>
        </div>
      </div>
    </transition>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { usePageSettings } from '~/composables/usePageSettings'

const { page } = usePageSettings()
const isFooterHidden = ref(false)

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Watch for page changes to update footer visibility
watch(() => page.value, (newPage) => {
  isFooterHidden.value = newPage?.hideFooter || false
}, { immediate: true })
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
  bottom: var(--pad-2);
  right: var(--pad-2);
  z-index: 100;
}

.back-to-top button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: inherit;
}

@media (max-width: 768px) {
  .back-to-top {
    bottom: var(--pad-1);
    right: var(--pad-1);
  }
}
</style> 