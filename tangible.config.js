export default {
  format: [
    'tests/**/*.{php,js,jsx,json,ts,tsx,scss}'
  ],
  archive: {
    src: [
      '*.php',
      'admin/**',
      'content/**',
      'editor/**',
      'form/**',
      // 'elandel',
      'framework/**',
      'integrations/**',
      'language/**',
      'logic/**',
      'loop/**',
      'modules/**',
    ],
    dest: 'publish/tangible-template-system.zip',
    exclude: [
      '/framework/select/src',
      // './framework/date/Carbon/src', // Necessary
      '/editor/ide/Layout/src',
      '/modules/**/src',
      '/logic/assets/src',
      '/vendor',
      '**/*.test.js',
      '**/*.scss',
      '**/*.ts'
    ],
    rootFolder: 'tangible-template-system'
  }
}
