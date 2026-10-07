import { cloudflare } from '@cloudflare/vite-plugin'

export default defineNuxtConfig({
  compatibilityDate: '2026-10-07',
  ssr: false,
  pages: false,
  devtools: { enabled: false },
  server: { builder: 'vite' },
  modules: ['@nuxt/ui', '@vueuse/nuxt', '@nuxt/scripts'],
  css: ['~/styles/main.css'],
  ui: { colorMode: false },
  icon: { provider: 'iconify', serverBundle: false, clientBundle: { scan: true } },
  imports: { imports: [{ from: 'tailwind-variants', name: 'tv' }] },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'QR ・ Estéban Soubiran',
      meta: [{ name: 'description', content: 'Generate downloadable QR codes for any URL.' }],
    },
  },
  vite: { plugins: [cloudflare()] },
  typescript: { strict: true },
})
