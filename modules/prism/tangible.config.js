export default {
  build: [
    {
      src: 'src/index.scss',
      dest: 'build/prism.min.css',
    },
  ],
  format: ['**/*.{php,ts,tsx,scss}', '!build', '!vendor'],
}
