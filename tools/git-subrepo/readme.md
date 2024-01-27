# @tangible/git-subrepo

Wrapper to use [git-subrepo](https://github.com/ingydotnet/git-subrepo) as NPM package and command

### Prerequisites

- Node.js 18 or above
- Bash 3.2 or above
- Git 2.7 or above

### Install

```sh
npm install --save @tangible/git-subrepo
```

### Use

#### From command line

```sh
npx git-subrepo
npx git-subrepo status example-folder
```

#### From NPM script

```sh
{
  "scripts": {
    "subrepo": "git-subrepo --verbose"
  }
}
```

Run commands

```sh
npm run subrepo
npm run subrepo status example-folder
```
