import { sanitizeAnalyticsPayload } from '../utils/analytics'

declare global {
  interface Window {
    __qrAnalyticsBeforeSend: typeof sanitizeAnalyticsPayload
  }
}

export default defineNuxtPlugin(() => {
  // Umami calls this for both page views and events, including their referrers.
  window.__qrAnalyticsBeforeSend = sanitizeAnalyticsPayload

  const { trackPage } = useAnalytics()
  // This app has no routes: query changes customize the QR code, not the page.
  onNuxtReady(() => trackPage())
})
