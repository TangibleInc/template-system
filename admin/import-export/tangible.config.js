export default {
  build: [
    {
      src: 'template-import-export/index.tsx',
      dest: '../build/template-import-export.min.js',
      react: 'wp'
    },
    {
      src: 'template-import-export/index.scss',
      dest: '../build/template-import-export.min.css',
    },
  ],
  format: ['**/*.{php,ts,tsx,scss}', '!build'],
}
