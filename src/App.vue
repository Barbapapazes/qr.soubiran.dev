<script lang="ts">
import QrControls from '@/components/QrControls.vue'
import QrPreview from '@/components/QrPreview.vue'
import { QR_OUTPUT_SIZE } from '@/constants'

const app = tv({
  slots: {
    base: 'flex h-screen w-screen flex-col items-center justify-center',
  },
})

export interface AppProps {
  class?: any
  ui?: Partial<typeof app.slots>
}

export interface AppEmits {}

export interface AppSlots {}
</script>

<script lang="ts" setup>
const props = defineProps<AppProps>()
defineEmits<AppEmits>()
defineSlots<AppSlots>()

const { url } = useQrContent()
const { svg, fileName } = useQrCode(url)
const { downloadPng, isDownloading } = useQrDownload()
const ui = computed(() => app())

function captureQrCode() {
  return downloadPng(svg.value, fileName.value, QR_OUTPUT_SIZE)
}
</script>

<template>
  <main :class="ui.base({ class: [props.ui?.base, props.class] })">
    <QrPreview :svg="svg" />

    <QrControls
      v-model="url"
      :is-downloading="isDownloading"
      @capture="captureQrCode"
    />
  </main>
</template>
