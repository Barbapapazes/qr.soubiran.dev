<script lang="ts">
import camera from '~icons/ph/camera'
import link from '~icons/ph/link'
import moon from '~icons/ph/moon'
import sun from '~icons/ph/sun'

const qrControls = tv({
  slots: {
    base: 'absolute inset-x-0 bottom-8 mx-auto flex w-full max-w-screen-sm flex-col gap-2',
    inner: 'flex justify-between gap-2',
  },
})

export interface QrControlsProps {
  isDark: boolean
  isDownloading?: boolean
  class?: any
  ui?: Partial<typeof qrControls.slots>
}

export interface QrControlsEmits {
  capture: []
  toggleTheme: []
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
      <UButton
        :icon="props.isDark ? moon : sun"
        aria-label="Toggle theme"
        color="neutral"
        variant="subtle"
        @click="emit('toggleTheme')"
      />

      <UFieldGroup>
        <UInput
          v-model="url"
          :icon="link"
          color="neutral"
          placeholder="URL"
          variant="subtle"
        />

        <UButton
          :disabled="props.isDownloading"
          :icon="camera"
          :loading="props.isDownloading"
          color="neutral"
          label="Capture"
          variant="solid"
          @click="emit('capture')"
        />
      </UFieldGroup>
    </div>
  </div>
</template>
