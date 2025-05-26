import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: '8n513ygd',
  dataset: 'production',
  apiVersion: '2024-03-19',
  useCdn: true,
  perspective: 'published'
}) 