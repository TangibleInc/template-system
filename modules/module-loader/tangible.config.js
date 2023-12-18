export default {
  build: [
    {
      src: 'src/index.ts',
      dest: 'build/module-loader.min.js',
    },
  ],
  format: ['**/*.{php,ts,tsx,scss}', '!build'],
}
