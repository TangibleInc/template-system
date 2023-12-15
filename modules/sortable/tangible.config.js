export default {
  build: [
    {
      src: 'src/index.ts',
      dest: 'build/chart.min.js'
    },
  ],
  format: [
    'src',
    '**/*.php',
  ]
}
