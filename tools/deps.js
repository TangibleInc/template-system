/**
 * Plugin dependencies
 */
import fs from 'node:fs/promises'
import { run } from './common.js'

const fileExists = async (file) => {
  try {
    await fs.access(file)
    return true
  } catch (e) {
    return false
  }
}

;(async () => {
  const availableDownloads = {
    acf: {
      url: 'https://downloads.wordpress.org/plugin/advanced-custom-fields.latest-stable.zip',
    },
    beaver: {
      url: 'https://downloads.wordpress.org/plugin/beaver-builder-lite-version.latest-stable.zip',
    },
    elementor: {
      url: 'https://downloads.wordpress.org/plugin/elementor.latest-stable.zip',
    },
    'wp-fusion': {
      url: 'https://downloads.wordpress.org/plugin/wp-fusion-lite.latest-stable.zip',
    },
  }

  const args = process.argv.slice(2)

  const container = `tests-cli` // Or cli for dev site
  const vendorFolder = `./vendor/tangible`

  if (!args.length) {
    console.log(`Install plugin dependencies

Usage: npm run deps [...plugins] [--update]

Available plugins: all ${Object.keys(availableDownloads).join(' ')}

Options:
  --update  Update to newest version even if plugin is already downloaded

Examples:

  npm run deps all             Download all plugins
  npm run deps all --update    Update all plugins

  npm run deps acf             Download single plugin
  npm run deps acf  --update   Update single plugin
`)
    return
  }

  if (args[0] === 'all') {
    args.splice(0)
    args.push(...Object.keys(availableDownloads))
  }

  console.log('..Downloading vendor plugins')

  const downloads = []
  const downloadFolders = []

  for (const name of args) {
    const url = availableDownloads[name]?.url
    if (!url) {
      console.log('Unknown download', name)
      continue
    }
    const file = url.split('/').pop()

    const folder = file.replace('.latest-stable.zip', '').replace('.zip', '')

    downloadFolders.push(folder)

    if (await fileExists(`${vendorFolder}/${folder}`)) {

      // TODO: Folder already exists - Prompt to skip or re-download
      console.log('Folder already exists', folder)
  
    } else {
      downloads.push([url, file])
    }
  }

  if (downloads.length) {

    const command = `npx wp-env run ${container} bash -c "
  cd wp-content/plugins/template-system &&
  mkdir -p vendor &&
  cd vendor &&
  mkdir -p tangible &&
  cd tangible &&
  ${downloads
    .map(([url, file]) => {
      return `curl -LO ${url} && unzip ${file} && rm ${file}`
    })
    .join(';\n')}
  "`

    let [stdout, stderr] = await run(command)

    console.log(stderr || stdout)
  }

  const entries = await fs.readdir(vendorFolder, {
    withFileTypes: true,
  })

  const configPath = `.wp-env.override.json`
  const config = (await fileExists(configPath))
    ? JSON.parse(await fs.readFile(configPath, 'utf-8'))
    : {
        mappings: {},
      }

  for (const entry of entries) {
    if (!entry.isDirectory()) continue

    if (downloadFolders.includes(entry.name)) {
      const pluginPath = `wp-content/plugins/${entry.name}`
      if (!config.mappings[pluginPath]) {
        config.mappings[pluginPath] = `${vendorFolder}/${entry.name}`
      }
    }
  }

  // Sort

  config.mappings = Object.keys(config.mappings)
    .sort()
    .reduce((obj, key) => {
      obj[key] = config.mappings[key]
      return obj
    }, {})

  await fs.writeFile(configPath, JSON.stringify(config, null, 2))

  console.log('Updated:', configPath)

  console.log('Restart wp-env by running: npm run start')

})().catch(console.error)
