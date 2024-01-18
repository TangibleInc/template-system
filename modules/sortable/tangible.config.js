export default {
  build: [
    {
      src: 'src/index.ts',
      dest: 'build/sortable.min.js'
    },
  ],
  format: [
    'src',
    '**/*.php',
  ]
}
