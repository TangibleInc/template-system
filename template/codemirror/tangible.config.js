module.exports = {
  build: [

    // // CodeMirror
    // {
    //   src: 'global.js',
    //   dest: 'build/codemirror.min.js',
    // },
    // {
    //   src: 'styles.scss',
    //   dest: 'build/codemirror.min.css',
    // },

    // // Theme
    // {
    //   src: 'themes/light.scss',
    //   dest: 'build/codemirror-theme-light.min.css',
    // },

    // Minify vendor libraries
    {
      src: 'lib/htmlhint.js',
      dest: 'vendor/htmlhint.min.js',
      map: false
    },
    {
      src: 'lib/csslint.js',
      dest: 'vendor/csslint.min.js',
      map: false
    },
    {
      src: 'lib/jshint.js',
      dest: 'vendor/jshint.min.js',
      map: false,
    },
    {
      src: 'lib/jsonlint.js',
      dest: 'vendor/jsonlint.min.js',
      map: false,
    },
    {
      src: 'lib/scsslint.js',
      dest: 'vendor/scsslint.min.js',
      map: false,
    },

    // {
    //   task: 'babel',
    //   src: 'lib/codemirror-src/**/*.js',
    //   dest: 'lib/codemirror',
    // },

    // Test page
    {
      src: 'test/index.js',
      dest: 'build/index.min.js',
    },
    {
      src: 'test/index.scss',
      dest: 'build/index.min.css',
    },
    {
      src: 'test/index.html',
      dest: 'build',
    },
  ],
  serve: {
    dir: 'build',
    port: 3000
  }
}