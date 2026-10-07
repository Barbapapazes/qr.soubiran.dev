import type { ModuleDependencies } from 'nuxt/schema'
import { addImports, addPlugin, createResolver, defineNuxtModule } from 'nuxt/kit'

export default defineNuxtModule({
  meta: { name: 'qr:analytics' },
  // Provide defaults before Nuxt Scripts initializes its registry and runtime config.
  moduleDependencies: (nuxt): ModuleDependencies => ({
    '@nuxt/scripts': {
      defaults: {
        registry: {
          umamiAnalytics: nuxt.options.dev
            ? 'mock'
            : {
                hostUrl: 'https://umami.soubiran.dev',
                websiteId: 'ab92af1a-314f-44fb-a7f0-4c481a98a72a',
                autoTrack: false,
                beforeSend: '__qrAnalyticsBeforeSend',
                scriptInput: { src: 'https://umami.soubiran.dev/script.js' },
                trigger: 'onNuxtReady',
              },
        },
      },
    },
  }),
  setup() {
    const resolver = createResolver(import.meta.url)

    addImports({ name: 'useAnalytics', from: resolver.resolve('runtime/composables/useAnalytics') })
    addPlugin({ src: resolver.resolve('runtime/plugins/analytics.client'), mode: 'client' })
  },
})
