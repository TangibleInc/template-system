export default {
  build: [
    {
      src: 'src/index.ts',
      dest: 'build/mermaid.min.js',
      map: false
    },
    // {
    //   src: 'src/index.scss',
    //   dest: 'build/mermaid.min.css',
    // },
    // Test page
    // {
    //   src: 'src/index.html',
    //   dest: 'build/index.html',
    // }
  ],
  format: ['**/*.{php,ts,tsx,scss}', '!build'],
  serve: {
    dir: 'build'
  }
}
