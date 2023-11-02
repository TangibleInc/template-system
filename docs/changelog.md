Versions correspond to plugin release of Loops & Logic and Tangible Blocks.

# 3.3.0

- ACF integration
  - Flexible Content and Repeater field: Improve compatibility with PHP 8
  - Template field
    - Add support for editor inside repeater field
    - **Breaking change**: Make feature optional and disabled by default to prevent ACF from loading field assets (JS & CSS) on every admin screen; Enable in the new settings page 
- Admin settings page: Tangible -> Settings
  - Features under development: New editor based on CodeMirror 6
  - Optional features: ACF Template field
- Field tag: Add format shortcuts: join, replace, replace_pattern
- Format tag: Support capture groups for replace_pattern; When invalid regular expression is passed, emit a warning instead of throwing an error
- Gutenberg integration
  - Improve compatibility with standalone Gutenberg plugin
  - Remove dependency on lodash
- If tag: Pass attribute "matches_pattern" without rendering, to support regular expression with curly braces; Use syntax `<If check=".." matches_pattern="..">`; Support dynamic tags in attribute "matches_pattern" without delimiters; Display warning instead of throwing error for invalid pattern syntax
- Import/export
  - Add new template package format using browser-native gzip compressor and encoded as PNG image file; This could be useful for uploading and sharing on forums where JSON is not suitable
  - Ensure JSON and SVG file types are allowed during import
- Inteface module: Build Select2 from full version instead of minimal to improve compatibility with other plugins like ACF and WooCommerce which bundle their own Select2 library 
- Menu loop: Return empty list if menu not found
- Post loop: Add field "modified_author" and "modified_author_*"
- Taxonomy term loop: Support taxonomy fields created with PODS
