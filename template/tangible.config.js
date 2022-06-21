module.exports = {
  build: [

    // CodeMirror
    {
      task: 'js',
      src: 'assets/src/codemirror/index.js',
      dest: 'assets/build/codemirror.min.js',
      watch: 'assets/src/codemirror/**/*.js'
    },
    {
      task: 'sass',
      src: 'assets/src/codemirror/index.scss',
      dest: 'assets/build/codemirror.min.css',
      watch: ['assets/src/codemirror/**/*.scss', '!assets/src/codemirror/themes/**/*.scss']
    },
    {
      task: 'sass',
      src: 'assets/src/codemirror/theme-light.scss',
      dest: 'assets/build/codemirror-theme-light.min.css',
      watch: 'assets/src/codemirror/theme-light.scss'
    },

    // {
    //   task: 'copy',
    //   src: 'node_modules/@tangible/codemirror/vendor/*.min.js',
    //   dest: 'assets/vendor'
    // },

    // Paginator
    {
      task: 'js',
      src: 'assets/src/paginator/index.js',
      dest: 'assets/build/paginator.min.js',
      watch: 'assets/src/paginator/**/*.js'
    },
    {
      task: 'sass',
      src: 'assets/src/paginator/index.scss',
      dest: 'assets/build/paginator.min.css',
      watch: 'assets/src/paginator/**/*.scss'
    },

    // Dynamic table
    {
      task: 'js',
      src: 'assets/src/dynamic-table/index.js',
      dest: 'assets/build/dynamic-table.min.js',
      watch: 'assets/src/dynamic-table/**/*.js'
    },

    // Module loader - Support loading scripts and styles when page builders fetch and insert HTML
    {
      task: 'js',
      src: 'assets/src/module-loader/index.js',
      dest: 'assets/build/module-loader.min.js',
      watch: 'assets/src/module-loader/**/*.js'
    },

    // Async render - Asynchronously render templates
    {
      task: 'js',
      src: 'assets/src/async-render/index.js',
      dest: 'assets/build/async-render.min.js',
      watch: 'assets/src/async-render/**/*.js'
    },

    // Form
    {
      task: 'js',
      src: 'assets/src/form/index.js',
      dest: 'assets/build/form.min.js',
      watch: 'assets/src/form/**/*.js'
    },

  ],
}
