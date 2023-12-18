export default {
  build: [
    {
      src: 'assets/src/template-cloud/index.jsx',
      dest: 'assets/build/template-cloud.min.js',
      alias: {
        react: 'wp'
      }
    },
    {
      src: 'assets/src/template-cloud/index.scss',
      dest: 'assets/build/template-cloud.min.css',
    },
  ],
  format: [
    'assets/src',
    '**/*.php',
  ]
}
