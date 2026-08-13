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
  hideFooter?: boolean
  hideHeaderLogo?: boolean
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

async function resolvePageSlug(identifier: string): Promise<string | null> {
  const exactMatch = await client.fetch<string | null>(
    `*[_type == "page" && slug.current == $identifier][0].slug.current`,
    { identifier }
  )
  if (exactMatch) return exactMatch

  const pages = await client.fetch<Array<{ slug?: { current?: string } }>>(
    `*[_type == "page"] { slug }`
  )
  const normalizedIdentifier = slugify(identifier)
  const matchedPage = pages.find(
    (page) => slugify(page.slug?.current || '') === normalizedIdentifier
  )

  return matchedPage?.slug?.current || null
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  
  try {
    if (query.type === 'siteSettings') {
      try {
        const result = await client.fetch(`
          *[_type == "siteSettings"][0] {
            ...,
            footerMenu-> {
              _id,
              title,
              items[] {
                ...,
                to {
                  ...,
                  page-> {
                    _id,
                    slug,
                    title
                  }
                }
              }
            },
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
        // First, let's try to find the page with the exact slug
        const queryString = `*[_type == "page" && slug.current == $identifier][0] {
          _id,
          title,
          slug,
          darkMode,
          headerPadding,
          hideFooter,
          hideHeaderLogo,
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
              content,
              pdf {
                asset-> {
                  _id,
                  url,
                  metadata { dimensions }
                }
              }
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
              padding,
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
            },
            subsectionsContent {
              subsections[] {
                _key,
                "title": coalesce(title, subtitle),
                layout,
                coverHeaderPadding,
                image {
                  asset-> {
                    _id,
                    url,
                    metadata {
                      dimensions
                    }
                  },
                  alt
                },
                intro,
                items[] {
                  _key,
                  itemType,
                  title,
                  content
                }
              }
            },
          }
        }`
        
        const resolvedSlug = await resolvePageSlug(String(query.identifier))
        if (!resolvedSlug) {
          throw createError({
            statusCode: 404,
            message: `Page not found: ${query.identifier}`
          })
        }

        result = await client.fetch<Page>(queryString, { identifier: resolvedSlug })
      } else {
        const routeQuery = '*[_type == "page" && routeName == $identifier][0]'
        result = await client.fetch<Page>(routeQuery, { identifier: query.identifier })
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
    
    if (query.type === 'downloads') {
      const result = await client.fetch(`*[_type == "downloads"] | order(orderRank asc) {
        _id,
        title,
        filetype,
        dateAdded,
        orderRank,
        fileList,
        file {
          asset-> {
            _id,
            url,
            originalFilename
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