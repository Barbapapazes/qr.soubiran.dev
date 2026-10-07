import { addComponent, addImports, createResolver, defineNuxtModule } from 'nuxt/kit'

export default defineNuxtModule({
  meta: { name: 'qr:editor' },
  setup() {
    const resolver = createResolver(import.meta.url)
    for (const name of ['QrWorkspace', 'QrControls', 'QrPreview']) {
      addComponent({ name, filePath: resolver.resolve(`runtime/components/${name}.vue`) })
    }
    for (const name of ['useQrContent', 'useQrCode', 'useScreenshot']) {
      addImports({ name, from: resolver.resolve(`runtime/composables/${name}`) })
    }
  },
})
