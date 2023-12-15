export default {
  build: [
    // Form
    {
      src: 'src/index.js',
      dest: 'build/form.min.js',
    },
  ],
  format: ['**/*.{php,js,scss}', '!build'],
}
