export default {
  build: [
    {
      src: 'elementor-template-editor/index.js',
      dest: 'build/elementor-template-editor.min.js',
      react: 'wp'
    },
    {
      src: 'elementor-template-editor/index.scss',
      dest: 'build/elementor-template-editor.min.css',
    },
  ],
  format: ['**/*.{php,ts,tsx,scss}', '!build'],
}
