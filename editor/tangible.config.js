export default {
  build: [
    {
      src: 'index.ts',
      dest: 'build/editor.min.js'
    },
    {
      src: 'index.scss',
      dest: 'build/editor.min.css'
    },
  ],
  format: ['**/*.{php,js,ts,jsx,tsx,json,scss}', '!build'],
}
