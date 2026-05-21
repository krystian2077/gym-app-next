import { put, list } from '@vercel/blob'
import fs from 'node:fs'
import path from 'node:path'

const token = process.env.BLOB_READ_WRITE_TOKEN

console.log('Token present:', Boolean(token))
console.log('Token length:', token?.length)

try {
  const existing = await list({ token })
  console.log('\nFiles in Blob store:', existing.blobs.length)
  existing.blobs.slice(0, 5).forEach((b) => console.log(' -', b.pathname, '->', b.url))
} catch (err) {
  console.error('list() error:', err.message)
}

try {
  const file = fs.readFileSync(path.resolve('public/assets/Logo.png'))
  const result = await put('test-upload-logo.png', file, {
    access: 'public',
    token,
    addRandomSuffix: false,
    allowOverwrite: true,
  })
  console.log('\nUpload OK:', result.url)
} catch (err) {
  console.error('\nput() error:', err.message)
}

process.exit(0)
