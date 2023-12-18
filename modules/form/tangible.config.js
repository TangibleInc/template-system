export default {
  build: [
    // Form
    {
      src: 'src/index.ts',
      dest: 'build/form.min.js',
    },
  ],
  format: ['**/*.{php,ts,tsx,scss}', '!build'],
}
