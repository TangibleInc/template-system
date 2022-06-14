module.exports = {
  build: [
    {
      task: 'js',
      src: 'assets/src/tangible-logic.js',
      dest: 'assets/build/tangible-logic.js',
      watch: 'assets/src/tangible-logic.js'
    },
    {
      task: 'sass',
      src: 'assets/src/tangible-logic.scss',
      dest: 'assets/build/tangible-logic.css',
      watch: 'assets/src/tangible-logic.scss'
    }
  ]
}
