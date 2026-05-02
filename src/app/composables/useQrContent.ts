import { params } from '@/app/state/params'

const url = ref('')
let isInitialized = false

function syncUrlFromParams(value?: string) {
  const nextValue = value ?? ''

  if (url.value !== nextValue)
    url.value = nextValue
}

function syncParamsFromUrl(value: string) {
  const nextValue = value.trim() || undefined

  if (params.url !== nextValue)
    params.url = nextValue
}

export function useQrContent() {
  if (!isInitialized) {
    watch(() => params.url, syncUrlFromParams, { immediate: true })
    watch(url, syncParamsFromUrl)
    isInitialized = true
  }

  return {
    url,
  }
}
