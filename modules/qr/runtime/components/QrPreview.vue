<script lang="ts">
const qrPreview = tv({
  slots: {
    base: 'size-80',
  },
})

export interface QrPreviewProps {
  svg: string
  class?: any
  ui?: Partial<typeof qrPreview.slots>
}

export interface QrPreviewEmits {}

export interface QrPreviewSlots {}
</script>

<script lang="ts" setup>
const props = defineProps<QrPreviewProps>()
defineEmits<QrPreviewEmits>()
defineSlots<QrPreviewSlots>()

const el = useTemplateRef('el')
defineExpose({
  el,
})

const ui = computed(() => qrPreview())
</script>

<template>
  <div ref="el" role="img" aria-label="QR code preview" :class="ui.base({ class: [props.ui?.base, props.class] })">
    <div v-html="props.svg" />
  </div>
</template>
