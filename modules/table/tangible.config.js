export default {
  build: [
    {
      src: 'dynamic-table/index.ts',
      dest: 'build/dynamic-table.min.js',
    },
    {
      src: 'table/index.ts',
      dest: 'build/table.min.js',
    },
    {
      src: 'table/index.scss',
      dest: 'build/table.min.css',
    },
  ],
  format: ['**/*.{php,ts,tsx,scss}', '!build', '!vendor'],
}
