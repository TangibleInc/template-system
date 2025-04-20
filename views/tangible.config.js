export default {
  build: [
    // IDE: Integrated development environment for Template, Style, Script
    {
      src: 'src/index.tsx',
      dest: 'build/view.min.js',
      react: 'wp'
    },
    {
      src: 'src/index.scss',
      dest: 'build/view.min.css'
    },
  ],
  format: ['**/*.{php,js,ts,jsx,tsx,json,scss}', '!build'],
}
