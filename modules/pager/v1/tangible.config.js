export default {
  build: [
    {
      src: 'src/index.ts',
      dest: 'build/paginator.min.js'
    },
  ],
  format: ['**/*.{php,ts,tsx,scss}', '!build'],
}
