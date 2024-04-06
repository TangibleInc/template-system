# Design module

The Design module provides the building blocks for creating design systems.

It is included in the Framework shared by Tangible plugins.

For development, the module can run as a standalone plugin. In that case, it adds an admin menu *Tangible -&gt; Design*, which currently shows a test page for HTML5 elements.


## Features

Possible features to be implemented:

- Design tokens

  [Standardized Design Tokens and CSS for a consistent, customizable, and interoperable WordPress future](https://mrwweb.com/standardized-design-tokens-css-wordpress-future/)

  - Base Styles and Reset
  - Layout
  - Flexbox & Grid
  - Spacing
  - Sizing
  - Typography
  - Backgrounds
  - Borders
  - Effects
  - Filters
  - Tables
  - Transitions & Animation
  - Transforms
  - Interactivity

- Style primitives - Atoms, components, pallettes, themes

- Design system as a set of variables with sensible defaults, which enable the user to customize while keeping the whole consistent

- Accessible UI patterns

  [ARIA Authoring Practices Guide: Patterns](https://www.w3.org/WAI/ARIA/apg/patterns/) and [example code](https://github.com/w3c/aria-practices/tree/main/content/patterns)


## Develop

Prerequisites: [Git](https://git-scm.com/) and [Node](https://nodejs.org/en/)

### Install

Clone the Git repository, and install dependencies.

```sh
git clone git@github.com/tangibleinc/design tangible-design
cd tangible-design
npm install
```

### Build for development

Build files, and watch for changes to rebuild

```sh
npm run dev
```

Press CTRL + C to stop.

### Build for production

Build and minify files

```sh
npm run build
```

### Update version

The following command runs the script `version.js` to update the version number in some files.

```sh
npm run version
```

## Local server

Optional - you can use any method to serve a WordPress site.

### Using [wp-now](https://github.com/WordPress/playground-tools/tree/trunk/packages/wp-now)

This is the easiest method without installing anything, using [WordPress Playground](https://wordpress.org/playground/).

Start the server.

```sh
npm run serve
```

It opens a browser at `http://localhost:8881` and logs you in automatically. Test user is `admin` with `password`. It also starts the development build script, `npm run dev`.

Press CTRL + C to stop.

### Using Docker

Prerequisites: [Docker](https://docs.docker.com/get-started/overview/)

#### Start

Start local server.

```sh
npx wp-env start
```

Visit `http://localhost:4660`. Test user is `admin` with `password`.


#### Stop

Stop local server.

```sh
npx wp-env stop
```

#### Remove

Remove local environment and its associated data.

```sh
npx wp-env destroy
```

