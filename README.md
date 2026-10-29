# Open Energy — company website

Marketing and lead-generation site for **Open Energy**, a solar PV company (supply · design · installation).
Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4 and shadcn-style UI primitives.

## Pages

| Route | Purpose |
|---|---|
| `/` | Hero + CTA, trust band, services, residential/commercial solutions, process timeline, projects teaser, FAQ, CTA band |
| `/services` | Supply / design / installation details, system types, comparison table, technical capabilities |
| `/projects` | Project cards with segment filter chips |
| `/about` | Story, mission, values, certifications/partners (shown only when data exists), process |
| `/contact` | Quote request form with validation, loading, failure and success (reference number) states |
| `POST /api/inquiries` | Server-side validation, rate limiting, honeypot, durable storage |

## Run locally

Requires **Node.js 20.9+**.

```bash
cp .env.example .env.local   # adjust if needed
npm install
npm run dev                   # http://localhost:3000
```

Production:

```bash
npm run build
npm start
```

This is a server app. Opening a built `index.html` directly will not work, and a static export would
remove the inquiry endpoint.

## Where quote requests go

Set `INQUIRY_STORE` in the environment:

- `file` (default): each request is appended as a JSON line to `data/inquiries.jsonl` on the server
  (`INQUIRY_DATA_DIR` overrides the folder). Needs a persistent disk (VPS, Docker with a volume).
  **Do not use on serverless hosts** (e.g. Vercel), where the filesystem is temporary.
- `supabase`: inserts into the `inquiries` table. Run `supabase/inquiries.sql` once, then set
  `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` (server-only; never prefix with `NEXT_PUBLIC_`).
  RLS is enabled with no public policies, so browsers cannot read the table.

The form shows success only after the store confirms the write (HTTP 201 + reference such as `OE-7K3QX9`).
If storage is missing or fails, the API returns 503 and the form keeps what the visitor typed.

There is no email notification yet; staff read inquiries from the file or the Supabase table.
See `OPEN_DECISIONS.md`.

## Deploy on Railway

The repo includes `railway.json` (build: `npm run build`, start: `npm start`, health check on `/`)
and `.nvmrc` (Node 22). `next start` listens on Railway's `PORT` automatically.

1. Railway → **New Project → Deploy from GitHub repo** → select this repo.
2. **Add a Volume** to the service, mount path `/data` (keeps quote requests across redeploys).
3. Service **Variables**:
   - `INQUIRY_STORE=file`
   - `INQUIRY_DATA_DIR=/data`
   - `SITE_URL=https://<your-domain>` (set after step 4)
4. **Settings → Networking → Generate Domain** (or add your own domain), then update `SITE_URL` and redeploy.

Read stored requests from the service shell: `cat /data/inquiries.jsonl`.
To use Supabase instead, set `INQUIRY_STORE=supabase`, `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` (no volume needed).

## Editing content

All copy and company facts live in `content/`:

- `content/site.ts`: company profile, metrics, certifications, partners, contact channels, process, FAQ
- `content/services.ts`: services (the `enabled` flag), solutions, system types, capabilities
- `content/projects.ts`: real projects (currently Madama). Each has a detail page at `/projects/<slug>`

Empty fields (`metrics`, `certifications`, `partners`, `contactChannels`, `serviceArea`) hide their
blocks. Nothing is invented. Add verified data and the blocks appear.

Real project renders/photos: put them in `public/projects/<slug>/` and list them in the project's `images`
(`kind: "render"` or `"photo"`, with descriptive `alt`). The first image is the cover; up to five show in the
listing-style gallery. Cards switch from the illustration automatically. A hero photo goes in `public/images/`
and is set via `heroImage` in `content/site.ts`.

## Arabic readiness

`<html lang dir>` comes from `content/site.ts`. Layout uses logical properties (`ms-*`, `ps-*`,
`start-*`, `border-s`), directional icons flip under `rtl`, and the body font (IBM Plex Sans Arabic)
covers Arabic. To add Arabic, add a parallel content set and an `[locale]` route segment.

## Checks

```bash
npm run typecheck
npm run build && npm start &
BASE_URL=http://localhost:3000 npm run test:e2e   # needs Playwright (npm i -D playwright && npx playwright install chromium)
```

`scripts/e2e.mjs` covers: a unique title, one h1 and a meta description on every page; alt text;
no horizontal scroll at 360/768/1440px; the sticky header CTA; header and footer navigation;
inline validation with input preservation; keyboard focus; service and network failure states;
a real stored submission with a reference; and server-side 422 validation.

The in-memory rate limit is 5 submissions per IP per 10 minutes. Repeated local test runs may hit it,
so restart the server to reset it.

## Source ZIP vs build

- **Source ZIP**: this folder without `node_modules/`, `.next/` and `data/`.
- **Build**: run `npm ci && npm run build` on the target server, then `npm start`. Deploy with
  `node_modules`, `.next`, `public`, `package.json` and `next.config.ts`.
