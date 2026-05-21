<div align="center">
  <img src="public/assets/Logo.png" alt="EvoGym logo" width="180" />

  <h1>EvoGym CMS</h1>

  <p>
    Nowoczesna strona fitness z profesjonalnym panelem CMS opartym o Payload,
    Next.js, MongoDB i Vercel Blob.
  </p>

  <p>
    <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
    <img alt="Payload CMS" src="https://img.shields.io/badge/Payload_CMS-3.84-111111?style=for-the-badge&logo=payloadcms&logoColor=white" />
    <img alt="React" src="https://img.shields.io/badge/React-19-149ECA?style=for-the-badge&logo=react&logoColor=white" />
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
    <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  </p>
</div>

---

## Project Overview

EvoGym CMS to landing page dla marki fitness, połączony z pełnym panelem administracyjnym. Projekt nie jest już statyczną stroną z tekstami wpisanymi w komponentach. Treści, zdjęcia, klasy, CTA, formularz i stopka są zarządzane z Payload CMS.

Administrator może edytować stronę bez dotykania kodu:

- zarządzać tekstami i obrazkami sekcji hero,
- edytować menu i etykiety CTA,
- dodawać, usuwać i sortować klasy treningowe,
- zarządzać kartami benefitów,
- zmieniać treści formularza kontaktowego,
- aktualizować stopkę,
- uploadować media do trwałego storage na Vercel Blob.

---

## Live URLs

| Area | URL |
| --- | --- |
| Website | `https://your-project.vercel.app` |
| CMS Admin | `https://your-project.vercel.app/admin` |

Replace the URLs above with the final Vercel deployment URL.

---

## Feature Highlights

### Website

- Responsive one-page fitness landing page.
- Smooth scrolling navigation.
- Animated sections powered by Framer Motion.
- CMS-driven hero, benefits, classes, contact and footer.
- Dynamic class cards loaded from Payload.
- Contact form integration through configurable form action.
- Media fallback system for safer rendering.

### CMS

- Payload CMS mounted inside the same Next.js application.
- `Site Content` global for full-page content management.
- `Classes` collection for class cards.
- `Media` collection for images and uploads.
- `Users` collection for admin and tester accounts.
- Vercel Blob support for persistent production media.
- Seed scripts for quickly restoring baseline content.

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16 App Router |
| UI | React 19, TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| CMS | Payload CMS 3 |
| Database | MongoDB Atlas |
| Media Storage | Vercel Blob |
| Forms | React Hook Form |
| Deployment | Vercel |

---

## CMS Content Model

### `Website -> Site Content`

Main global document for the entire landing page:

- Navigation
- Home / hero section
- Sponsors
- Benefits section
- Classes section intro
- Contact section
- Contact form labels and validation messages
- Footer

### `Website -> Classes`

Editable class cards used in the horizontal class scroller:

- class name,
- rich description,
- card excerpt,
- image,
- sort order.

### `Website -> Media`

Image and file library:

- logo,
- hero graphics,
- sponsor logos,
- class images,
- contact image,
- future uploads from testers/admins.

### `Administration -> Users`

Payload user accounts for admins and testers.

---

## Project Structure

```txt
app/
  (app)/                 Public website routes
  (payload)/             Payload admin and API routes
src/
  scenes/                Website sections
  shared/                Shared UI helpers, CMS fallbacks and types
public/assets/           Bundled default images
scripts/
  seed-content.mjs       Seeds CMS content and media documents
  fix-media-urls.mjs     Repairs seeded media URLs using Vercel Blob
  check-media.mjs        Prints current media state
payload.config.ts        Payload collections, globals, storage and database
DEPLOYMENT.md            Detailed Vercel deployment notes
```

---

## Getting Started

### Requirements

- Node.js `>=20.9.0`
- npm
- MongoDB Atlas connection string
- optional Vercel Blob token for production uploads

### Installation

```bash
npm install
```

Create `.env.local`:

```bash
cp .env.example .env.local
```

Set the required variables:

```env
DATABASE_URI=mongodb+srv://USER:PASSWORD@CLUSTER.mongodb.net/gym-app?retryWrites=true&w=majority
PAYLOAD_SECRET=replace-with-a-long-random-secret
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
BLOB_READ_WRITE_TOKEN=
```

Run the app:

```bash
npm run dev
```

Open:

- website: `http://localhost:3000`
- CMS: `http://localhost:3000/admin`

---

## Seeding Content

Seed baseline CMS content:

```bash
npm run seed
```

This creates or updates:

- `Site Content`,
- `Classes`,
- `Media`.

If production images are broken after deploy or after changing Vercel Blob, run:

```bash
npm run repair:media
```

Inspect media records:

```bash
npm run check:media
```

Test Vercel Blob connection:

```bash
npm run test:blob
```

---

## Available Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Starts local Next.js development server |
| `npm run build` | Builds the app for production |
| `npm run start` | Starts the production build |
| `npm run seed` | Seeds CMS content and media documents |
| `npm run repair:media` | Uploads bundled assets to Vercel Blob and repairs media URLs |
| `npm run check:media` | Prints media records and Blob env status |
| `npm run test:blob` | Tests Vercel Blob listing and upload |
| `npm run lint` | Runs the configured lint script |

---

## Deployment

The recommended deployment target is Vercel.

Required production services:

- Vercel project,
- MongoDB Atlas database,
- Vercel Blob store.

Required environment variables:

```env
DATABASE_URI=mongodb+srv://USER:PASSWORD@CLUSTER.mongodb.net/gym-app?retryWrites=true&w=majority
PAYLOAD_SECRET=replace-with-a-long-random-secret
NEXT_PUBLIC_SERVER_URL=https://your-project.vercel.app
BLOB_READ_WRITE_TOKEN=created-by-vercel-blob
```

After connecting the project and environment variables:

```bash
npm run build
```

After first deploy:

```bash
vercel env pull .env.local
npm run seed
npm run repair:media
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for the full deploy checklist.

---

## Tester Flow

For a tester or client reviewer:

1. Create a separate Payload user account.
2. Send the tester the website URL and `/admin` URL.
3. Ask them to test:
   - editing `Site Content`,
   - adding and deleting classes,
   - changing class images,
   - uploading media,
   - changing CTA labels,
   - editing contact form labels,
   - checking frontend changes after refresh.
4. Remove or disable the tester account after review.

---

## Production Notes

- Do not commit `.env.local`.
- Use a strong `PAYLOAD_SECRET`.
- Use Vercel Blob for persistent uploads.
- Run `repair:media` after changing storage or reseeding production.
- Keep tester accounts separate from owner/admin accounts.
- MongoDB Atlas Network Access must allow Vercel to connect.

---

## Quality Checks

Before shipping changes:

```bash
npx tsc --noEmit
npm run build
```

Both commands should pass before deploying.

---

## Author

Built by Krystian Potaczek.

Project goal: a polished, CMS-managed fitness landing page that can be safely tested, edited and deployed without touching frontend code.
