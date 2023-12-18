export default {
  build: [
    {
      src: 'src/index.ts',
      dest: 'build/embed.min.js'
    },
    {
      src: 'src/index.scss',
      dest: 'build/embed.min.css'
    },
  ],
  format: ['**/*.{php,ts,tsx,scss}', '!build'],
}
