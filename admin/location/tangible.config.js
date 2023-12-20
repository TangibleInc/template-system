export default {
  build: [
    {
      src: 'template-location-editor/index.tsx',
      dest: '../build/template-location-editor.min.js',
      react: 'wp'
    },
    {
      src: 'template-location-editor/index.scss',
      dest: '../build/template-location-editor.min.css',
    },
  ],
  format: ['**/*.{php,ts,tsx,scss}', '!build'],
}
