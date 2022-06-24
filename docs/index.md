# Template System module

This is the template system shared by Tangible Blocks and Loops & Logic.

Originally all of the code was in the L&L plugin and its Composer modules, but the features have been consolidated into this module so Tangible Blocks can be installed independently and alongside L&L.


## Current

- [ ] Provide extension hooks for L&L and Tangible Blocks
- [x] Convert core modules to use new builder tool
- [x] Bundle CodeMirror module
- [ ] Remove dependency on plugin framework


## Architecture

### Admin module

Template management

- Post types: Template/Script/Style/Layout
- Assets
- Location
- Import/export

### Loop module

Loop types and fields

### Logic module

Logic rules and evaluation

### Template module

Template language defined by dynamic tags


## Develop

The module can be installed as a standalone plugin for development purpose. Update the version in `admin/index.php` to load with priority.

