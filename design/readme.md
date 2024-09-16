# Design

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
git clone git@github.com:tangibleinc/design tangible-design
cd tangible-design
npm install
```

### Start local site

Start the server.

```sh
npm run serve
```

It opens a browser at `http://localhost:8881` and logs you in automatically. Test user is `admin` with `password`.

Press CTRL + C to stop.

This method is the easiest way to serve a local site without installing anything. It uses [wp-now](https://github.com/WordPress/playground-tools/tree/trunk/packages/wp-now) and [WordPress Playground](https://wordpress.org/playground/). You're free to use any other way to run a local server.

For convenience, this command also starts the development build script described below.

### Build for development

Build files, and watch for changes to rebuild

```sh
npm run dev
```

Press CTRL + C to stop.

Use this command if you're running a local server other than `wp-now`.

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

