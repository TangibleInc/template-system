export default {
  build: [
    {
      src: 'src/index.ts',
      dest: 'build/async-render.min.js'
    },
  ],
  format: [
    'src',
    '**/*.php',
  ]
}
