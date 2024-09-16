export default {
  archive: {
    root: 'tangible-template-system',
    src: [
      '*.php',
      'admin/**',
      'builder/**',
      'content/**',
      'editor/**',
      'elandel/editor/fonts/**',
      'form/**',
      'framework/**',
      'integrations/**',
      'language/**',
      'logic/**',
      'loop/**',
      'modules/**',
    ],
    dest: 'publish/tangible-template-system.zip',
    exclude: [
      '/builder/src',
      '/framework/design/src',
      '/framework/select/src',
      // './framework/date/Carbon/src', // Necessary
      '/framework/api/src',
      '/form/src',
      '/modules/**/src',
      '/vendor',
      '/vendor/tangible-dev',
      '**/*.test.js',
      '**/*.scss',
      '**/*.ts',
      '**/*.tsx'
    ],
  },
  format: [
    'tests/**/*.{php,js,jsx,json,ts,tsx,scss}'
  ],
  /**
   * Dependencies for production are installed in `vendor/tangible`, which is included
   * in the published zip package. Those for development are in `tangible-dev`, which
   * is excluded from the archive.
   * 
   * In the file `.wp-env.json`, these vendor folders are mounted to the virtual file
   * system for local development and testing.
   */
  install: [
    {
      zip: 'https://downloads.wordpress.org/plugin/advanced-custom-fields.latest-stable.zip',
      dest: 'vendor/tangible-dev/advanced-custom-fields'
    },
    {
      zip: 'https://downloads.wordpress.org/plugin/beaver-builder-lite-version.latest-stable.zip',
      dest: 'vendor/tangible-dev/beaver-builder-lite-version'
    },
    {
      zip: 'https://downloads.wordpress.org/plugin/elementor.latest-stable.zip',
      dest: 'vendor/tangible-dev/elementor'
    },
    {
      zip: 'https://downloads.wordpress.org/plugin/wp-fusion-lite.latest-stable.zip',
      dest: 'vendor/tangible-dev/wp-fusion-lite'
    },
    {
      git: 'git@github.com:tangibleinc/fields',
      branch: 'main',
      dest: 'vendor/tangible-dev/fields'
    }
  ],
}
