export default {
  name: 'playlist',
  title: 'Playlist',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'entries',
      title: 'Playlist Entries',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'song',
              title: 'Song Title',
              type: 'string',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'artist',
              title: 'Artist',
              type: 'string',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'person',
              title: 'Person',
              type: 'string',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3
            }
          ]
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title'
    }
  }
} 