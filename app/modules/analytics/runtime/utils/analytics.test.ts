import { describe, expect, it } from 'vitest'
import { sanitizeAnalyticsPayload } from './analytics'

describe('sanitizeAnalyticsPayload', () => {
  it.each(['event', 'identify'])('removes sensitive URL state from %s payloads', (type) => {
    const payload = {
      url: '/?url=https%3A%2F%2Fprivate.example#secret',
      referrer: 'https://qr.soubiran.dev/?url=other-secret#private',
      title: 'private-title',
      name: 'pageview',
      data: {},
    }

    expect(sanitizeAnalyticsPayload(type, payload)).toEqual({
      url: '/',
      referrer: 'https://qr.soubiran.dev/',
      title: 'QR ・ Estéban Soubiran',
      name: 'pageview',
      data: {},
    })
    expect(payload.url).toContain('private.example')
  })

  it('preserves clean paths and handles missing referrers', () => {
    expect(sanitizeAnalyticsPayload('event', { url: '/' })).toEqual({
      url: '/',
      referrer: '',
      title: 'QR ・ Estéban Soubiran',
    })
  })

  it('strips fragments even without query parameters', () => {
    expect(sanitizeAnalyticsPayload('event', {
      url: '/#private',
      referrer: 'https://example.com/#secret',
    })).toMatchObject({ url: '/', referrer: 'https://example.com/' })
  })
})
