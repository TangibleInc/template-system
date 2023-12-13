export default {
  build: [
    {
      src: 'src/index.ts',
      dest: 'build/api.min.js'
    },
  ],
  format: ['**/*.{php,js,ts,jsx,tsx,json,scss}', '!build'],
}
