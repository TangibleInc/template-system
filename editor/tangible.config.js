export default {
  build: [
    {
      src: 'core/global.ts',
      dest: 'build/editor.min.js'
    },
    // {
    //   src: 'core/index.scss',
    //   dest: 'build/editor.min.css'
    // },
  ],
  format: ['**/*.{php,js,ts,jsx,tsx,json,scss}', '!build'],
}
