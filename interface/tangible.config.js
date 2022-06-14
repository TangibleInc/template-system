module.exports = {
  build: [

    // Chart
    {
      task: 'js',
      src: 'assets/src/chart/index.js',
      dest: 'assets/build/chart.min.js',
      watch: 'assets/src/chart/**/*.js'
    },

    // Date Picker based on Pikaday
    {
      task: 'js',
      src: 'assets/src/date-picker/index.js',
      dest: 'assets/build/date-picker.min.js',
      watch: 'assets/src/date-picker/**/*.js'
    },
    {
      task: 'sass',
      src: 'assets/src/date-picker/index.scss',
      dest: 'assets/build/date-picker.min.css',
      watch: 'assets/src/date-picker/**/*.scss'
    },

    // Embed - Responsive iframe
    {
      task: 'js',
      src: 'assets/src/embed/index.js',
      dest: 'assets/build/embed.min.js',
      watch: 'assets/src/embed/**/*.js'
    },
    {
      task: 'sass',
      src: 'assets/src/embed/index.scss',
      dest: 'assets/build/embed.min.css',
      watch: 'assets/src/embed/**/*.scss'
    },

    // Glider - Fullscreen gallery slider
    {
      task: 'js',
      src: 'assets/src/glider/index.js',
      dest: 'assets/build/glider.min.js',
      watch: 'assets/src/glider/**/*.js'
    },
    {
      task: 'sass',
      src: 'assets/src/glider/index.scss',
      dest: 'assets/build/glider.min.css',
      watch: 'assets/src/glider/**/*.scss'
    },

    // Prism syntax highlighter = Theme
    {
      task: 'sass',
      src: 'assets/src/prism/index.scss',
      dest: 'assets/build/prism.min.css',
      watch: 'assets/src/prism/**/*.scss'
    },

    // Select
    {
      task: 'js',
      src: 'assets/src/select/index.js',
      dest: 'assets/build/select.min.js',
      watch: 'assets/src/select/**/*.js',
      root: 'assets/src/select',
      alias: {
        jquery: '@tangible/window/jquery'
      }
    },
    {
      task: 'sass',
      src: 'assets/src/select/index.scss',
      dest: 'assets/build/select.min.css',
      watch: 'assets/src/select/**/*.scss'
    },

    // Slider
    {
      task: 'js',
      src: 'assets/src/slider/index.js',
      dest: 'assets/build/slider.min.js',
      watch: 'assets/src/slider/**/*.js'
    },
    {
      task: 'sass',
      src: 'assets/src/slider/index.scss',
      dest: 'assets/build/slider.min.css',
      watch: 'assets/src/slider/**/*.scss'
    },

    // Sortable
    {
      task: 'js',
      src: 'assets/src/sortable/index.js',
      dest: 'assets/build/sortable.min.js'
    },

    // Table (sortable and paginated)
    {
      task: 'js',
      src: 'assets/src/table/index.js',
      dest: 'assets/build/table.min.js',
      watch: 'assets/src/table/**/*.js',
      alias: {
        jquery: '@tangible/window/jquery'
      }
    },
    {
      task: 'sass',
      src: 'assets/src/table/index.scss',
      dest: 'assets/build/table.min.css',
      watch: 'assets/src/table/**/*.scss'
    },

  ]
}