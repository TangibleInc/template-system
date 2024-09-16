# Design

The Design module provides the building blocks for creating design systems. It is a modular, embeddable, customizable library based on a full rewrite of Bootstrap.

## Current

- [ ] Local styles
  - [x] Prefix all CSS variables
  - [x] Prefix all `data-` attributes
  - [ ] Prefix all classes
  - [ ] Parent selector for classes
- [x] Use only `data-` attribute interface for components, instead of jQuery plugins
- [x] Create Reset module from style reboot
- [ ] Create Base module for shared styles and script
- [ ] Wrap all components
  - [ ] Pass Base module to factory function instead of importing it, so they can be compiled and loaded individually
  - [ ] Pass optional CSS class prefix
- [ ] Prefer Sass variables, mixins, placeholders - instead of CSS variables and classes which can produce large amount of unused styles

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

Prerequisites: [Git](https://git-scm.com/) and [Node](https://nodejs.org/en/) (minimum version 18)

### Install

Clone the Git repository, and install dependencies.

```sh
git clone git@github.com:tangibleinc/design tangible-design
cd tangible-design
npm install
```

### Develop

Start a minimal static file server.

```sh
npm run start
```

It serves the `build` directory at `http://localhost:3535`. It also builds files (CSS/JS), then watches for changes to rebuild and reload the site.

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

## Local WordPress site for development

For local development, the module can run as a standalone WordPress plugin. In that case, it adds an admin menu *Tangible -&gt; Design*, which currently shows a test page for HTML5 elements.

Start the server.

```sh
npm run wp
```

It opens a browser at `http://localhost:8881` and logs you in automatically. Test user is `admin` with `password`.

Press CTRL + C to stop.

This method is the easiest way to serve a local WordPress site without installing anything. It uses [wp-now](https://github.com/WordPress/playground-tools/tree/trunk/packages/wp-now) and [WordPress Playground](https://wordpress.org/playground/). You're free to use any other way to run a local server.

For convenience, this command also starts the development build script described above.
