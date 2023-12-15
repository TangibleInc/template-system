export default {
  build: [
    {
      src: 'src/index.ts',
      dest: 'build/date-picker.min.js'
    },
    {
      src: 'src/index.scss',
      dest: 'build/date-picker.min.css'
    },
  ],
  format: [
    'src',
    '**/*.php',
  ]
}
