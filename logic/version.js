/**
 * Update version of all published packages
 */
import fs from 'node:fs/promises'
;(async () => {
  const version = new Date().toISOString().slice(0, 10).replace(/-/g, '')

  console.log('Version', version)

  for (const file of [
    'module.php',
  ]) {

    console.log('Update', file)

    // YYYYMMDD

    const content = (await fs.readFile(file, 'utf8'))
      .replace(/\$version = '[0-9]{8}'/, `$version = '${version}'`)

    // console.log(content)

    await fs.writeFile(file, content)
  }
})().catch(console.error)
