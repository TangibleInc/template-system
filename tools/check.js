import util from 'node:util'
import { exec as execSync } from 'node:child_process'

const execAsync = util.promisify(execSync)
const exec = async (...args) => {
  try {
    const { stdout, stderr } = await execAsync(...args)
    return [stdout, stderr]
  } catch (e) {
    return [null, e.message]
  }
}

;(async () => {

  // Ensure Plugin Check plugin is installed
  let [stdout, stderr] = await exec(`npx wp-env --quiet run tests-cli bash -c "
if [ -d wp-content/plugins/plugin-check ]; then
  echo 'Plugin Check plugin is installed';
  wp plugin activate plugin-check;
else 
  echo 'Installing Plugin Check plugin..';
  cd wp-content/plugins;
  curl -sL https://github.com/TangibleInc/plugin-check/archive/refs/heads/trunk.tar.gz | tar xz;
  if [ -d plugin-check ]; then
    rm -rf plugin-check;
  fi
  mv plugin-check-trunk plugin-check;
  cd plugin-check;
  composer install --no-dev;
  wp plugin activate plugin-check;
fi
"`)

  // console.log(stderr || stdout)
  // Continue either way because with wp-env, successful result still outputs to stderr

  ;[stdout, stderr] = await exec(`npx wp-env run tests-cli wp plugin check template-system -- --format=json`)

  // console.log(stderr || stdout)

  const lines = (stdout || '').split('\n')
  const files = []
  const prefix = 'FILE: '

  let index = 0
  for (const line of lines) {
    if (line.startsWith(prefix)) {
      const name = line.replace(prefix, '')
      let warnings = lines[index + 1]

      try {
        warnings = JSON.parse(warnings)
      } catch (e) {
        warnings = []
      }
      if (warnings.length) {
        files.push({
          name,
          warnings,
        })
      }
    }

    index++
  }

  /**
   * Option to output --json
   */

  const args = process.argv.slice(2)

  if (args.includes('--json')) {
    console.log(JSON.stringify(files, null, 2))
    process.exit()
  }

  /*
  type FileInfo = {
    name: string,
    warnings: {
      line: number,
      column: number,
      type: 'WARNING' | 'ERROR',
      code: string,
      message: string
    }[]
  }
  */

  console.log('# Plugin check\n\n'+(files.length === 0
    ? 'Congratulations! There was no error or warning.\n'
    : files.map(file => `## ${file.name}\n\n${
    file.warnings.map(({ line, column, type, code, message }) => `- Line ${line} ${type[0].toUpperCase() + type.slice(1).toLowerCase()}: \`${code}\`${message ? `\n\n  ${message}\n` : ''}`).join('\n')

  }`).join('\n\n')))

})().catch(console.error)
