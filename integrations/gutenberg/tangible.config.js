export default {
  build: [
    {
      src: 'gutenberg-template-editor/index.jsx',
      dest: 'build/gutenberg-template-editor.min.js',
      react: 'wp'
    },
    // {
    //   src: 'gutenberg-template-editor/index.scss',
    //   dest: 'build/gutenberg-template-editor.min.css',
    // },
  ],
  format: ['**/*.{php,ts,tsx,scss}', '!build'],
}
