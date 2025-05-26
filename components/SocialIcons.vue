<template>
    <div class="row gap-2 social-icons">
      <a v-if="linkedinUrl" :href="linkedinUrl" target="_blank">
        <svg id="a" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 67 67">
          <path fill="currentColor" d="M66.71,33.5c0,18.34-14.87,33.21-33.21,33.21S.29,51.84.29,33.5,15.16.29,33.5.29s33.21,14.87,33.21,33.21ZM20.91,15.65c-5.64.46-4.83,8.44.98,7.79,5.26-.59,4.68-8.25-.98-7.79ZM29.23,49.23h7.33l.22-.22v-13.92c0-.12.55-1.22.68-1.4,1.79-2.56,5.75-2.4,6.8.74.09.28.38,1.34.38,1.55v13.03l.22.22h7.11l.23-.51c-.64-5.97,2-17.14-3.58-21.18-3.52-2.54-9.5-2.06-11.69,1.99h-.22c-.21-.02.07-.19.07-.22v-2.74h-7.55v22.66ZM25.08,26.57h-7.55v22.66h7.55v-22.66Z"/>
        </svg>
      </a>
    </div>
</template>

<script setup>
const props = defineProps({ linkedinUrl: String })
</script>

<style scoped>
.social-icons svg {
  width: calc(var(--unit) * 3);
  height: calc(var(--unit) * 3);
}
</style> 