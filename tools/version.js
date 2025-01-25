/**
 * Update version of all published packages
 */
import fs from 'node:fs/promises'
;(async () => {
  const version = new Date().toISOString().slice(0, 10).replace(/-/g, '')

  // Version number with dots should have no zero padding 1.02.03 -> 1.2.3
  const versionWithDots =
    [
      version.slice(0, 4),
      version.slice(4, 6),
      version.slice(6, 8)
    ].map(i => parseInt(i, 10).toString()).join('.')

  console.log('Version', versionWithDots)

  for (const file of [
    'admin/system.php',
    'core.php',
    'logic/module.php',
    'logic/package.json',
    'package.json',
    'plugin.php',
  ]) {
    console.log('Update', file)

    // YYYYMMDD

    const content = (await fs.readFile(file, 'utf8'))
      .replace(/return '[0-9]{8}'/, `return '${version}'`)
      .replace(/'version' => '[0-9]{8}'/, `'version' => '${version}'`)
      .replace(
        /'version' => '[0-9]{4}\.[0-9]{2}\.[0-9]{2}'/,
        `'version' => '${versionWithDots}'`,
      )
      .replace(/\$version = '[0-9]{8}'/, `$version = '${version}'`)
      .replace(
        /"version": "[0-9]{4}\.[0-9]{2}\.[0-9]{2}"/,
        `"version": "${versionWithDots}"`,
      )
      .replace(
        /Version: [0-9]{4}\.[0-9]{2}\.[0-9]{2}/,
        `Version: ${versionWithDots}`,
      )

    // console.log(content)

    await fs.writeFile(file, content)
  }
})().catch(console.error)
