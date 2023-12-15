export default {
  build: [
    {
      src: 'src/index.js',
      dest: 'build/paginator.min.js',
    },
    {
      src: 'src/index.scss',
      dest: 'build/paginator.min.css',
    },
  ],
  format: [
    'src',
    '**/*.php',
    '!build',
    '!vendor'
  ]
}
