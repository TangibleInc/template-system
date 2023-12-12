/**
 * Update version of all published packages
 */
import fs from 'node:fs/promises'
;(async () => {

  const version = new Date().toISOString().slice(0, 10).replace(/-/g, '')

  console.log('Version', version)

  for (const file of ['version.php', 'framework/index.php']) {
    // sed -i \"s/return '[0-9]\\+'/return '$(date +\"%Y%m%d\")'/\" version.php

    console.log('Update', file)

    const content = (await fs.readFile(file, 'utf8'))
      .replace(/return '[0-9]+'/, `return '${version}'`)
      .replace(/'version' => '[0-9]+'/, `'version' => '${version}'`)
      .replace(/\$version = '[0-9]+'/, `$version = '${version}'`)

    // console.log(content)

    await fs.writeFile(file, content)
  }
})().catch(console.error)
