export default {
  build: [
    // IDE: Integrated development environment for Template, Style, Script
    {
      src: 'index.tsx',
      dest: '../build/ide.min.js',
      react: 'wp'
    },
    {
      src: 'index.scss',
      dest: '../build/ide.min.css'
    },
  ],
  format: ['**/*.{php,js,ts,jsx,tsx,json,scss}', '!build'],
}
