import antfu from '@antfu/eslint-config'

export default antfu({
  stylistic: true,
  vue: true,
}, {
  files: ['pnpm-workspace.yaml'],
  rules: {
    'pnpm/yaml-enforce-settings': ['error', {
      settings: {
        shellEmulator: true,
        trustPolicy: 'off',
      },
    }],
  },
}, {
  files: ['scripts/*.mjs'],
  rules: {
    // Use the JS rule: the TS-aware unused-imports rule misclassifies top-level
    // await bindings as type-only references in these Node ESM scripts.
    'unused-imports/no-unused-vars': 'off',
    'no-unused-vars': 'error',
  },
})
