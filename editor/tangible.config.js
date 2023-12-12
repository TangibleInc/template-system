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
    // IDE: Integrated development environment for Template, Style, Script
    {
      src: 'ide/index.tsx',
      dest: 'build/ide.min.js',
      react: 'wp'
    },
    {
      src: 'ide/index.scss',
      dest: 'build/ide.min.css'
    },
  ],
  format: ['**/*.{php,js,ts,jsx,tsx,json,scss}', '!build'],
}
