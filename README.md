# qr.soubiran.dev

Generate and download QR codes for any URL at [qr.soubiran.dev](https://qr.soubiran.dev).

Enter a URL, then select **Capture** to download a PNG. The `?url=` query parameter preserves the QR content in shareable links.

## Architecture

Like `code.soubiran.dev`, this is a client-side Nuxt app with Nuxt UI, the experimental Vite server builder, and Cloudflare's Vite plugin.

- `app/modules/qr`: URL-backed content, QR rendering, and PNG capture.
- `app/modules/analytics`: Umami page tracking with query/hash payload sanitization. QR contents must never be tracked.
- `app/app.vue`: feature composition; global styles and metadata remain application-level.
- `cloudflare.config.ts`: the existing `qr-soubiran-dev` assets-only deployment and custom domain. No Worker entrypoint or SSR runtime is needed.

## Development

Use Node.js 24.15.0 (or a version allowed by `engines`) and the pinned pnpm version.

`pnpm install --frozen-lockfile`, then `pnpm dev`.

Validation: `pnpm lint`, `pnpm typecheck`, and `pnpm test`.

## Build and deployment

Run `pnpm build` in CI or on a capable machine, then `pnpm deploy` with Cloudflare credentials. Deployment consumes the Vite plugin's generated configuration; do not point Wrangler at a separate assets directory or rebuild on the low-capacity host.

The Nuxt preview and Cloudflare plugin versions match `code.soubiran.dev`. The pnpm patches fix SPA asset finalization and cf custom-domain drift comparison while retaining strict deploy checks. Remove them when the upstream fixes are available.

CI validates lint, generated Nuxt types, unit tests, and the production build, and uploads the Cloudflare build artifact. No production deployment runs on pull requests.
