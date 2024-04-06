export default {
  format: [
    'tests/**/*.{php,js,jsx,json,ts,tsx,scss}'
  ],
  archive: {
    src: [
      'admin',
      // 'elandel',
      'framework',
      'integrations',
      'language',
      'logic',
      'loop',
      'modules',
      'vendor'
    ],
    exclude: [
      'src',
      'tests',
    ],
    dest: 'publish/tangible-template-system.zip',
    rootFolder: 'tangible-template-system'
  }
}
