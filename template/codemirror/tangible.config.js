module.exports = {
  build: [

    // // CodeMirror
    // {
    //   task: 'js',
    //   src: 'global.js',
    //   dest: 'build/codemirror.min.js',
    //   watch: ['index.js']
    // },
    // {
    //   task: 'sass',
    //   src: 'styles.scss',
    //   dest: 'build/codemirror.min.css',
    //   watch: ['styles.scss']
    // },

    // // Theme
    // {
    //   task: 'sass',
    //   src: 'themes/light.scss',
    //   dest: 'build/codemirror-theme-light.min.css',
    //   watch: ['themes/light.scss']
    // },

    // Minify vendor libraries
    {
      task: 'js',
      src: 'lib/csslint.js',
      dest: 'vendor/csslint.min.js',
    },
    {
      task: 'js',
      src: 'lib/jshint.js',
      dest: 'vendor/jshint.min.js',
    },
    {
      task: 'js',
      src: 'lib/jsonlint.js',
      dest: 'vendor/jsonlint.min.js',
    },
    {
      task: 'js',
      src: 'lib/scsslint.js',
      dest: 'vendor/scsslint.min.js',
    },

    // {
    //   task: 'babel',
    //   src: 'lib/codemirror-src/**/*.js',
    //   dest: 'lib/codemirror',
    // },

    // Test page
    {
      task: 'js',
      src: 'test/index.js',
      dest: 'build/index.min.js',
      watch: ['*.js', 'lib/**/*.js', 'modes/**/*.js', 'test/**/*.js']
    },
    {
      task: 'sass',
      src: 'test/index.scss',
      dest: 'build/index.min.css',
      watch: ['styles/**/*.scss', 'themes/**/*.scss', 'test/**/*.scss']
    },
    {
      task: 'html',
      src: 'test/index.html',
      dest: 'build',
      watch: 'test/index.html'
    },
  ],
  serve: {
    src: 'build',
    port: 3000
  }
}