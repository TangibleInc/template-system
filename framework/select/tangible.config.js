export default {
  build: [
    {
      src: 'src/index.ts',
      dest: 'build/select.min.js'
    },
    {
      src: 'src/index.scss',
      dest: 'build/select.min.css'
    },
  ],
  format: ['**/*.{php,ts,tsx,scss}', '!build'],
}
