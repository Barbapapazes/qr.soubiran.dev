const PNG_MIME_TYPE = 'image/png'
const SVG_MIME_TYPE = 'image/svg+xml;charset=utf-8'

function downloadBlob(blob: Blob, fileName: string) {
  const objectUrl = URL.createObjectURL(blob)
  const anchor = document.createElement('a')

  anchor.href = objectUrl
  anchor.download = fileName
  document.body.append(anchor)
  anchor.click()
  anchor.remove()

  requestAnimationFrame(() => {
    URL.revokeObjectURL(objectUrl)
  })
}

function loadSvgImage(svg: string) {
  const objectUrl = URL.createObjectURL(new Blob([svg], { type: SVG_MIME_TYPE }))

  return new Promise<{ image: HTMLImageElement, objectUrl: string }>((resolve, reject) => {
    const image = new Image()
    image.decoding = 'async'

    image.onload = () => resolve({ image, objectUrl })
    image.onerror = () => {
      URL.revokeObjectURL(objectUrl)
      reject(new Error('Unable to rasterize the generated SVG.'))
    }

    image.src = objectUrl
  })
}

async function createPngBlob(svg: string, size: number) {
  const { image, objectUrl } = await loadSvgImage(svg)

  try {
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size

    const context = canvas.getContext('2d')

    if (!context)
      throw new Error('Canvas rendering is not available in this browser.')

    context.fillStyle = '#ffffff'
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.drawImage(image, 0, 0, size, size)

    const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, PNG_MIME_TYPE))

    if (!blob)
      throw new Error('Unable to encode the PNG export.')

    return blob
  }
  finally {
    URL.revokeObjectURL(objectUrl)
  }
}

export function useQrDownload() {
  const isDownloading = ref(false)

  function downloadSvg(svg: string, fileName: string) {
    if (!svg)
      return

    downloadBlob(new Blob([svg], { type: SVG_MIME_TYPE }), fileName)
  }

  async function downloadPng(svg: string, fileName: string, size: number) {
    if (!svg || !size || isDownloading.value)
      return

    isDownloading.value = true

    try {
      const blob = await createPngBlob(svg, size)
      downloadBlob(blob, fileName)
    }
    finally {
      isDownloading.value = false
    }
  }

  return {
    downloadPng,
    downloadSvg,
    isDownloading,
  }
}
