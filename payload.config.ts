import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

const pageOptions = [
  {
    label: 'Home',
    value: 'home',
  },
  {
    label: 'Benefits',
    value: 'benefits',
  },
  {
    label: 'Our Classes',
    value: 'ourclasses',
  },
  {
    label: 'Contact Us',
    value: 'contactus',
  },
]

export default buildConfig({
  admin: {
    user: 'users',
  },
  collections: [
    {
      slug: 'users',
      admin: {
        group: 'Administration',
        useAsTitle: 'email',
      },
      auth: true,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      slug: 'classes',
      labels: {
        plural: 'Classes',
        singular: 'Class',
      },
      admin: {
        defaultColumns: ['name', 'sortOrder', 'updatedAt'],
        description: 'Manage the class cards shown in the Our Classes section. Add, delete, reorder, and change images here.',
        group: 'Website',
        listSearchableFields: ['name', 'excerpt'],
        useAsTitle: 'name',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'richText',
          editor: lexicalEditor({}),
        },
        {
          name: 'excerpt',
          type: 'textarea',
          admin: {
            description: 'Short text used on the class card overlay.',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'sortOrder',
          type: 'number',
          defaultValue: 0,
          admin: {
            description: 'Lower numbers appear first on the website.',
          },
        },
      ],
    },
    {
      slug: 'media',
      admin: {
        defaultColumns: ['alt', 'filename', 'updatedAt'],
        description: 'Manage website images and uploaded files used by the landing page.',
        group: 'Website',
        useAsTitle: 'alt',
      },
      upload: {
        staticDir: 'media',
      },
      fields: [
        {
          name: 'alt',
          type: 'text',
        },
      ],
    },
  ],
  globals: [
    {
      slug: 'site-content',
      label: 'Site Content',
      admin: {
        description: 'Edit the full single-page website: navigation, hero, benefits, classes intro, contact section, and footer.',
        group: 'Website',
      },
      fields: [
        {
          type: 'tabs',
          tabs: [
            {
              label: 'Navigation',
              fields: [
                {
                  name: 'navbar',
                  type: 'group',
                  fields: [
                    {
                      name: 'logo',
                      type: 'upload',
                      relationTo: 'media',
                    },
                    {
                      name: 'links',
                      type: 'array',
                      fields: [
                        {
                          name: 'label',
                          type: 'text',
                          required: true,
                        },
                        {
                          name: 'page',
                          type: 'select',
                          options: pageOptions,
                          required: true,
                        },
                      ],
                    },
                    {
                      name: 'signInLabel',
                      type: 'text',
                    },
                    {
                      name: 'ctaLabel',
                      type: 'text',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Home',
              fields: [
                {
                  name: 'home',
                  type: 'group',
                  fields: [
                    {
                      name: 'headlineImage',
                      type: 'upload',
                      relationTo: 'media',
                    },
                    {
                      name: 'body',
                      type: 'textarea',
                    },
                    {
                      name: 'primaryCtaLabel',
                      type: 'text',
                    },
                    {
                      name: 'secondaryCtaLabel',
                      type: 'text',
                    },
                    {
                      name: 'heroImage',
                      type: 'upload',
                      relationTo: 'media',
                    },
                    {
                      name: 'sponsors',
                      type: 'array',
                      fields: [
                        {
                          name: 'name',
                          type: 'text',
                          required: true,
                        },
                        {
                          name: 'logo',
                          type: 'upload',
                          relationTo: 'media',
                          required: true,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              label: 'Benefits',
              fields: [
                {
                  name: 'benefits',
                  type: 'group',
                  fields: [
                    {
                      name: 'heading',
                      type: 'text',
                    },
                    {
                      name: 'intro',
                      type: 'textarea',
                    },
                    {
                      name: 'cards',
                      type: 'array',
                      admin: {
                        description: 'Add, remove, and reorder benefit cards displayed under the intro.',
                      },
                      fields: [
                        {
                          name: 'icon',
                          type: 'select',
                          options: [
                            {
                              label: 'Building',
                              value: 'building',
                            },
                            {
                              label: 'Group',
                              value: 'group',
                            },
                            {
                              label: 'Academic Cap',
                              value: 'academic',
                            },
                          ],
                        },
                        {
                          name: 'title',
                          type: 'text',
                          required: true,
                        },
                        {
                          name: 'description',
                          type: 'textarea',
                        },
                      ],
                    },
                    {
                      name: 'cardCtaLabel',
                      type: 'text',
                    },
                    {
                      name: 'featureImage',
                      type: 'upload',
                      relationTo: 'media',
                    },
                    {
                      name: 'featureHeadingBefore',
                      type: 'text',
                    },
                    {
                      name: 'featureHeadingHighlight',
                      type: 'text',
                    },
                    {
                      name: 'featureHeadingAfter',
                      type: 'text',
                    },
                    {
                      name: 'featureParagraphs',
                      type: 'array',
                      fields: [
                        {
                          name: 'text',
                          type: 'textarea',
                          required: true,
                        },
                      ],
                    },
                    {
                      name: 'ctaLabel',
                      type: 'text',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Classes Section',
              fields: [
                {
                  name: 'classesSection',
                  type: 'group',
                  fields: [
                    {
                      name: 'heading',
                      type: 'text',
                    },
                    {
                      name: 'intro',
                      type: 'textarea',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Contact',
              fields: [
                {
                  name: 'contact',
                  type: 'group',
                  fields: [
                    {
                      name: 'headingBefore',
                      type: 'text',
                    },
                    {
                      name: 'headingHighlight',
                      type: 'text',
                    },
                    {
                      name: 'headingAfter',
                      type: 'text',
                    },
                    {
                      name: 'intro',
                      type: 'textarea',
                    },
                    {
                      name: 'formAction',
                      type: 'text',
                      admin: {
                        description: 'Form submission URL. Leave the seeded FormSubmit URL or replace it with your own endpoint.',
                      },
                    },
                    {
                      name: 'namePlaceholder',
                      type: 'text',
                    },
                    {
                      name: 'emailPlaceholder',
                      type: 'text',
                    },
                    {
                      name: 'messagePlaceholder',
                      type: 'text',
                    },
                    {
                      name: 'submitLabel',
                      type: 'text',
                    },
                    {
                      name: 'requiredMessage',
                      type: 'text',
                    },
                    {
                      name: 'invalidEmailMessage',
                      type: 'text',
                    },
                    {
                      name: 'nameMaxLengthMessage',
                      type: 'text',
                    },
                    {
                      name: 'messageMaxLengthMessage',
                      type: 'text',
                    },
                    {
                      name: 'image',
                      type: 'upload',
                      relationTo: 'media',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Footer',
              fields: [
                {
                  name: 'footer',
                  type: 'group',
                  fields: [
                    {
                      name: 'logo',
                      type: 'upload',
                      relationTo: 'media',
                    },
                    {
                      name: 'description',
                      type: 'textarea',
                    },
                    {
                      name: 'copyright',
                      type: 'text',
                    },
                    {
                      name: 'linksHeading',
                      type: 'text',
                    },
                    {
                      name: 'links',
                      type: 'array',
                      fields: [
                        {
                          name: 'label',
                          type: 'text',
                          required: true,
                        },
                      ],
                    },
                    {
                      name: 'contactHeading',
                      type: 'text',
                    },
                    {
                      name: 'contactText',
                      type: 'textarea',
                    },
                    {
                      name: 'phone',
                      type: 'text',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || '',
})
