import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { useQrCode } from './useQrCode'

describe('useQrCode', () => {
  it('does not render empty content', () => {
    expect(useQrCode('').svg.value).toBe('')
    expect(useQrCode(undefined).svg.value).toBe('')
  })

  it('renders an SVG for a URL and updates reactively', () => {
    const content = ref('https://soubiran.dev')
    const { svg } = useQrCode(content)
    const original = svg.value
    expect(original).toContain('<svg')
    expect(original).toContain('500')
    content.value = 'https://qr.soubiran.dev'
    expect(svg.value).toContain('<svg')
    expect(svg.value).not.toBe(original)
    content.value = ''
    expect(svg.value).toBe('')
  })

  it('handles input beyond QR capacity without throwing', () => {
    expect(useQrCode('x'.repeat(10000)).svg.value).toBe('')
  })
})
