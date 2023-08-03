const config = {
  build: [
    {
      src: 'src/settings.ts',
      dest: 'build/settings.min.js'
    },
  ],
  format: ['**/*.{php,js,ts,jsx,tsx,json,scss}', '!build'],
}

module.exports = config
