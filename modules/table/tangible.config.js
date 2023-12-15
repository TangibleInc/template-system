export default {
  build: [
    {
      src: 'src/index.js',
      dest: 'build/dynamic-table.min.js',
    },
  ],
  format: [
    'src',
    '**/*.php',
  ]
}
