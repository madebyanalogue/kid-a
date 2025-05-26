<template>
  <section>
    <div class="wrapper">
      <div class="py6">
        <div class="col-span-12 col-span-9-md rte">
          <h2>{{ section.basicContent.title }}</h2>
          <SanityBlocks :blocks="section.basicContent.content" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({ section: Object })
// section.basicContent.title and section.basicContent.content are used directly in the template
</script>