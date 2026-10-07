<script lang="ts">
const qrControls = tv({
  slots: {
    base: 'absolute inset-x-0 bottom-8 mx-auto flex w-full max-w-screen-sm flex-col gap-2',
    inner: 'flex justify-center gap-2',
  },
})

export interface QrControlsProps {
  class?: any
  ui?: Partial<typeof qrControls.slots>
}

export interface QrControlsEmits {
  capture: []
}

export interface QrControlsSlots {}
</script>

<script lang="ts" setup>
const props = defineProps<QrControlsProps>()
const emit = defineEmits<QrControlsEmits>()
defineSlots<QrControlsSlots>()

const url = defineModel<string>({ required: true })
const ui = computed(() => qrControls())
</script>

<template>
  <div :class="ui.base({ class: [props.ui?.base, props.class] })">
    <div :class="ui.inner({ class: props.ui?.inner })">
      <UFieldGroup>
        <UInput
          v-model="url"
          icon="i-ph-link"
          aria-label="URL to encode"
          color="neutral"
          placeholder="URL"
          variant="subtle"
        />

        <UButton
          icon="i-ph-camera"
          :disabled="!url.trim()"
          color="neutral"
          label="Capture"
          variant="solid"
          @click="emit('capture')"
        />
      </UFieldGroup>
    </div>
  </div>
</template>
