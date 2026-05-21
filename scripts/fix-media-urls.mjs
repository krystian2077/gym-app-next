import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { list, put } from '@vercel/blob'
import { getPayload } from 'payload'
import config from '../payload.config.ts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')

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

const run = async () => {
  const token = process.env.BLOB_READ_WRITE_TOKEN
  if (!token) {
    throw new Error('BLOB_READ_WRITE_TOKEN is missing. Pull Vercel env vars first or add it to .env.local.')
  }

  const payload = await getPayload({ config })

  console.log('Uploading bundled assets to Vercel Blob...')
  const uploadedByFilename = new Map()

  for (const [filename, alt] of mediaAssets) {
    const filepath = path.join(rootDir, 'public', 'assets', filename)
    const buffer = fs.readFileSync(filepath)
    const result = await put(filename, buffer, {
      access: 'public',
      addRandomSuffix: false,
      allowOverwrite: true,
      token,
    })

    uploadedByFilename.set(filename, {
      alt,
      url: result.url,
    })
    console.log(`  UPLOAD ${filename} -> ${result.url}`)
  }

  const blobs = await list({ token })
  console.log(`Found ${blobs.blobs.length} blobs in Vercel Blob storage.`)

  const media = await payload.find({
    collection: 'media',
    depth: 0,
    limit: 1000,
    overrideAccess: true,
  })

  console.log(`Found ${media.docs.length} media docs. Fixing seeded asset URLs...`)

  for (const doc of media.docs) {
    const uploaded = uploadedByFilename.get(doc.filename)
    if (!uploaded) {
      console.log(`  SKIP ${doc.filename} (not a bundled seed asset)`)
      continue
    }
    await payload.update({
      id: doc.id,
      collection: 'media',
      data: {
        alt: doc.alt || uploaded.alt,
        url: uploaded.url,
      },
      overrideAccess: true,
    })
    console.log(`  OK   ${doc.filename} -> ${uploaded.url}`)
  }

  console.log('Done.')
  process.exit(0)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
