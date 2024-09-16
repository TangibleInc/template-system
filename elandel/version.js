/**
 * Update version of all published packages
 */
import fs from 'node:fs/promises'
;(async () => {
  const version = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  const versionWithDots =
    version.slice(0, 4) +
    '.' +
    // Remove any leading zero
    parseInt(version.slice(4, 6), 10) +
    '.' +
    parseInt(version.slice(6, 8), 10)
  console.log('Version', versionWithDots)

  for (const file of [
    'package.json',
    'css/package.json',
    'editor/package.json',
    'html/package.json',
    'logic/package.json',
  ]) {
    console.log('Update', file)

    // YYYYMMDD

    const content = (await fs.readFile(file, 'utf8')).replace(
      /"version": "[0-9]+\.[0-9]+\.[0-9]+"/,
      `"version": "${versionWithDots}"`,
    )

    // console.log(content)

    await fs.writeFile(file, content)
  }
})().catch(console.error)
