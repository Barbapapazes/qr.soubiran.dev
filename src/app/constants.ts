import type { QrCodeGenerateSvgOptions } from 'uqr'

export const QR_OUTPUT_SIZE = 500

export const QR_BASE_OPTIONS = {
  border: 2,
  ecc: 'M',
  whiteColor: 'white',
  blackColor: 'black',
} satisfies QrCodeGenerateSvgOptions
