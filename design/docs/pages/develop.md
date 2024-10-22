---
sidebar_position: 10
---

# Develop

Prerequisites: [Git](https://git-scm.com/), [Node](https://nodejs.org/en/) (version 18 and above) or [Bun](https://bun.sh)

### Install

Clone the Git repository, and install dependencies.

```sh
git clone git@github.com:tangibleinc/design
cd design
npm install
```

### Develop

Start the Docusaurus script.

```sh
npm run start
```

It serves the `build` directory at http://localhost:3000/design. It also builds files (CSS/JS), then watches for changes to rebuild and reload the site. Press CTRL + C to stop.

### Build for production

Build and minify files for production.

```sh
npm run build
```
