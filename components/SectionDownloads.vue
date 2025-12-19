<template>
  <section>
    <div class="wrapper">
      <div class="grid py3 pbottom">
        <div class="col-span-12">
          <table class="downloads-table">
            <thead>
              <tr>
                <th>File Name</th>
                <th class="file-format-header">File Format</th>
                <th class="date-added-header">Date Added</th>
                <th>Download</th>
                <th class="expand-column"></th>
              </tr>
            </thead>
            <tbody>
              <template v-for="download in downloads" :key="download._id">
                <tr 
                  v-if="download.fileList && download.fileList.length > 0"
                  @click="toggleAccordion(download._id)"
                  class="download-row"
                  :class="{ 'is-expanded': expandedRows.includes(download._id) }"
                >
                  <td>{{ download.title }}</td>
                  <td class="file-format-cell">{{ download.filetype }}</td>
                  <td class="date-added-cell">{{ formatDate(download.dateAdded) }}</td>
                  <td>
                    <button 
                      v-if="download.file?.asset?.url" 
                      @click.stop="downloadFile(download.file.asset.url, download.title, download.filetype)"
                      class="download-button"
                    >
                      GO
                    </button>
                    <span v-else class="no-file">No file</span>
                  </td>
                  <td class="expand-column">
                    <span class="expand-icon" :class="{ 'is-open': expandedRows.includes(download._id) }">
                      <span class="plus-line plus-horizontal"></span>
                      <span class="plus-line plus-vertical"></span>
                    </span>
                  </td>
                </tr>
                <tr v-else class="download-row">
                  <td>{{ download.title }}</td>
                  <td class="file-format-cell">{{ download.filetype }}</td>
                  <td class="date-added-cell">{{ formatDate(download.dateAdded) }}</td>
                  <td>
                    <button 
                      v-if="download.file?.asset?.url" 
                      @click="downloadFile(download.file.asset.url, download.title, download.filetype)"
                      class="download-button"
                    >
                      GO
                    </button>
                    <span v-else class="no-file">No file</span>
                  </td>
                  <td class="expand-column"></td>
                </tr>
                <tr v-if="expandedRows.includes(download._id) && download.fileList && download.fileList.length > 0" class="accordion-row">
                  <td :colspan="isMobile ? 3 : 5" class="accordion-content">
                    <Transition name="accordion">
                      <div v-if="expandedRows.includes(download._id)" class="file-list-content">
                        <SanityBlocks :blocks="cleanFileList(download.fileList)" />
                      </div>
                    </Transition>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue'

const props = defineProps({
  section: {
    type: Object,
    required: true,
    validator: (value) => {
      // More lenient validation - just check that it's an object
      if (!value || typeof value !== 'object') {
        console.warn('SectionDownloads: Invalid section prop', value)
        return false
      }
      // Log if sectionType doesn't match for debugging
      if (value.sectionType !== 'downloads') {
        console.warn('SectionDownloads: sectionType mismatch', {
          expected: 'downloads',
          actual: value.sectionType,
          _type: value._type
        })
      }
      return true
    }
  }
})

const downloads = ref([])
const expandedRows = ref([])
const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1024)

const isMobile = computed(() => windowWidth.value < 1024)

if (typeof window !== 'undefined') {
  const handleResize = () => {
    windowWidth.value = window.innerWidth
  }
  window.addEventListener('resize', handleResize)
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })
}

function cleanFileList(blocks) {
  if (!Array.isArray(blocks)) return blocks
  return blocks.filter(block => {
    if (block._type !== 'block' || !Array.isArray(block.children)) return true
    const text = block.children
      .map(child => (child && child.text) ? child.text : '')
      .join('')
      .replace(/\u00A0/g, ' ')
      .trim()
    return text.length > 0
  })
}

onMounted(async () => {
  const res = await $fetch('/api/sanity', { params: { type: 'downloads' } })
  downloads.value = res || []
  // Debug: log fileList data
  console.log('Downloads loaded:', downloads.value.map(d => ({
    title: d.title,
    hasFileList: !!d.fileList,
    fileListLength: d.fileList?.length || 0,
    fileList: d.fileList
  })))
})

function toggleAccordion(downloadId) {
  const index = expandedRows.value.indexOf(downloadId)
  if (index > -1) {
    // Close this accordion
    expandedRows.value.splice(index, 1)
  } else {
    // Close all other accordions and open this one (only one open at a time)
    expandedRows.value = [downloadId]
  }
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = String(date.getFullYear()).slice(-2)
  return `${day}.${month}.${year}`
}

async function downloadFile(url, filename, filetype) {
  if (!url) return
  
  // Determine file extension from filetype or URL
  const getFileExtension = () => {
    if (filetype) {
      // Remove any whitespace and convert to lowercase
      return filetype.trim().toLowerCase().replace(/^\./, '')
    }
    // Fallback to extracting from URL
    const match = url.match(/\.([a-zA-Z0-9]+)(?:\?|$)/)
    return match ? match[1] : 'pdf'
  }
  
  const extension = getFileExtension()
  const downloadFilename = filename && filename.includes('.') 
    ? filename 
    : `${filename || 'download'}.${extension}`
  
  try {
    // Use server-side proxy to force download with proper headers
    const downloadUrl = `/api/download?url=${encodeURIComponent(url)}&filename=${encodeURIComponent(downloadFilename)}`
    
    // Create a temporary anchor element to trigger download
    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = downloadFilename
    link.style.display = 'none'
    link.setAttribute('download', downloadFilename)
    
    // Append to body and click
    document.body.appendChild(link)
    
    // Force download by clicking
    link.click()
    
    // Clean up after a delay
    setTimeout(() => {
      if (document.body.contains(link)) {
        document.body.removeChild(link)
      }
    }, 200)
  } catch (error) {
    console.error('Error downloading file:', error)
    
    // Fallback: Try direct blob download
    try {
      const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache'
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch file')
      }
      
      const blob = await response.blob()
      const blobUrl = window.URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.href = blobUrl
      link.download = downloadFilename
      link.style.display = 'none'
      document.body.appendChild(link)
      link.click()
      
      setTimeout(() => {
        if (document.body.contains(link)) {
          document.body.removeChild(link)
        }
        window.URL.revokeObjectURL(blobUrl)
      }, 200)
    } catch (fallbackError) {
      console.error('Fallback download also failed:', fallbackError)
    }
  }
}
</script>

<style scoped>
.downloads-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: var(--pad-2);
}

.downloads-table thead {
  border-bottom: 1px solid currentColor;
}

.downloads-table th {
  text-align: left;
  padding: var(--pad-1) 0px;
  font-weight: 500;
  text-transform: uppercase;
  font-size: var(--h6);
  letter-spacing: 0.05em;
}

.downloads-table td {
  padding: var(--pad-1) 0px;
  border-bottom: 0.01em solid currentColor;
  vertical-align: middle;
}
.downloads-table td:first-child {
  padding-left: var(--pad-1);
}
.download-row {
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.download-row:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.download-button {
  background: transparent;
  border: 1px solid currentColor;
  cursor: pointer;
  text-transform: uppercase;
  font-size: 0.875rem;
  letter-spacing: 0.05em;
  transition: all 0.2s ease;
  font-size: var(--h5);
  padding:calc(var(--pad-1) * .5) calc(var(--pad-1) * 1.25);
}

.download-button:hover {
  background: black;
  color:white;
}

.no-file {
  color: rgba(0, 0, 0, 0.4);
  font-style: italic;
}

.expand-column {
  width: auto;
  text-align: right;
  vertical-align: middle;
  padding-right: var(--pad-1) !important;
}

.expand-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: var(--pad-1);
  height: var(--pad-1);
  transition: transform 0.3s ease;
  vertical-align: middle;
}

.expand-icon.is-open {
  transform: rotate(45deg);
}

.plus-line {
  position: absolute;
  background-color: currentColor;
  transition: transform 0.3s ease;
}

.plus-horizontal {
  top: 50%;
  left: 0;
  width: 100%;
  height: 1px;
  transform: translateY(-50%);
}

.plus-vertical {
  top: 0;
  left: 50%;
  width: 1px;
  height: 100%;
  transform: translateX(-50%);
}

.accordion-row {
  display: table-row;
}

.accordion-content {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: table-cell;
  padding: 0px 0px !important;
}

.sanity-blocks > * {
  padding:calc(var(--pad-1) * .5) 0px;
  padding-left: var(--pad-1);
  margin-bottom: 0px !important;
  font-size: var(--h5);
}

.sanity-blocks > *:not(:last-child) {
  border-bottom: 1px dashed currentColor;
}

/* Hide rogue empty paragraphs coming from Sanity in this context */
.sanity-blocks > p:empty {
  display: none;
  padding: 0;
  margin: 0;
  border: 0;
}

.download-row.is-expanded, .accordion-content {
  background-color: rgba(0, 0, 0, 0.05);
}

/* Accordion transition animations */
.accordion-enter-active,
.accordion-leave-active {
  transition: max-height 0.35s ease, opacity 0.35s ease, transform 0.35s ease;
  overflow: hidden;
}

.accordion-enter-from {
  opacity: 0;
  max-height: 0;
  transform: translateY(-6px);
}

.accordion-enter-to {
  opacity: 1;
  max-height: 2000px;
  transform: translateY(0);
}

.accordion-leave-from {
  opacity: 1;
  max-height: 2000px;
  transform: translateY(0);
}

.accordion-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-6px);
}

.file-list-content {
  color: currentColor;
}

.file-list-content ::deep(p) {
  margin: 0;
  padding: var(--pad-1) 0px;
  display: block;
}

.file-list-content ::deep(p:not(:last-child)) {
  border-bottom: 0.01em dashed currentColor;
}

/* Mobile styles - hide file format and date added columns below 1024px */
@media (max-width: 1023px) {
  .file-format-cell,
  .date-added-cell,
  .file-format-header,
  .date-added-header {
    display: none;
  }
  .downloads-table td, .download-button {
    font-size: var(--h5);
  }
}
</style>

