<template>
  <div class="sanity-blocks">
    <PortableText :value="blocks" />
  </div>
</template>

<script setup>
import { PortableText } from '@portabletext/vue'

defineProps({
  blocks: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
:deep(p) {
  margin-bottom: 1em;
}

:deep(h1),
:deep(h2),
:deep(h3),
:deep(h4) {
  margin: 1em 0 0.5em;
}

:deep(ul),
:deep(ol) {
  margin: 1em 0;
  padding-left: 1.5em;
}

:deep(li) {
  margin-bottom: 0.5em;
}

:deep(blockquote) {
  margin: 1em 0;
  padding-left: 1em;
  border-left: 2px solid currentColor;
}

:deep(a) {
  color: inherit;
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

:deep(a:hover) {
  text-decoration: none;
}
</style> 