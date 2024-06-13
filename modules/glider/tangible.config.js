export default {
  build: [
    {
      src: 'src/index.ts',
      dest: 'build/glider.min.js'
    },
    {
      src: 'src/index.scss',
      dest: 'build/glider.min.css'
    },
  ],
  format: ['**/*.{php,ts,tsx,scss}', '!build', '!vendor'],
}
