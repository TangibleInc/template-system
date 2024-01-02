export default {
  build: [

    // Template editor
    {
      src: 'template-editor/index.ts',
      dest: '../build/template-editor.min.js',
    },
    {
      src: 'template-editor/index.scss',
      dest: '../build/template-editor.min.css',
    },
    {
      src: 'template-editor-bridge/global.ts',
      dest: '../build/template-editor-bridge.min.js',
    },
    {
      src: 'template-editor-bridge/index.scss',
      dest: '../build/template-editor-bridge.min.css',
    },
    {
      src: 'atomic-css/index.ts',
      dest: '../build/atomic-css.min.js',
    },
  ],
  format: [
    '**/*.{ts,scss}',
  ]
}
