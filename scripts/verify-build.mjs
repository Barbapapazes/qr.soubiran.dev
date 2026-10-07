import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { Miniflare } from 'miniflare'
import { chromium } from 'playwright'

const workerDirectory = resolve('.cloudflare/output/v0/workers/default')
const config = JSON.parse(await readFile(resolve(workerDirectory, 'worker.config.json'), 'utf8'))
assert.equal(config.name, 'qr-soubiran-dev')
assert.equal(config.manifest, undefined, 'QR should remain an assets-only deployment')
assert.deepEqual(config.domains, ['qr.soubiran.dev'])
assert.equal(config.assets.notFoundHandling, 'single-page-application')
const assetsDirectory = resolve(workerDirectory, 'assets')
const html = await readFile(resolve(assetsDirectory, 'index.html'), 'utf8')
assert.match(html, /QR ・ Estéban Soubiran/)
assert.match(html, /Generate downloadable QR codes for any URL/)

// Exercise the built SPA in Cloudflare's actual asset runtime, without deploying.
const runtime = new Miniflare({
  workers: [{
    config: {
      name: config.name,
      compatibilityDate: config.compatibilityDate,
      // Match the Vite plugin's preview shim: Miniflare requires a module even
      // when the asset router never invokes a user Worker. Not deployed.
      manifest: {
        mainModule: 'assets-only.mjs',
        modulesRoot: workerDirectory,
        modules: { 'assets-only.mjs': { type: 'esm', contents: 'export default {};' } },
      },
      assets: {
        directory: assetsDirectory,
        hasUserWorker: false,
        notFoundHandling: config.assets.notFoundHandling,
      },
    },
  }],
})
let browser
try {
  const origin = await runtime.ready
  const response = await fetch(new URL('/?url=https%3A%2F%2Fsoubiran.dev', origin))
  assert.equal(response.status, 200)
  const document = await response.text()
  const asset = document.match(/(?:src|href)="([^"?]*_nuxt\/[^"?]+\.js)/)?.[1]
  assert.ok(asset, 'SPA should reference a built JavaScript asset')
  assert.equal((await fetch(new URL(asset, origin))).status, 200)
  assert.equal((await fetch(new URL('/shared-link', origin))).status, 200)

  browser = await chromium.launch()
  const page = await browser.newPage()
  const errors = []
  page.on('pageerror', error => errors.push(error.stack ?? error.message))
  page.on('response', (response) => {
    if (response.request().resourceType() === 'script' && response.headers()['content-type']?.includes('text/html'))
      console.error('HTML returned for script:', response.url())
  })
  await page.route(/umami\.soubiran\.dev|fonts\.googleapis\.com|fonts\.gstatic\.com/, route => route.abort())
  const url = new URL(origin)
  url.searchParams.set('url', 'https://soubiran.dev')
  await page.goto(url.toString())
  const input = page.getByRole('textbox', { name: 'URL to encode', exact: true })
  await page.getByRole('img', { name: 'QR code preview', exact: true }).locator('svg').waitFor()
  assert.equal(await input.inputValue(), 'https://soubiran.dev')
  await input.fill('https://qr.soubiran.dev')
  await page.waitForFunction(() => new URL(location.href).searchParams.get('url') === 'https://qr.soubiran.dev')
  await page.reload()
  await page.getByRole('img', { name: 'QR code preview', exact: true }).locator('svg').waitFor()
  assert.equal(await input.inputValue(), 'https://qr.soubiran.dev')
  const downloadPromise = page.waitForEvent('download')
  await page.getByRole('button', { name: 'Capture', exact: true }).click()
  const download = await downloadPromise
  assert.equal(download.suggestedFilename(), 'screenshot.png')
  const png = await readFile(await download.path())
  assert.equal(png.subarray(0, 8).toString('hex'), '89504e470d0a1a0a')
  await input.fill('')
  await page.waitForFunction(() => !new URL(location.href).searchParams.has('url'))
  assert.equal(await page.getByRole('button', { name: 'Capture', exact: true }).isDisabled(), true)
  assert.deepEqual(errors, [], 'QR editor should boot and capture without browser exceptions')
  console.log('Verified built SPA assets, shared URL state, QR rendering, and PNG capture.')
}
finally {
  await browser?.close()
  await runtime.dispose()
}
