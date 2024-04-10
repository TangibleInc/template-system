import fs from 'fs/promises'

const args = process.argv.slice(2)
const command = args.shift()

const commands = {
  async deps() {

    const dependencies = {}
    const devDependencies = {}

    for (const name of [
      'css',
      'editor',
      'html',
      'markdown'
    ]) {

      const pkg = JSON.parse(
        await fs.readFile(`./${name}/package.json`, 'utf-8')
      )

      Object.assign(dependencies, pkg.dependencies || {})
      Object.assign(devDependencies, pkg.devDependencies || {})
    }

    const pkg = JSON.parse(
      await fs.readFile(`./package.json`, 'utf-8')
    )

    pkg.dependencies = Object.keys(dependencies).sort().reduce((obj, key) => {
      obj[key] = dependencies[key]
      return obj
    }, {})
    pkg.devDependencies = Object.keys(devDependencies).sort().reduce((obj, key) => {
      obj[key] = devDependencies[key]
      return obj
    }, {})

    await fs.writeFile(`./package.json`, JSON.stringify(pkg, null, 2))

    console.log(pkg)

  },
  help() {
    console.log(`Usage: node build.js [command] [...options]
Available commands:

deps   Gather module dependencies and update package.json
help   Show this help screen
`)
  }
}

;(commands[command] || commands.help)().catch(console.error)
