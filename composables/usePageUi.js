import { ref, watch } from 'vue'

export const isDark = ref(false)

watch(isDark, (val) => {
  if (typeof window !== 'undefined') {
    if (val) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
}, { immediate: true }) 