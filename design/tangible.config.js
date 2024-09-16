export default {
  build: [
    {
      src: 'global.scss',
      dest: 'build/design.min.css',
    },
    {
      src: 'global.ts',
      dest: 'build/design.min.js',
    },
    {
      src: 'index.html',
      dest: 'build',
    },
  ],
  serve: {
    dir: 'build',
    port: 3535
  }
}
