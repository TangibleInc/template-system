export default {
  archive: {
    root: 'tangible-template-system',
    src: [
      '*.php',
      'admin/**',
      'content/**',
      'editor/**',
      'elandel/editor/fonts/**',
      'form/**',
      // 'framework/**',
      'integrations/**',
      'language/**',
      'logic/**',
      'loop/**',
      'modules/**',
      'vendor/tangible/**',
      'view/**',
    ],
    dest: 'publish/tangible-template-system.zip',
    exclude: [
      '/.*',
      '/blueprint.*',
      '/bun.lockb',
      '/artifacts',
      '/design',
      '/form/src',
      '/framework',
      // '/framework/design/src',
      // '/framework/select/src',
      // // './framework/date/Carbon/src', // Necessary
      // '/framework/api/src',
      '/modules/**/src',
      '/publish',
      '/tests',
      '/tools',
      '/vendor/tangible-dev',
      '**/*.test.js',
      '**/*.scss',
      '**/*.ts',
      '**/*.tsx',
    ],
  },
  format: ['tests/**/*.{php,js,jsx,json,ts,tsx,scss}'],
  /**
   * Dependencies for production are installed in `vendor/tangible`, which is included
   * in the published zip package. Those for development are in `tangible-dev`, which
   * is excluded from the archive.
   *
   * In the file `.wp-env.json`, these folders are mounted to the virtual file system
   * for local development and testing.
   */
  install: [
    {
      git: 'git@github.com:tangibleinc/fields',
      dest: 'vendor/tangible/fields',
      branch: 'main',
    },
    {
      git: 'git@github.com:tangibleinc/framework',
      dest: 'vendor/tangible/framework',
      branch: 'main',
    },
    {
      git: 'git@github.com:tangibleinc/updater',
      dest: 'vendor/tangible/updater',
      branch: 'main',
    },
  ],
  installDev: [
    // Third party
    {
      zip: 'https://downloads.wordpress.org/plugin/advanced-custom-fields.latest-stable.zip',
      dest: 'vendor/tangible-dev/advanced-custom-fields',
    },
    {
      zip: 'https://downloads.wordpress.org/plugin/beaver-builder-lite-version.latest-stable.zip',
      dest: 'vendor/tangible-dev/beaver-builder-lite-version',
    },
    {
      zip: 'https://downloads.wordpress.org/plugin/elementor.latest-stable.zip',
      dest: 'vendor/tangible-dev/elementor',
    },
    {
      zip: 'https://downloads.wordpress.org/plugin/wp-fusion-lite.latest-stable.zip',
      dest: 'vendor/tangible-dev/wp-fusion-lite',
    },
  ],
}
