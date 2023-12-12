export default {
  build: [
    {
      src: 'assets/src/tangible-logic.js',
      dest: 'assets/build/tangible-logic.js',
    },
    {
      src: 'assets/src/tangible-logic.scss',
      dest: 'assets/build/tangible-logic.css',
    },
  ],
  format: ['**/*.{php,js,json,scss}', '!assets/build'],
}
