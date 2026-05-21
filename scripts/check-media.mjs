import { getPayload } from 'payload'
import config from '../payload.config.ts'

const run = async () => {
  const payload = await getPayload({ config })

  const media = await payload.find({
    collection: 'media',
    depth: 0,
    limit: 5,
    overrideAccess: true,
  })

  console.log('--- Media docs ---')
  for (const doc of media.docs) {
    console.log(JSON.stringify({
      filename: doc.filename,
      url: doc.url,
      mimeType: doc.mimeType,
      filesize: doc.filesize,
    }, null, 2))
  }

  console.log('\n--- ENV check ---')
  console.log('BLOB_READ_WRITE_TOKEN set:', Boolean(process.env.BLOB_READ_WRITE_TOKEN))
  console.log('Token starts with:', process.env.BLOB_READ_WRITE_TOKEN?.slice(0, 20))

  process.exit(0)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
