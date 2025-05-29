import { createClient } from '@sanity/client'

// Define our own error type since SanityError isn't exported
interface SanityError extends Error {
  details?: any
  statusCode?: number
}

const client = createClient({
  projectId: '8n513ygd',
  dataset: 'production',
  apiVersion: '2024-03-19',
  useCdn: true
})

interface Section {
  _type: string
  sectionType: string
  [key: string]: any
}

interface Page {
  _id: string
  title: string
  slug: {
    current: string
  }
  sections?: Section[]
  darkMode?: boolean
  headerPadding?: boolean
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  
  try {
    if (query.type === 'siteSettings') {
      try {
        const result = await client.fetch(`
          *[_type == "siteSettings"][0] {
            ...,
            footerLogos[] {
              ...,
              asset->
            },
            certificationLogo {
              ...,
              asset->
            },
            ftCreditLogo {
              ...,
              asset->
            },
            contactInfo[] {
              label,
              value
            }
          }
        `)
        if (!result) {
          return { footerLogos: [], contactInfo: [] }
        }
        return result
      } catch (fetchError: any) {
        console.error('Error fetching siteSettings:', {
          message: fetchError?.message,
          stack: fetchError?.stack,
          details: fetchError?.details,
          statusCode: fetchError?.statusCode
        })
        throw fetchError
      }
    }
    
    if (query.menuTitle) {
      const result = await client.fetch(
        '*[_type == "menu" && title == $menuTitle][0]{..., items[]{..., to{..., page-> { _id, slug, title }}}}',
        { menuTitle: query.menuTitle }
      )
      return result
    }
    
    if (query.type === 'page') {
      let result: Page | null
      
      if (query.identifierType === 'slug') {
        const queryString = `*[_type == "page" && slug.current == $identifier][0] {
          _id,
          title,
          slug,
          darkMode,
          headerPadding,
          hideFooter,
          sections[]-> {
            _id,
            _type,
            title,
            sectionType,
            heroContent {
              headline,
              subheadline,
              aspectRatio,
              heroElements[] {
                _key,
                elementType,
                htmlContent,
                image {
                  asset-> {
                    _id,
                    url,
                    metadata {
                      dimensions
                    }
                  }
                },
                alt,
                width,
                height,
                left,
                top,
                isDraggable,
                isRoundal,
                position {
                  x,
                  y
                },
                size,
                rotation,
                zIndex
              }
            },
            spotifyPlaylistContent {
              image {
                asset-> {
                  _id,
                  url,
                  metadata {
                    dimensions
                  }
                }
              },
              title,
              description,
              spotifyPlaylistUrl
            },
            basicContent {
              title,
              content
            },
            imageContent {
              image {
                asset-> {
                  _id,
                  url,
                  metadata {
                    dimensions
                  }
                }
              },
              constrainHeight,
              alignment,
              columns,
              grid
            },
            headlineContent {
              headline,
              centerText,
              centerBlock,
              button {
                text,
                url
              }
            },
            playlistContent {
              playlist-> {
                title,
                tracks[] {
                  _key,
                  title,
                  artist,
                  description,
                  image {
                    asset-> {
                      _id,
                      url
                    }
                  },
                  link
                }
              }
            },
            contactContent {
              content,
              items[] {
                _key,
                label,
                value
              },
              ftCreditLogo {
                asset-> {
                  _id,
                  url
                }
              },
              decorativeImage {
                asset-> {
                  _id,
                  url,
                  metadata {
                    dimensions
                  }
                },
                alt
              }
            },
            homeScrollContent {
              items[] {
                _key,
                title,
                image {
                  asset-> {
                    _id,
                    url,
                    metadata {
                      dimensions
                    }
                  }
                },
                link {
                  page-> {
                    slug {
                      current
                    }
                  },
                  url
                }
              }
            },
            twoColumnContent {
              mainImage {
                asset-> {
                  _id,
                  url,
                  metadata { dimensions }
                }
              },
              roundalImage {
                asset-> {
                  _id,
                  url,
                  metadata { dimensions }
                }
              },
              includeLogo,
              logoImage {
                asset-> {
                  _id,
                  url,
                  metadata { dimensions }
                }
              },
              text,
              imageRight
            },
            nestedContent {
              mainImage {
                asset-> {
                  _id,
                  url,
                  metadata { dimensions }
                }
              },
              iconImage {
                asset-> {
                  _id,
                  url,
                  metadata { dimensions }
                }
              },
              content,
              backgroundColor,
              textColor
            },
            bannerContent {
              image {
                asset-> {
                  _id,
                  url,
                  metadata { dimensions }
                }
              },
              content
            }
          }
        }`
        
        try {
          // Add detailed logging for the query parameters
          console.error('[Server API] Page query details:', {
            identifier: query.identifier,
            identifierType: query.identifierType,
            queryString,
            timestamp: new Date().toISOString()
          })

          result = await client.fetch<Page>(queryString, { identifier: query.identifier })
          
          // Log the result or lack thereof
          if (!result) {
            console.error('[Server API] No page found for slug:', query.identifier)
            throw createError({
              statusCode: 404,
              message: `Page not found: ${query.identifier}`
            })
          }

          // Log successful result structure
          console.error('[Server API] Page query successful:', {
            id: result._id,
            title: result.title,
            hasSections: !!result.sections,
            sectionsCount: result.sections?.length,
            sectionTypes: result.sections?.map(s => s.sectionType),
            playlistSections: result.sections
              ?.filter(s => s.sectionType === 'featuredPlaylist')
              .map(s => ({
                _id: s._id,
                hasPlaylistContent: !!s.playlistContent,
                playlistContent: s.playlistContent,
                tracksCount: s.playlistContent?.tracks?.length
              }))
          })

        } catch (error) {
          const fetchError = error as SanityError
          console.error('[Server API] Error fetching page:', {
            error: fetchError.message,
            stack: fetchError.stack,
            details: fetchError.details,
            statusCode: fetchError.statusCode,
            query: {
              identifier: query.identifier,
              type: query.type,
              identifierType: query.identifierType
            }
          })
          throw createError({
            statusCode: fetchError.statusCode || 500,
            message: `Error fetching page: ${fetchError.message}`
          })
        }
      } else {
        const queryString = '*[_type == "page" && routeName == $identifier][0]'
        try {
          result = await client.fetch<Page>(queryString, { identifier: query.identifier })
        } catch (error) {
          const fetchError = error as SanityError
          console.error('[Server API] Error fetching page by route name:', {
            error: fetchError.message,
            stack: fetchError.stack,
            details: fetchError.details,
            statusCode: fetchError.statusCode
          })
          throw fetchError
        }
      }

      if (!result) {
        throw createError({
          statusCode: 404,
          message: `Page not found: ${query.identifier}`
        })
      }
      return result
    }
    
    if (query.type === 'section') {
      const params: any = { sectionType: query.sectionType }
      if (query.title) {
        params.title = query.title
      }
      const result = await client.fetch(`
        *[_type == "section" && sectionType == $sectionType${query.title ? ' && title == $title' : ''}][0] {
          ...,
          heroContent {
            ...,
            heroElements[] {
              ...,
              image {
                ...,
                asset->
              }
            }
          },
          homeScrollContent {
            ...,
            items[] {
              ...,
              image {
                ...,
                asset->
              },
              link {
                ...,
                page-> {
                  _id,
                  title,
                  slug
                }
              }
            }
          }
        }
      `, params)
      return result
    }
    
    if (query.type === 'sectionHomeScroll') {
      const result = await client.fetch('*[_type == "sectionHomeScroll"][0]{..., items[]{..., link{..., page-> { _id, slug, title }}}}')
      return result
    }
    
    if (query.type === 'press') {
      const result = await client.fetch(`*[_type == "press"] | order(publishedAt desc) {
        _id,
        title,
        publishedAt,
        summary,
        featuredImage {
          asset-> {
            _id,
            url,
            metadata { dimensions }
          }
        },
        pdf {
          asset-> {
            _id,
            url,
            metadata { dimensions }
          }
        }
      }`)
      return result
    }
    
    throw new Error('Invalid query parameters')
  } catch (error: any) {
    console.error('[Server API] Critical error:', {
      message: error?.message || 'Unknown error',
      stack: error?.stack,
      details: error?.details,
      statusCode: error?.statusCode,
      query,
      path: event.node.req.url
    })
    throw createError({
      statusCode: error?.statusCode || 500,
      message: `Error fetching data from Sanity: ${error?.message || 'Unknown error'}`
    })
  }
}) 