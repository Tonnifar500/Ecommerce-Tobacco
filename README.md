# First Draw – Website V1

A prototype e-commerce site for **First Draw**, a (fictional) Danish cigar shop for first-time buyers.
Built with Next.js (App Router) + TypeScript, no database, ready to deploy on Vercel.

> Prototype content: all brands, products, reviews and people are fictional. Checkout, MitID and payment are demos.

## Pages
| Route | Page |
|---|---|
| `/` | Homepage |
| `/guide` | Beginner Guide + 3-question quiz |
| `/shop` | Cigar Finder (filters, sort, starter packs; supports `?occ=gift`, `?chip=beginner`, `?q=search`) |
| `/product/[slug]` | Product page (14 products) |
| `/cart` | Cart & demo checkout (mock MitID age check, mock payment) |
| `/confirmation` | Order confirmation + care guide |
| `/help` | FAQ with search + contact form (demo) |
| `/about` | About us |

## Develop
```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Structure
- `lib/products.ts` – all product, pack and review data (edit here to change the catalogue)
- `lib/cart.tsx` – cart (localStorage) and last-order handling
- `components/` – Header, Footer, TrustBar, ProductCard, Finder, Quiz, Checkout …
- `app/globals.css` – design system (colours, buttons, badges, strength meter)
- `components/FunnelTracker.tsx` – pushes `data-funnel="stage:action"` clicks to `window.dataLayer` for funnel KPIs
- `design/` – the original Claude Design prototype (reference only), `docs/` – the design prompt

## Deploy
Import the repo in Vercel (framework preset: Next.js). No environment variables needed.
