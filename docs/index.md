# Template System module

This is the template system shared by Tangible Blocks and Loops & Logic. Originally all of the code was in the L&L plugin and its Composer modules, but the features have been consolidated into this module so Tangible Blocks can be installed independently or alongside L&L.


## Current

- [ ] Provide extension hooks for L&L and Tangible Blocks
- [ ] Convert core modules to use new builder tool
- [ ] Bundle CodeMirror module
- [ ] Remove dependency on plugin framework


## Architecture

### Loop module

Loop types and fields

### Logic module

Logic rules and evaluation

### Template module

Template language defined by dynamic tags

### Admin module

Template management: post types (Template/Script/Style/Layout), assets, location, import/export


## Develop

The module can be installed as a standalone plugin for development purpose. Update the version in `admin/index.php` to load with priority.

