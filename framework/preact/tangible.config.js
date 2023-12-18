export default {
  build: [
    {
      src: './index.ts',
      dest: 'build/preact.min.js'
    }
  ],
  format: ['**/*.{php,ts,tsx,scss}', '!build'],
}
