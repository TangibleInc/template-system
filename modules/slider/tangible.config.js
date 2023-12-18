export default {
  build: [
    {
      src: 'src/index.ts',
      dest: 'build/slider.min.js'
    },
    {
      src: 'src/index.scss',
      dest: 'build/slider.min.css'
    },
  ],
  format: ['**/*.{php,ts,tsx,scss}', '!build', '!vendor'],
}
