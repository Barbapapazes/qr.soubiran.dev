import { defineConfig } from 'cf/config'

export default defineConfig({
  worker: {
    name: 'qr-soubiran-dev',
    compatibilityDate: '2026-10-07',
    domains: ['qr.soubiran.dev'],
    workersDev: true,
    assets: { notFoundHandling: 'single-page-application' },
  },
})
