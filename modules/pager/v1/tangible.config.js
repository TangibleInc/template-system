export default {
  build: [
    {
      src: 'src/index.ts',
      dest: 'build/paginator.min.js'
    },
    {
      src: 'src/index.scss',
      dest: 'build/paginator.min.css'
    },
  ],
  format: ['**/*.{php,ts,tsx,scss}', '!build'],
}
