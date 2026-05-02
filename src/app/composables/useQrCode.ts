import { encode, renderSVG } from 'uqr'
import { QR_BASE_OPTIONS, QR_OUTPUT_SIZE } from '@/app/constants'

export function useQrCode(content: MaybeRefOrGetter<string | undefined>) {
  const contentValue = computed(() => toValue(content) ?? '')

  const generation = computed(() => {
    const value = contentValue.value

    if (!value) {
      return null
    }

    try {
      return encode(value, QR_BASE_OPTIONS)
    }
    catch {
      return null
    }
  })

  const svg = computed(() => {
    const value = contentValue.value

    if (!value || !generation.value)
      return ''

    try {
      const qrSize = generation.value.size

      return renderSVG(value, {
        ...QR_BASE_OPTIONS,
        pixelSize: QR_OUTPUT_SIZE / qrSize,
      })
    }
    catch {
      return ''
    }
  })

  return {
    svg,
  }
}
