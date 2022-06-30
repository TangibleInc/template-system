module.exports = {
  build: [
    // Template editor
    {
      src: 'assets/src/template-editor/index.js',
      dest: 'assets/build/template-editor.min.js',
    },
    {
      src: 'assets/src/template-editor/index.scss',
      dest: 'assets/build/template-editor.min.css',
    },

    // Template assets editor
    {
      src: 'assets/src/template-assets-editor/index.jsx',
      dest: 'assets/build/template-assets-editor.min.js',
      alias: {
        react: 'window.Tangible.Preact'
      }
    },
    {
      src: 'assets/src/template-assets-editor/index.scss',
      dest: 'assets/build/template-assets-editor.min.css',
    },

    // Template location editor
    {
      src: 'assets/src/template-location-editor/index.jsx',
      dest: 'assets/build/template-location-editor.min.js',
      alias: {
        react: 'window.Tangible.Preact'
      }
    },
    {
      src: 'assets/src/template-location-editor/index.scss',
      dest: 'assets/build/template-location-editor.min.css',
    },

    // Template import/export
    {
      src: 'assets/src/template-import-export/index.jsx',
      dest: 'assets/build/template-import-export.min.js',
      alias: {
        react: 'window.Tangible.Preact'
      }
    },
    {
      src: 'assets/src/template-import-export/index.scss',
      dest: 'assets/build/template-import-export.min.css',
    },

    // Template cloud
    /*
    {
      src: 'assets/src/template-cloud/index.jsx',
      dest: 'assets/build/template-cloud.min.js',
      alias: {
        react: 'window.Tangible.Preact'
      }
    },
    {
      src: 'assets/src/template-cloud/index.scss',
      dest: 'assets/build/template-cloud.min.css',
    },
    */

    // Page buider integrations

    // Gutenberg
    {
      src: 'assets/src/gutenberg-template-editor/index.jsx',
      dest: 'assets/build/gutenberg-template-editor.min.js',
      react: 'wp.element',
    },
    // {
    //   src: 'assets/src/gutenberg-template-editor/index.scss',
    //   dest: 'assets/build/gutenberg-template-editor.min.css',
    // },

    // Beaver Builder
    {
      src: 'assets/src/beaver-template-editor/index.js',
      dest: 'assets/build/beaver-template-editor.min.js',
      react: 'wp.element',
    },
    {
      src: 'assets/src/beaver-template-editor/index.scss',
      dest: 'assets/build/beaver-template-editor.min.css',
    },

    // Elementor
    {
      src: 'assets/src/elementor-template-editor/index.js',
      dest: 'assets/build/elementor-template-editor.min.js',
      react: 'wp.element',
    },
    {
      src: 'assets/src/elementor-template-editor/index.scss',
      dest: 'assets/build/elementor-template-editor.min.css',
    },
  ],
  format: [
    'assets/src',
    '**/*.php',
  ]
}
