
## Getting started

```sh
git clone git@bitbucket.org:tangibleinc/template-system.git
cd template-system
npm install && composer install
```

### Module as plugin

The module can be installed as a plugin for development purpose. It depends on L&L or TBlocks being active. Update the module version in `system/index.php` to load with higher priority. This is useful for working on the module regularly, without having to go deep into another plugin's `vendor` folder.


## Develop

Build for development - watch files for changes and rebuild

```sh
npm run dev
```

Build for production

```sh
npm run build
```

Format to code standard

```sh
npm run format
```
