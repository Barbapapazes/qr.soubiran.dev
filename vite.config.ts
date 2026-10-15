import { defineConfig } from 'vite-plus'

// Nuxt owns the application Vite configuration in nuxt.config.ts.
// This config is used by Vite+ for linting and formatting only.
export default defineConfig({
  fmt: {
    semi: false,
    singleQuote: true,
    trailingComma: 'all',
    ignorePatterns: ['.agents/**'],
  },
  lint: {
    plugins: ['typescript', 'unicorn', 'vue', 'import'],
    jsPlugins: ['vite-plus/oxlint-plugin'],
    options: {
      typeAware: true,
      // Vue SFCs and Nuxt-generated types need vue-tsc (see `vp run typecheck`).
      typeCheck: false,
    },
    ignorePatterns: ['.nuxt/**', '.output/**', '.cloudflare/**', '.wrangler/**'],
    rules: {
      'vite-plus/prefer-vite-plus-imports': 'error',
      'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
      'typescript/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      'typescript/consistent-type-definitions': ['error', 'interface'],
      'no-console': ['error', { allow: ['warn', 'error'] }],
    },
  },
})
