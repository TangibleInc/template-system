export default {
  build: [
    {
      src: 'v1/src/index.ts',
      dest: 'v1/build/paginator.min.js'
    },
    {
      src: 'v1/src/index.scss',
      dest: 'v1/build/paginator.min.css'
    },
  ],
  format: ['**/*.{php,ts,tsx,scss}', '!build'],
}
