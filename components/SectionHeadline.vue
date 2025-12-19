<template>
  <section v-if="section?.headlineContent">
    <div class="wrapper">
      <div :class="`py${section.headlineContent.padding || 6}`">
        <div
          class="grid"
          :class="{
            'text-center': section.headlineContent.centerText,
            'grid-center-items': section.headlineContent.centerBlock
          }"
        >
          <div class="col-span-12 col-span-10-md rte">
            <div class="h2" v-html="formattedHeadline"></div>
            <div v-if="section.headlineContent?.button?.text && section.headlineContent?.button?.url" class="py3 padtop">
              <a :href="section.headlineContent.button.url" class="button">
                <span>{{ section.headlineContent.button.text }}</span>
                <span>{{ section.headlineContent.button.text }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  section: {
    type: Object,
    required: true,
    validator: (value) => {
      return value && 
             value._type === 'section' && 
             value.sectionType === 'headline' &&
             value.headlineContent
    }
  }
})

// Convert newlines to paragraph breaks
const formattedHeadline = computed(() => {
  const headline = props.section?.headlineContent?.headline || ''
  if (!headline) return ''
  
  // Split by newlines (handles both \n and actual newlines)
  // Filter out empty strings from multiple consecutive newlines
  const lines = headline
    .replace(/\\n/g, '\n') // Convert escaped newlines to actual newlines
    .split(/\n+/)
    .filter(line => line.trim().length > 0)
  
  // Wrap each line in a paragraph tag
  return lines.map(line => `<p>${line.trim()}</p>`).join('')
})
</script>