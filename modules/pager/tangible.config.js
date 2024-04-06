export default {
  build: [
    {
      src: 'v1/src/index.ts',
      dest: 'v1/build/paginator.min.js'
    },
  ],
  format: ['**/*.{php,ts,tsx,scss}', '!build'],
}
