const config = {
  build: [
    {
      src: 'src/global.ts',
      dest: 'build/editor.min.js'
    },
    // Test page
    {
      src: 'test/index.ts',
      dest: 'build/test.min.js'
    },
    {
      src: 'test/index.scss',
      dest: 'build/test.min.css'
    },
    {
      src: 'test/**/index.html',
      dest: 'build',
    },
  ],
  format: 'src',
  serve: {
    dir: 'build',
    port: 3000
  }
}

module.exports = config
