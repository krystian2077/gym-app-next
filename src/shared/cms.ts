import { SelectedPage } from './types'

export type MediaValue =
  | string
  | {
      alt?: null | string
      filename?: null | string
      url?: null | string
    }
  | null
  | undefined

export type SiteClass = {
  description?: unknown
  excerpt?: null | string
  image?: MediaValue
  name: string
}

export type SiteContent = {
  benefits?: {
    cards?: {
      description?: null | string
      icon?: 'academic' | 'building' | 'group' | null
      title: string
    }[]
    cardCtaLabel?: null | string
    ctaLabel?: null | string
    featureHeadingAfter?: null | string
    featureHeadingBefore?: null | string
    featureHeadingHighlight?: null | string
    featureImage?: MediaValue
    featureParagraphs?: {
      text: string
    }[]
    heading?: null | string
    intro?: null | string
  }
  classesSection?: {
    heading?: null | string
    intro?: null | string
  }
  contact?: {
    emailPlaceholder?: null | string
    formAction?: null | string
    headingAfter?: null | string
    headingBefore?: null | string
    headingHighlight?: null | string
    image?: MediaValue
    invalidEmailMessage?: null | string
    intro?: null | string
    messageMaxLengthMessage?: null | string
    messagePlaceholder?: null | string
    nameMaxLengthMessage?: null | string
    namePlaceholder?: null | string
    requiredMessage?: null | string
    submitLabel?: null | string
  }
  footer?: {
    contactHeading?: null | string
    contactText?: null | string
    copyright?: null | string
    description?: null | string
    links?: {
      label: string
    }[]
    linksHeading?: null | string
    logo?: MediaValue
    phone?: null | string
  }
  home?: {
    body?: null | string
    headlineImage?: MediaValue
    heroImage?: MediaValue
    primaryCtaLabel?: null | string
    secondaryCtaLabel?: null | string
    sponsors?: {
      logo?: MediaValue
      name: string
    }[]
  }
  navbar?: {
    ctaLabel?: null | string
    links?: {
      label: string
      page: SelectedPage
    }[]
    logo?: MediaValue
    signInLabel?: null | string
  }
}

export const defaultSiteContent: SiteContent = {
  navbar: {
    ctaLabel: 'Become a Member',
    links: [
      { label: 'Home', page: SelectedPage.Home },
      { label: 'Benefits', page: SelectedPage.Benefits },
      { label: 'Our Classes', page: SelectedPage.OurClasses },
      { label: 'Contact Us', page: SelectedPage.ContactUs },
    ],
    logo: '/assets/Logo.png',
    signInLabel: 'Sign In',
  },
  home: {
    body:
      'Unrivaled Gym. Unparalleled Training Fitness Classes. World Class Studios to get the Body Shapes That you Dream of.. Get Your Dream Body Now.',
    headlineImage: '/assets/HomePageText.png',
    heroImage: '/assets/HomePageGraphic.png',
    primaryCtaLabel: 'Join Now',
    secondaryCtaLabel: 'Learn More',
    sponsors: [
      { logo: '/assets/SponsorRedBull.png', name: 'Red Bull' },
      { logo: '/assets/SponsorForbes.png', name: 'Forbes' },
      { logo: '/assets/SponsorFortune.png', name: 'Fortune' },
    ],
  },
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
    featureImage: '/assets/BenefitsPageGraphic.png',
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
    emailPlaceholder: 'EMAIL',
    formAction: 'https://formsubmit.co/69d1759bf43ed044a3b955b8ebe1723d',
    headingAfter: 'TO GET IN SHAPE',
    headingBefore: '',
    headingHighlight: 'JOIN NOW',
    image: '/assets/ContactUsPageGraphic.png',
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
    logo: '/assets/Logo.png',
    phone: '(333)425-6825',
  },
}

export const defaultClasses: SiteClass[] = [
  {
    excerpt:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    image: '/assets/image1.png',
    name: 'Weight Training Classes',
  },
  {
    image: '/assets/image2.png',
    name: 'Yoga Classes',
  },
  {
    excerpt:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    image: '/assets/image3.png',
    name: 'Ab Core Classes',
  },
  {
    excerpt:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    image: '/assets/image4.png',
    name: 'Adventure Classes',
  },
  {
    image: '/assets/image5.png',
    name: 'Fitness Classes',
  },
  {
    excerpt:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    image: '/assets/image6.png',
    name: 'Training Classes',
  },
]

export const getMediaUrl = (media: MediaValue, fallback: string) => {
  if (!media) {
    return fallback
  }

  if (typeof media === 'string') {
    return media
  }

  return media.url || (media.filename ? `/api/media/file/${media.filename}` : fallback)
}

export const getPlainText = (value: unknown, fallback = ''): string => {
  if (!value || typeof value !== 'object') {
    return fallback
  }

  const root = 'root' in value ? value.root : undefined
  if (!root || typeof root !== 'object' || !('children' in root) || !Array.isArray(root.children)) {
    return fallback
  }

  return root.children
    .map((child) => {
      if (child && typeof child === 'object' && 'children' in child && Array.isArray(child.children)) {
        return child.children
          .map((nested: unknown) =>
            nested && typeof nested === 'object' && 'text' in nested ? String(nested.text) : '',
          )
          .join('')
      }

      return child && typeof child === 'object' && 'text' in child ? String(child.text) : ''
    })
    .filter(Boolean)
    .join('\n')
}
