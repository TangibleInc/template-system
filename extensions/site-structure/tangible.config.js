module.exports = {
  build: [
    {
      src: 'src/index.js',
      dest: 'build/site-structure.min.js',
    },
    {
      src: 'src/index.scss',
      dest: 'build/site-structure.min.css',
    },
  ],
  format: [
    'src',
    '**/*.php',
  ]
}
