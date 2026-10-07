import type { MaybeRefOrGetter } from 'vue'
import { domToPng } from 'modern-screenshot'
import { toValue } from 'vue'

export function useScreenshot(element: MaybeRefOrGetter<any>) {
  function capture() {
    domToPng(toValue(element), { scale: 4 }).then((dataUrl) => {
      const a = document.createElement('a')
      a.download = 'screenshot.png'
      a.href = dataUrl
      a.click()
    })
  }

  return {
    capture,
  }
}
