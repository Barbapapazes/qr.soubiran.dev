/** Never send the QR content in shared URL parameters. */
export function sanitizeAnalyticsPayload(_type: string, payload: Record<string, unknown>) {
  function stripParameters(value: unknown) {
    return typeof value === 'string' ? value.split(/[?#]/, 1)[0] : ''
  }

  return {
    ...payload,
    url: stripParameters(payload.url),
    referrer: stripParameters(payload.referrer),
    title: 'QR ・ Estéban Soubiran',
  }
}
