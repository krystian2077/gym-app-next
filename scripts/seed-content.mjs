import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getPayload } from 'payload'
import config from '../payload.config.ts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')

const assetPath = (filename) => path.join(rootDir, 'public', 'assets', filename)

const richText = (text) => ({
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text,
            type: 'text',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'paragraph',
        version: 1,
      },
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    type: 'root',
    version: 1,
  },
})

const mediaAssets = [
  ['Logo.png', 'EvoGym logo'],
  ['HomePageText.png', 'EvoGym headline'],
  ['HomePageGraphic.png', 'Home page athlete'],
  ['SponsorRedBull.png', 'Red Bull sponsor logo'],
  ['SponsorForbes.png', 'Forbes sponsor logo'],
  ['SponsorFortune.png', 'Fortune sponsor logo'],
  ['BenefitsPageGraphic.png', 'Benefits section athlete'],
  ['ContactUsPageGraphic.png', 'Contact section athlete'],
  ['image1.png', 'Weight training class'],
  ['image2.png', 'Yoga class'],
  ['image3.png', 'Ab core class'],
  ['image4.png', 'Adventure class'],
  ['image5.png', 'Fitness class'],
  ['image6.png', 'Training class'],
]

const classDescription =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

const classes = [
  {
    image: 'image1.png',
    name: 'Weight Training Classes',
    sortOrder: 10,
    text: classDescription,
  },
  {
    image: 'image2.png',
    name: 'Yoga Classes',
    sortOrder: 20,
    text: 'some description',
  },
  {
    image: 'image3.png',
    name: 'Ab Core Classes',
    sortOrder: 30,
    text: classDescription,
  },
  {
    image: 'image4.png',
    name: 'Adventure Classes',
    sortOrder: 40,
    text: classDescription,
  },
  {
    image: 'image5.png',
    name: 'Fitness Classes',
    sortOrder: 50,
    text: 'some description',
  },
  {
    image: 'image6.png',
    name: 'Training Classes',
    sortOrder: 60,
    text: classDescription,
  },
]

const findOne = async (payload, collection, where) => {
  const result = await payload.find({
    collection,
    depth: 0,
    limit: 1,
    overrideAccess: true,
    where,
  })

  return result.docs[0]
}

const upsertMedia = async (payload, filename, alt) => {
  const existing = await findOne(payload, 'media', {
    filename: {
      equals: filename,
    },
  })

  if (existing) {
    return payload.update({
      id: existing.id,
      collection: 'media',
      data: { alt },
      filePath: assetPath(filename),
      overrideAccess: true,
      overwriteExistingFiles: true,
    })
  }

  return payload.create({
    collection: 'media',
    data: { alt },
    filePath: assetPath(filename),
    overrideAccess: true,
  })
}

const upsertClass = async (payload, mediaByFilename, item) => {
  const existing = await findOne(payload, 'classes', {
    name: {
      equals: item.name,
    },
  })

  const data = {
    description: richText(item.text),
    excerpt: item.text,
    image: mediaByFilename[item.image]?.id,
    name: item.name,
    sortOrder: item.sortOrder,
  }

  if (existing) {
    return payload.update({
      id: existing.id,
      collection: 'classes',
      data,
      overrideAccess: true,
    })
  }

  return payload.create({
    collection: 'classes',
    data,
    overrideAccess: true,
  })
}

const run = async () => {
  const payload = await getPayload({ config })
  const mediaByFilename = {}

  for (const [filename, alt] of mediaAssets) {
    mediaByFilename[filename] = await upsertMedia(payload, filename, alt)
  }

  for (const item of classes) {
    await upsertClass(payload, mediaByFilename, item)
  }

  await payload.updateGlobal({
    slug: 'site-content',
    data: {
      benefits: {
        cards: [
          {
            description:
              'Neque adipiscing amet amet enim. Feugiat dolor enim fermentum in a in lectus pellentesque. Ullamcorper et.',
            icon: 'building',
            title: 'State of the Facilities',
          },
          {
            description:
              'Eu ipsum id egestas risus tempus enim semper felis quis. Nec consectetur ac venenatis facilisi est. Eget ac turpis id.',
            icon: 'group',
            title: "100's of Diverse Classes",
          },
          {
            description:
              'Fusce vestibulum aliquam ut cras. Nisl lectus egestas sapien nisl. Lacus at mi sit pellentesque. Congue parturient.',
            icon: 'academic',
            title: 'Expert and Pro Trainers',
          },
        ],
        cardCtaLabel: 'Learn More',
        ctaLabel: 'Join Now',
        featureHeadingAfter: '',
        featureHeadingBefore: 'MILLIONS OF HAPPY MEMBERS GETTING',
        featureHeadingHighlight: 'FIT',
        featureImage: mediaByFilename['BenefitsPageGraphic.png']?.id,
        featureParagraphs: [
          {
            text: 'Nascetur aenean massa auctor tincidunt. Iaculis potenti amet egestas ultrices consectetur adipiscing ultricies enim. Pulvinar fames vitae vitae quis. Quis amet vulputate tincidunt at in nulla nec. Consequat sed facilisis dui sit egestas ultrices tellus. Ullamcorper arcu id pretium sapien proin integer nisl. Felis orci diam odio.',
          },
          {
            text: 'Fringilla a sed at suspendisse ut enim volutpat. Rhoncus vel est tellus quam porttitor. Mauris velit euismod elementum arcu neque facilisi. Amet semper tortor facilisis metus nibh. Rhoncus sit enim mattis odio in risus nunc.',
          },
        ],
        heading: 'MORE THAN JUST GYM.',
        intro:
          'We provide world class fitness equipment, trainers and classes to get you to your ultimate fitness goals with ease. We provide true care into each and every member.',
      },
      classesSection: {
        heading: 'OUR CLASSES',
        intro:
          'Fringilla a sed at suspendisse ut enim volutpat. Rhoncus vel est tellus quam porttitor. Mauris velit euismod elementum arcu neque facilisi. Amet semper tortor facilisis metus nibh. Rhoncus sit enim mattis odio in risus nunc.',
      },
      contact: {
        formAction: 'https://formsubmit.co/69d1759bf43ed044a3b955b8ebe1723d',
        headingAfter: 'TO GET IN SHAPE',
        headingBefore: '',
        headingHighlight: 'JOIN NOW',
        emailPlaceholder: 'EMAIL',
        image: mediaByFilename['ContactUsPageGraphic.png']?.id,
        invalidEmailMessage: 'Invalid email address.',
        intro:
          'Congue adipiscing risus commodo placerat. Tellus et in feugiat nisl sapien vel rhoncus. Placerat at in enim pellentesque. Nulla adipiscing leo egestas nisi elit risus sit. Nunc cursus sagittis.',
        messageMaxLengthMessage: 'Max length is 2000 char.',
        messagePlaceholder: 'MESSAGE',
        nameMaxLengthMessage: 'Max length is 100 char.',
        namePlaceholder: 'NAME',
        requiredMessage: 'This field is required.',
        submitLabel: 'SUBMIT',
      },
      footer: {
        contactHeading: 'Contact Us',
        contactText: 'Tempus metus mattis risus volutpat egestas.',
        copyright: '© Evogym All Rights Reserved.',
        description:
          'Lorem vitae ut augue auctor faucibus eget eget ut libero. Elementum purus et arcu massa dictum condimentum. Augue scelerisque iaculis orci ut habitant laoreet. Iaculis tristique.',
        links: [
          { label: 'Massa orci senectus' },
          { label: 'Et gravida id et etiam' },
          { label: 'Ullamcorper vivamus' },
        ],
        linksHeading: 'Links',
        logo: mediaByFilename['Logo.png']?.id,
        phone: '(333)425-6825',
      },
      home: {
        body:
          'Unrivaled Gym. Unparalleled Training Fitness Classes. World Class Studios to get the Body Shapes That you Dream of.. Get Your Dream Body Now.',
        headlineImage: mediaByFilename['HomePageText.png']?.id,
        heroImage: mediaByFilename['HomePageGraphic.png']?.id,
        primaryCtaLabel: 'Join Now',
        secondaryCtaLabel: 'Learn More',
        sponsors: [
          {
            logo: mediaByFilename['SponsorRedBull.png']?.id,
            name: 'Red Bull',
          },
          {
            logo: mediaByFilename['SponsorForbes.png']?.id,
            name: 'Forbes',
          },
          {
            logo: mediaByFilename['SponsorFortune.png']?.id,
            name: 'Fortune',
          },
        ],
      },
      navbar: {
        ctaLabel: 'Become a Member',
        links: [
          { label: 'Home', page: 'home' },
          { label: 'Benefits', page: 'benefits' },
          { label: 'Our Classes', page: 'ourclasses' },
          { label: 'Contact Us', page: 'contactus' },
        ],
        logo: mediaByFilename['Logo.png']?.id,
        signInLabel: 'Sign In',
      },
    },
    overrideAccess: true,
  })

  payload.logger.info('Seeded site content, classes, and media.')
  process.exit(0)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
