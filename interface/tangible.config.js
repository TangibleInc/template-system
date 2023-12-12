export default {
  build: [

    // Chart
    {
      src: 'assets/src/chart/index.js',
      dest: 'assets/build/chart.min.js',
    },

    // Date Picker based on Pikaday
    {
      src: 'assets/src/date-picker/index.js',
      dest: 'assets/build/date-picker.min.js',
    },
    {
      src: 'assets/src/date-picker/index.scss',
      dest: 'assets/build/date-picker.min.css',
    },

    // Embed - Responsive iframe
    {
      src: 'assets/src/embed/index.js',
      dest: 'assets/build/embed.min.js',
    },
    {
      src: 'assets/src/embed/index.scss',
      dest: 'assets/build/embed.min.css',
    },

    // Glider - Fullscreen gallery slider
    {
      src: 'assets/src/glider/index.js',
      dest: 'assets/build/glider.min.js',
    },
    {
      src: 'assets/src/glider/index.scss',
      dest: 'assets/build/glider.min.css',
    },

    // Prism syntax highlighter and theme
    {
      src: 'assets/src/prism/index.scss',
      dest: 'assets/build/prism.min.css',
    },

    // Select
    {
      src: 'assets/src/select/index.js',
      dest: 'assets/build/select.min.js',
      root: 'assets/src/select',
      alias: {
        jquery: 'window.jQuery'
      }
    },
    {
      src: 'assets/src/select/index.scss',
      dest: 'assets/build/select.min.css',
    },

    // Slider
    {
      src: 'assets/src/slider/index.js',
      dest: 'assets/build/slider.min.js',
    },
    {
      src: 'assets/src/slider/index.scss',
      dest: 'assets/build/slider.min.css',
    },

    // Sortable
    {
      src: 'assets/src/sortable/index.js',
      dest: 'assets/build/sortable.min.js'
    },

    // Table (sortable and paginated)
    {
      src: 'assets/src/table/index.js',
      dest: 'assets/build/table.min.js',
      alias: {
        jquery: 'window.jQuery'
      }
    },
    {
      src: 'assets/src/table/index.scss',
      dest: 'assets/build/table.min.css',
    },

  ],
  format: [
    'assets/src',
    'includes',
    '*.{php,json}'
  ]
}
