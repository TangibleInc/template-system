const submodules = [
  'module-loader',
  // 'modules/'
]

export default {
  build: [
    // Paginator
    {
      src: 'assets/src/paginator/index.js',
      dest: 'assets/build/paginator.min.js',
    },
    {
      src: 'assets/src/paginator/index.scss',
      dest: 'assets/build/paginator.min.css',
    },

    // Dynamic table
    {
      src: 'assets/src/dynamic-table/index.js',
      dest: 'assets/build/dynamic-table.min.js',
    },

    ...submodules.reduce((tasks, key) => {
      tasks.push(
        ...require(`./${key}/tangible.config.js`).build.map((task) => ({
          ...task,
          src: task.src && `./${key}/${task.src}`,
          dest: task.dest && `./${key}/${task.dest}`,
        }))
      )
      return tasks
    }, []),

    // Async render - Asynchronously render templates
    {
      src: 'assets/src/async-render/index.js',
      dest: 'assets/build/async-render.min.js',
    },
  ],
  format: ['**/*.{php,js,scss}', '!assets/build', '!codemirror'],
}
