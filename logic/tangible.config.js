import fs from 'node:fs/promises'

export default {
  build: [
    {
      type: 'module',
      src: 'index.ts',
      dest: 'publish/index.js'
    },
    // {
    //   src: 'web.ts',
    //   dest: 'build/logic.min.js'
    // },
    async function buildNpmPackage() {
      const {
        name,
        version,
        description
      } = JSON.parse(await fs.readFile('package.json'))
      const targetFile = 'publish/package.json'
      await fs.writeFile(targetFile, `{
  "name": "${name}",
  "description": "${description}",
  "version": "${version}",
  "type": "module",
  "main": "index.js"
}`
      )
      console.log('Wrote', targetFile)
    }
  ],
  format: [
    '**/*.{php,ts,json,scss}',
    '!build',
    '!publish',
  ]
}
