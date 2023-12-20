import path from 'node:path'
import fs from 'node:fs/promises'
import { existsSync } from 'node:fs'
import util from 'node:util'
import { exec as execSync } from 'node:child_process'
import readline from 'node:readline'

const exec = util.promisify(execSync)

async function run(command, options) {
  console.log(command)
  const { stdout, stderr } = await exec(command, options)
  console.log(stdout)
  if (stderr) {
    console.log(stderr)
    return false
  }
  return true
}

function prompt(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  return new Promise((resolve) => {
    rl.on('SIGINT', function () {
      rl.close()
      resolve(false) // Returns false on CTRL+C
    })
    rl.question(query, (answer) => {
      rl.close()
      resolve(answer)
    })
  })
}

;(async () => {
  console.log('Plugin check')

  const pluginCheckPath = path.join(
    process.cwd(),
    'vendor/tangible/plugin-check'
  )

  if (!existsSync(pluginCheckPath)) {
    await fs.mkdir('vendor/tangible', {
      recursive: true,
    })

    const confirm = async (cmd) => {
      const answer = await prompt(
        `Press enter to run the following command, or CTRL+C to cancel: ${cmd}\n`
      )
      console.log()
      if (answer === false) {
        // Cancelled
        process.exit()
      }
    }

    let cmd = `git clone --depth 1 --single-branch --branch trunk https://github.com/WordPress/plugin-check`

    await confirm(cmd)
    await run(cmd, {
      cwd: 'vendor/tangible',
    })
    console.log()

    if (!existsSync(pluginCheckPath)) {
      console.log('Failed to install')
      process.exit()
    }

    // await run('composer install --ignore-platform-req=ext-mbstring', {
    //   cwd: pluginCheckPath
    // })
    if (!existsSync(path.join(pluginCheckPath, 'vendor'))) {
      console.log('Failed to install')
      process.exit()
    }

    await run('npx wp-env run tests-cli bash -c "cd wp-content/plugins/ && ln -s template-system/vendor/tangible/plugin-check" && composer install && wp plugin activate plugin-check')

  }

  await run('npx wp-env run tests-cli wp plugin check template-system > check.md')
})().catch(console.error)
