import { DEFAULT_QR_FILENAME } from '@/app/constants'

function toSlug(value: string) {
  return value
    .replace(/[^a-z0-9]+/gi, '-')
    .replace(/(^-|-$)/g, '')
    .toLowerCase()
}

export function createQrFilename(value?: string) {
  if (!value)
    return DEFAULT_QR_FILENAME

  try {
    const url = new URL(value)
    const baseName = toSlug(`${url.hostname}${url.pathname === '/' ? '' : url.pathname}`.replace(/^www\./, ''))

    return baseName ? `qr-${baseName}` : DEFAULT_QR_FILENAME
  }
  catch {
    return DEFAULT_QR_FILENAME
  }
}
