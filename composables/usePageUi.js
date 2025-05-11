import { ref, watch } from 'vue'

export const isDark = ref(false)
export const useHeaderPadding = ref(true) // true = header height, false = pad-2

watch(isDark, (val) => {
  if (typeof window !== 'undefined') {
    if (val) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
}, { immediate: true }) 