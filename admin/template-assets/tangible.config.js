export default {
  build: [
    {
      src: 'template-assets-editor/index.tsx',
      dest: '../build/template-assets-editor.min.js',
      react: 'wp'
    },
    {
      src: 'template-assets-editor/index.scss',
      dest: '../build/template-assets-editor.min.css',
    },

  ],
  format: ['**/*.{php,ts,tsx,scss}', '!build'],
}
