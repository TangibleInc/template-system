module.exports = {
  build: [
    {
      src: 'src/index.js',
      dest: 'build/mermaid.min.js',
      map: false
    },
    // {
    //   src: 'src/index.scss',
    //   dest: 'build/mermaid.min.css',
    // },
    // Test page
    {
      src: 'src/index.html',
      dest: 'build/index.html',
    }
  ],
  format: [
    'src',
    '**/*.php',
  ],
  serve: {
    dir: 'build'
  }
}
