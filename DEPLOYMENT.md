# Vercel Deployment

This project is a Next.js app with Payload CMS, MongoDB, and optional Vercel Blob storage for media uploads.

## Required Services

- Vercel project for the Next.js/Payload app.
- MongoDB Atlas database for Payload data.
- Vercel Blob store if testers should upload or replace images in `Media`.

## Environment Variables

Set these in Vercel Project Settings -> Environment Variables for Production, Preview, and Development:

```env
DATABASE_URI=mongodb+srv://USER:PASSWORD@CLUSTER.mongodb.net/gym-app?retryWrites=true&w=majority
PAYLOAD_SECRET=replace-with-a-long-random-secret
NEXT_PUBLIC_SERVER_URL=https://your-vercel-project.vercel.app
BLOB_READ_WRITE_TOKEN=created-by-vercel-blob
```

`BLOB_READ_WRITE_TOKEN` is optional locally, but recommended for Vercel. Without it, Payload falls back to local filesystem media storage, which is not persistent in serverless production.

## Vercel Settings

- Framework Preset: `Next.js`
- Install Command: leave default (`npm install`)
- Build Command: `npm run build`
- Output Directory: leave default
- Root Directory: repository root

## First Production Seed

After the Vercel project has env vars and Blob storage connected:

```bash
npm i -g vercel
vercel login
vercel link
vercel env pull .env.local
npm run seed
```

This seeds:

- `Site Content`
- `Classes`
- `Media`

The seed is idempotent, so it can be rerun after changing the seed data.

## Tester URLs

- Website: `https://your-vercel-project.vercel.app`
- CMS: `https://your-vercel-project.vercel.app/admin`

Create a separate Payload user for testers and remove it after testing.
