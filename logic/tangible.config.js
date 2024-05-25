export default {
  build: [
    {
      src: 'web.ts',
      dest: 'build/logic.min.js'
    }
  ],
  format: [
    '**/*.{php,ts,json,scss}',
    '!build',
    '!v1'
  ]
}
