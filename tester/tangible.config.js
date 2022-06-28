module.exports = {
  build: [
    {
      src: 'assets/src/index.js',
      dest: 'assets/build/tester.min.js',
    },
    {
      src: 'assets/src/index.scss',
      dest: 'assets/build/tester.min.css',
    },
  ],
  format: ['**/*.{php,json,js,scss}', '!assets/build'],
}
