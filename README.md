# AdyDaddy: Marketing Agency Website

Next.js (App Router) + TypeScript + Tailwind v4. Built with the design system and SEO architecture specified for this project set up first, so every page/route is correct by construction.

## Getting started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Design system

- Single typeface: self-hosted Satoshi Variable (`public/fonts/`, wired up in `src/app/globals.css`).
- Type scale: one heading style (24px mobile / 30px `md:`, weight 700) and flat 14px body, both as CSS vars piped into Tailwind's `@theme inline`.
- Color tokens in `globals.css`: strict black/white base, `--color-background`, `--color-heading`, `--color-body`. No saturated brand color. A small pastel palette (`--color-pastel-blush/sky/mint/butter`) is reserved for section badges/chips on light surfaces (`src/lib/pastels.ts` rotates through them) and never used as body/heading text color. The header uses its own dark tokens (`--color-header-*`); it's the one deliberately dark surface on an otherwise light, neutral site.
- `<Button />` variants: `primary`/`outline` for light surfaces (solid black / black outline), `invert` (solid pastel-butter, black text) and `outline-invert`/`glass` (white text/borders) for dark surfaces, namely the hero video and dark CTA bands.
- Spacing: `.section-px` (`px-5` / `md:px-[100px]`) is the one horizontal padding convention, used via `<Container />`.
- Motion: a fixed animation set (fade/slide/marquee/float/blob-drift) applied through `<RevealOnScroll />`, no ad hoc per-component animation code.

## Hero video

The homepage hero (`src/app/page.tsx`) is a full-bleed background video with a dark scrim (the clip is black, so hero text renders white/`header-fg` instead of the sitewide black heading color, a deliberate exception for this one section). Files:

- `public/videos/hero.mp4`: the clip (autoplay, muted, loop, `preload="metadata"`).
- `public/videos/hero-poster.jpg`: poster frame, extracted from the video itself.

To swap the clip: replace `hero.mp4`, then regenerate the poster (`ffmpeg -y -ss 00:00:01 -i public/videos/hero.mp4 -frames:v 1 -q:v 3 public/videos/hero-poster.jpg`) or provide your own.

The header (`src/components/Header.tsx`) is transparent (white-tinted glass) over the hero on the homepage, and switches to the solid dark bar once you scroll past it or navigate to any other page.

## Client logos

`src/data/clients.ts` lists the client logos shown in the homepage marquee (`public/images/logos/`). Add new entries there as more logos come in.

## Contact form → Google Sheet

The contact form (`src/components/ContactForm.tsx`) POSTs to `/api/contact`
(`src/app/api/contact/route.ts`), which validates the payload and forwards it
to a Google Sheets Apps Script web hook.

To enable it:

1. Create a Google Sheet, then paste `scripts/google-sheet-webhook.gs` into
   Extensions → Apps Script and deploy as a Web app (Execute as: Me, access:
   Anyone).
2. Copy the Web app URL (ends in `/exec`).
3. Set it as the `GOOGLE_SHEET_WEBHOOK_URL` environment variable in AWS
   Amplify (Hosting → Environment variables), then redeploy.

Until that variable is set, the form returns a friendly "not fully set up"
message instead of silently dropping submissions.

## SEO architecture

- `src/lib/seo.ts`: `buildMetadata()`, plus JSON-LD builders: `buildOrganizationSchema`, `buildServiceSchema`, `buildServiceReviewSchema`, `buildFaqSchema`, `buildBreadcrumbSchema`.
- `src/app/sitemap.ts` / `src/app/robots.ts`: native Next.js conventions, sitemap entries are generated from `src/data/services.ts` and `src/data/portfolio.ts`.
- `src/data/*.ts`: every service and portfolio entry carries its own `seoTitle` / `seoDescription`, and every image its own `alt` text, from the data model itself.

## Before launch: replace placeholder content

Everything below is realistic scaffolding, not real business data. Grep for `TODO` and `placeholder` to find it all, starting with:

- **`src/lib/seo.ts`**: `SITE_URL` is set to `https://adydaddy.com`; `BUSINESS_INFO` holds the founder, phone, email, and Instagram. Address and the remaining social handles are still placeholders to fill in later.
- **`src/data/services.ts`** / **`src/data/portfolio.ts`**: sample services, case studies, client names, and testimonials. The shape (including `seoTitle`/`seoDescription`) is meant to stay as-is; just swap the content.
- **`public/images/`, `public/og-image.jpg`**: `og-image.jpg` is on-brand; service/portfolio imagery is still generated placeholder graphics (see `scripts/gen-placeholder-images.mjs`). Replace with real photography/creative.
- **`src/components/ContactForm.tsx`**: wired to `/api/contact` → Google Sheet (see "Contact form → Google Sheet" above); only the web hook URL needs setting.
- **`public/logo.svg`**: a placeholder monogram; swap for the real logo.
