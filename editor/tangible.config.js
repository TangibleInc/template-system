const config = {
  build: [
    {
      src: 'src/global.ts',
      dest: 'build/editor.min.js'
    },
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
  format: ['src', 'ide'],
}

module.exports = config
