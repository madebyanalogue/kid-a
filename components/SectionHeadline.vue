<template>
  <section v-if="section?.headlineContent">
    <div class="wrapper">
      <div class="py6">
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

// Convert line breaks to <br/> with null check
const formattedHeadline = computed(() =>
  (props.section?.headlineContent?.headline || '').replace(/\\n/g, '<br/>')
)
</script>