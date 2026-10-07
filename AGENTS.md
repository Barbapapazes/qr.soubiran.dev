Keep components accessible and consider SEO and privacy when changing metadata or analytics.

This is a client-side Nuxt app using Nuxt UI and the experimental Vite server builder. Feature code lives in local modules under `app/modules/`, with public registrations in `index.ts` and implementation details and tests in `runtime/`. Cloudflare serves static SPA assets; no custom Worker is required.

Never track QR content or query-string payloads. Keep the paired Nuxt preview pins and deployment patches aligned with code.soubiran.dev. Run production builds in CI, not on the low-capacity development host.
