# Open decisions and assumptions

Items Open Energy must confirm. Until then the site hides or labels the affected content and does not invent it.

| # | Decision | Current behaviour | Where to change |
|---|---|---|---|
| 1 | Service area (cities / countries) | "Jordan" — inferred from +962 numbers; confirm cities | `company.serviceArea` in `content/site.ts` |
| 2 | Address / office location | Not shown (phones, WhatsApp and email are live) | `company.contactChannels` |
| 3 | Verified metrics (systems installed, MW, years) | Trust band shows scope statements, not numbers | `company.metrics` (include a source) |
| 4 | Certifications, warranties, partner logos (with permission) | Section hidden | `company.certifications`, `company.partners` |
| 5 | Madama renders/photos and more real projects | Madama shown with real specs (V21 report) and an illustration labelled "photos coming soon" | `content/projects.ts`, `public/projects/<slug>/` |
| 5b | Hero photo | Illustration until a real photo is supplied | `heroImage` in `content/site.ts`, `public/images/` |
| 5c | Madama location wording and status | "Yajouz 2 – Rusaifa, Jordan", "Design complete" (from report) | `content/projects.ts` |
| 6 | Is maintenance / after-sales a formal service? | Defined but disabled | `enabled` in `content/services.ts` |
| 7 | Which system types are offered (on-grid, hybrid, off-grid, pumping) | All four shown as generic categories | `systemTypes` |
| 8 | Technical capabilities list | Standard PV engineering scope, to be verified | `capabilities` |
| 9 | Inquiry destination: file, Supabase, email, or a combination | `file` store by default; Supabase supported; no email | `INQUIRY_STORE`, `lib/inquiry-store.ts` |
| 10 | Staff notification of new inquiries (email / WhatsApp) | None. Needs a provider and credentials (not invented) | add to `saveInquiry` |
| 11 | English only vs. bilingual launch | English, Arabic-ready structure | `content/`, `locale` |
| 12 | Privacy policy / data retention period for inquiries | Not defined; consent checkbox only | legal review |
| 13 | Production domain | `SITE_URL` env var | `.env` |
| 14 | Logo | Placeholder mark (sun over panel) | `components/logo.tsx`, `app/icon.svg` |

## Reconciled conflicts

- **Dark hero (PRD §10 proposal) vs. Theme: Light (project configuration).** The manual configuration
  takes precedence: the pages are light, and deep navy appears only in the hero illustration, the trust
  band, the CTA band and the footer.
- **"Typography: Arabic font" vs. English UI.** IBM Plex Sans Arabic (Latin + Arabic) is the body font;
  Space Grotesk is used for Latin headings.
- **No pricing, savings or sizing formulas** appear anywhere (PRD §07). The FAQ explains that sizing is
  decided at survey/design.
- **"Free" quote / consultation** wording was avoided because it was not confirmed.

## Edit-conflict policy (FR-06)

Inquiries are append-only. Each submission creates a new record with a unique id and reference;
records are never edited through the site, so no concurrent edits can conflict.
