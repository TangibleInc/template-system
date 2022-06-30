# Template System module

This is the template system shared by Tangible Blocks and Loops & Logic.

Originally all of the code was in the L&L plugin and its Composer modules. The features have been consolidated into this module, so Tangible Blocks can be installed independently and alongside L&L.

#### For development

The module can be installed as a standalone plugin for development purpose. Update the version in `admin/index.php` to load with priority.


## Current

- [ ] Provide extension hooks for L&L and Tangible Blocks
- [x] Convert core modules to use new builder tool
- [x] Bundle CodeMirror module
- [ ] Prepare base for CodeMirror 6
- [ ] Remove dependency on plugin framework
  - [x] Move HTML module into template system
  - AJAX
  - Date
  - HJSON
  - Post type extensions: Sortable, Duplicate Posts

