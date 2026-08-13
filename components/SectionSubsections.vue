<template>
  <section v-if="subsections.length">
    <div
      v-for="(subsection, index) in subsections"
      :key="subsection._key || index"
      class="subsection"
      :class="`subsection--${subsection.layout || 'content'}`"
    >
      <!-- Cover layout -->
      <div
        v-if="subsection.layout === 'cover'"
        class="subsection-cover"
        :class="{ 'subsection-cover--header-padding': subsection.coverHeaderPadding }"
        :style="getCoverStyle(subsection)"
      >
        <div class="wrapper">
          <div class="py4 subsection-cover__content subsection-inner">
            <div class="grid text-center">
              <div class="col-span-12">
                <p v-if="subsection.title" class="h2">
                  {{ subsection.title }}
                </p>
                <div v-if="subsection.intro?.length" class="rte mt2">
                  <SanityBlocks :blocks="subsection.intro" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact layout -->
      <div v-else-if="subsection.layout === 'contact'" class="wrapper">
        <div class="py4 subsection-inner">
          <div class="subsection-grid">
            <div
              v-if="subsection.title || getSubsectionImageUrl(subsection)"
              class="subsection-sidebar"
            >
              <p v-if="subsection.title" class="subsection-title medium">
                {{ subsection.title }}
              </p>
              <NuxtImg
                v-if="getSubsectionImageUrl(subsection)"
                :src="getSubsectionImageUrl(subsection)"
                :alt="getSubsectionImageAlt(subsection)"
                class="subsection-image"
                loading="lazy"
              />
            </div>
            <div class="subsection-content rte">
              <div v-if="subsection.intro?.length" class="rte">
                <SanityBlocks :blocks="subsection.intro" />
              </div>
              <div class="contact-items uppercase">
                <div
                  v-for="(item, itemIndex) in getContactItems(subsection.items)"
                  :key="item._key || itemIndex"
                  class="contact-item"
                >
                  <span
                    v-if="item.iconType"
                    class="contact-icon"
                    aria-hidden="true"
                  >
                    <svg
                      v-if="item.iconType === 'email'"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <rect x="3" y="5" width="18" height="14" stroke="currentColor" stroke-width="1.5" />
                      <path d="M3 7l9 6 9-6" stroke="currentColor" stroke-width="1.5" />
                    </svg>
                    <svg
                      v-else
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M6.5 4h11a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
                        stroke="currentColor"
                        stroke-width="1.5"
                      />
                      <path d="M10 17h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                    </svg>
                  </span>
                  <div class="contact-body">
                    <div v-if="item.title" class="contact-label medium">{{ item.title }}</div>
                    <div v-if="hasContent(item)" class="contact-value rte">
                      <SanityBlocks :blocks="contentBlocks(item.content)" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Default content layout -->
      <div v-else class="wrapper">
        <div class="py4 subsection-inner">
          <div class="subsection-grid">
            <div
              v-if="subsection.title || getSubsectionImageUrl(subsection)"
              class="subsection-sidebar"
            >
              <p v-if="subsection.title" class="subsection-title medium">
                {{ subsection.title }}
              </p>
              <NuxtImg
                v-if="getSubsectionImageUrl(subsection)"
                :src="getSubsectionImageUrl(subsection)"
                :alt="getSubsectionImageAlt(subsection)"
                class="subsection-image"
                loading="lazy"
              />
            </div>
            <div class="subsection-content rte">
              <div v-if="subsection.intro?.length" class="intro">
                <SanityBlocks :blocks="subsection.intro" />
              </div>

              <div v-if="faqItems(subsection.items).length" class="faq-list">
                <div
                  v-for="(item, itemIndex) in faqItems(subsection.items)"
                  :key="item._key || itemIndex"
                  class="faq-item"
                >
                  <div v-if="item.title" class="faq-question medium">
                    <span class="faq-question-text">{{ item.title }}</span>
                    <span class="faq-chevron" aria-hidden="true">
                      <span class="faq-chevron-clip">
                        <span class="faq-chevron-box"></span>
                      </span>
                    </span>
                  </div>
                  <div v-if="hasContent(item)" class="faq-answer">
                    <SanityBlocks :blocks="contentBlocks(item.content)" />
                  </div>
                </div>
              </div>

              <ol v-if="stepItems(subsection.items).length" class="step-list">
                <li
                  v-for="(item, itemIndex) in stepItems(subsection.items)"
                  :key="item._key || itemIndex"
                  class="step-item"
                >
                  <span class="step-square" aria-hidden="true" />
                  <div class="step-body">
                    <p v-if="item.title" class="step-title medium">{{ item.title }}</p>
                    <div v-if="hasContent(item)" class="step-content">
                      <SanityBlocks :blocks="contentBlocks(item.content)" />
                    </div>
                  </div>
                </li>
              </ol>

              <ul v-if="bulletItems(subsection.items).length" class="bullet-list">
                <li
                  v-for="(item, itemIndex) in bulletItems(subsection.items)"
                  :key="item._key || itemIndex"
                >
                  <span v-if="item.title" class="medium">{{ item.title }}</span>
                  <SanityBlocks
                    v-if="hasContent(item)"
                    :blocks="contentBlocks(item.content)"
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useSanityImage } from '~/composables/useSanityImage'

const props = defineProps({
  section: {
    type: Object,
    required: true,
    validator: (value) =>
      value &&
      value._type === 'section' &&
      value.sectionType === 'subsections'
  }
})

const { getImageUrl } = useSanityImage()

const subsections = computed(() => props.section?.subsectionsContent?.subsections || [])

function getSubsectionImageUrl(subsection) {
  return getImageUrl(subsection?.image)
}

function getSubsectionImageAlt(subsection) {
  return subsection?.image?.alt || subsection?.title || ''
}

function getCoverStyle(subsection) {
  const imageUrl = getSubsectionImageUrl(subsection)
  if (!imageUrl) return undefined

  return {
    backgroundImage: `url(${imageUrl})`
  }
}

function itemsByType(items, type) {
  return (items || []).filter((item) => item.itemType === type)
}

function faqItems(items) {
  return itemsByType(items, 'faq')
}

function stepItems(items) {
  return itemsByType(items, 'step')
}

function bulletItems(items) {
  return itemsByType(items, 'bullet')
}

function contactItems(items) {
  return itemsByType(items, 'contact')
}

function getContactItems(items) {
  return contactItems(items).map((item) => ({
    ...item,
    iconType: getContactIconType(item)
  }))
}

function contentBlocks(content) {
  if (!content) return []
  if (Array.isArray(content)) return content
  if (typeof content === 'string') {
    return [{
      _type: 'block',
      style: 'normal',
      markDefs: [],
      children: [{ _type: 'span', marks: [], text: content }]
    }]
  }
  return []
}

function hasContent(item) {
  return contentBlocks(item?.content).length > 0
}

function getContactIconType(item) {
  const label = (item?.title || '').toLowerCase()

  if (label.includes('email') || label.includes('e-mail')) {
    return 'email'
  }

  if (label.includes('phone') || label.includes('tel') || label.includes('call')) {
    return 'phone'
  }

  for (const block of contentBlocks(item?.content)) {
    for (const markDef of block.markDefs || []) {
      if (markDef._type !== 'link' || !markDef.href) continue

      const href = markDef.href.toLowerCase()
      if (href.startsWith('mailto:')) return 'email'
      if (href.startsWith('tel:')) return 'phone'
    }

    const text = block.children?.map((child) => child.text).join('') || ''

    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text.trim())) {
      return 'email'
    }

    if (/^[\d\s+()-]+$/.test(text.trim()) && text.replace(/\D/g, '').length >= 7) {
      return 'phone'
    }
  }

  return null
}
</script>

<style scoped>
section {
  --content-indent: 40px;
  font-size: clamp(18px, 2vw, 22px);
}

section :deep(p:last-child) {
  margin-bottom: 0;
}

.subsection:not(:first-child) .subsection-inner {
  border-top: 1px solid currentColor;
}

.subsection-title {
  margin-bottom: var(--pad-4);
  text-align: center;
  font-size:120%;
}

.subsection-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--pad-4);
}

@media (min-width: 768px) {
  .subsection-grid {
    grid-template-columns: 1fr;
    max-width: 760px;
    margin: 0 auto;
  }
  section {
    --content-indent: 80px;
  }

  .subsection-title {
    text-align: left;
  }
}


@media (min-width: 1200px) {
  .subsection-grid {
    grid-template-columns: minmax(0, 600px) minmax(0, 730px);
    gap: 130px;
    max-width: 1459px;
    margin: 0 auto;
  }

  .subsection-sidebar {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100%;
  }

  .subsection-title {
    margin-bottom: 0;
    text-align: left;
  }

  .subsection-image {
    margin-top: auto;
  }
}

.subsection-image {
  width: 100%;
  height: auto;
  display: block;
}

.subsection-cover {
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  min-height: 50vh;
  display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: calc(-1 * var(--pad-2))
}

.subsection-cover--header-padding {
  padding-top: calc(var(--header-height) / 2);
}

.intro :deep(.sanity-blocks),
.faq-answer,
.contact-value {
  font-weight: 400;
}

.faq-item {
  border: 1px solid currentColor;
}

.faq-item > * {
  padding: 30px;
}

.faq-item + .faq-item {
  margin-top: var(--pad-2);
}

.faq-question {
  position: relative;
  border-bottom: 1px solid currentColor;
  margin-bottom: 0;
  padding-bottom: 38px;
}

.faq-chevron {
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translate(-50%, -1px);
  pointer-events: none;
  line-height: 0;
}

.faq-chevron-clip {
  width: 18px;
  height: 14px;
  overflow: hidden;
  position: relative;
  display: flex;
  margin-top: -1px;
}

.faq-chevron-box {
  position: absolute;
  left: 50%;
  top: -9px;
  width: 18px;
  height: 18px;
  margin-left: -9px;
  border: 1px solid currentColor;
  background: var(--color-bg);
  transform: rotate(45deg);
  box-sizing: border-box;
}

.faq-question-text {
  display: block;
}

.step-list {
  --marker-size: 8px;
  --step-gap: var(--pad-2);
  list-style: none;
  margin: 0;
  padding: 0;
}

.step-item {
  position: relative;
  padding-left: var(--content-indent);
}

.step-item + .step-item {
  margin-top: var(--step-gap);
}

.step-item:not(:last-child)::before {
  content: '';
  position: absolute;
  left: 0;
  top: calc(0.5em + var(--marker-size));
  height: calc(100% + var(--step-gap) - 0.5em);
  width: 1px;
  background: currentColor;
  transform: translateX(-50%);
  opacity: 0.2;
}

.step-square {
  position: absolute;
  left: 0;
  top: 0.5em;
  transform: translateX(-50%);
  width: var(--marker-size);
  height: var(--marker-size);
  background: currentColor;
  z-index: 1;
}

.step-body {
  display: flex;
  flex-direction: column;
  gap: 0.25em;
}

.step-title {
  margin: 0;
}

.step-content {
  font-weight: 400;
}

.bullet-list {
  list-style: disc;
  padding-left: 1.25em;
  margin-top: var(--pad-2);
}

.bullet-list li + li {
  margin-top: 0.5em;
}

.contact-items {
  display: flex;
  flex-direction: column;
  gap: var(--pad-2);
}

.contact-item {
  position: relative;
  padding-left: var(--content-indent);
}

.contact-icon {
  position: absolute;
  left: 0;
  top: 0.1em;
  transform: translateX(-50%);
  width: 1.35em;
  height: 1.35em;
  display: flex;
  align-items: center;
  justify-content: center;
}

.contact-icon svg {
  width: 100%;
  height: 100%;
  display: block;
}

.contact-body {
  display: flex;
  flex-direction: column;
  gap: 0.25em;
}

.subsection-content.rte {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--pad-2);
  line-height: 1.6;
}

.contact-label {
  margin-bottom: 0.25em;
}

@media (min-width: 700px) {
  .wrapper {
    padding-left: var(--pad-4);
    padding-right: var(--pad-4);
  }
}

@media all and (max-width: 767px) {
  .contact-item[data-v-79f26b38] {
    position: relative;
    padding-left: 60px;
  }
  .contact-icon[data-v-79f26b38] {
    position: absolute;
    left: 10px;
  }
}
</style>
