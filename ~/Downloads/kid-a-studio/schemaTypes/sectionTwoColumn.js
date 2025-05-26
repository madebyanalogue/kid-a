export default {
  name: 'sectionTwoColumn',
  title: 'Two Column Section',
  type: 'object',
  fields: [
    // Optional image field (main image)
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },
    },
    // Optional image field (roundal)
    {
      name: 'roundalImage',
      title: 'Roundal Image',
      type: 'image',
      options: { hotspot: true },
    },
    // Optional boolean 'include logo'
    {
      name: 'includeLogo',
      title: 'Include Logo',
      type: 'boolean',
      initialValue: false,
    },
    // Optional image field (logo)
    {
      name: 'logoImage',
      title: 'Logo Image',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ parent }) => !parent?.includeLogo,
    },
    // Text box field
    {
      name: 'text',
      title: 'Text Box',
      type: 'text',
      rows: 4,
    },
    // Optional boolean for grid-reverse
    {
      name: 'imageRight',
      title: 'Image right',
      type: 'boolean',
      initialValue: false,
      description: 'If true, image will be on the right (grid-reverse).',
    },
  ],
  preview: {
    select: {
      title: 'text',
      media: 'mainImage',
    },
    prepare({ title, media }) {
      return {
        title: title ? title.substring(0, 40) + '...' : 'Two Column Section',
        media,
      }
    }
  }
} 