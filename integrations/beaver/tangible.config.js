export default {
  build: [
    {
      src: 'beaver-template-editor/index.ts',
      dest: 'build/beaver-template-editor.min.js',
      react: 'wp'
    },
    {
      src: 'beaver-template-editor/index.scss',
      dest: 'build/beaver-template-editor.min.css',
    },

  ],
  format: ['**/*.{php,ts,tsx,scss}', '!build'],
}
