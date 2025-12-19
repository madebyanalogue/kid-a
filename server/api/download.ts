import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '8n513ygd',
  dataset: 'production',
  apiVersion: '2024-03-19',
  useCdn: false // Use API for downloads to get proper headers
})

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const url = query.url as string
  const filename = query.filename as string || 'download'
  
  if (!url) {
    throw createError({
      statusCode: 400,
      message: 'URL parameter is required'
    })
  }
  
  try {
    // Fetch the file from the URL
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': '*/*'
      }
    })
    
    if (!response.ok) {
      throw createError({
        statusCode: response.status,
        message: `Failed to fetch file: ${response.statusText}`
      })
    }
    
    // Get the file content
    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    
    // Determine content type from response or filename
    const contentType = response.headers.get('content-type') || 'application/octet-stream'
    
    // Set headers to force download
    setHeader(event, 'Content-Type', contentType)
    setHeader(event, 'Content-Disposition', `attachment; filename="${encodeURIComponent(filename)}"`)
    setHeader(event, 'Content-Length', buffer.length.toString())
    setHeader(event, 'Cache-Control', 'no-cache')
    
    return buffer
  } catch (error: any) {
    console.error('Error downloading file:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: `Error downloading file: ${error.message}`
    })
  }
})

