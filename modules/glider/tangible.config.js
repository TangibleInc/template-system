export default {
  build: [
    {
      src: 'src/index.ts',
      dest: 'build/glider.min.js'
    },
  ],
  format: ['**/*.{php,ts,tsx,scss}', '!build', '!vendor'],
}
