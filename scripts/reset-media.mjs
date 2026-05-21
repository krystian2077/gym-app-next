import { getPayload } from 'payload'
import config from '../payload.config.ts'

const run = async () => {
  const payload = await getPayload({ config })

  const media = await payload.find({
    collection: 'media',
    depth: 0,
    limit: 1000,
    overrideAccess: true,
  })

  console.log(`Found ${media.docs.length} media docs. Deleting...`)

  for (const doc of media.docs) {
    await payload.delete({
      id: doc.id,
      collection: 'media',
      overrideAccess: true,
    })
    console.log(`Deleted: ${doc.filename || doc.id}`)
  }

  console.log('Done.')
  process.exit(0)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
