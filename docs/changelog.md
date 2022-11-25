Versions correspond to plugin release of Loops & Logic and Tangible Blocks.

# 3.0.2

- Loop: Improve getting default loop context for search results archive
- Sass module
  - Upgrade compiler library to ScssPhp 1.11.0
  - Remove Autoprefixer and its dependency CSS Parser

# 3.0.1

- Calendar loop types
  - Improve handling in case invalid values are passed
  - Week loop: Correctly handle January which can have a week row that starts in the previous year
- HTML Hint: Add exception for Shortcode tag to allow self-closing raw tag
- Loop and Field tags: Get current post context inside builder preview when post status is other than publish
- Template editor: Improve compatibility with Beaver Builder's CSS

# 3.0.0

- ACF select: Support looping field with single select value
- ACF image url field: Support size attribute
- Add feature module: Mermaid - Diagram library
- BaseLoop: Add `sort_date_format` parameter when using `sort_type=date`, to convert from date format to timestamp for sorting
- Compatibility with PHP 8.1
- Compatibility with WordPress 6.0.2
- Dynamic module assets loader - Support loading scripts and styles on demand, such as when page builders fetch and insert dynamic HTML
  - Implemented: Embed, Glider, Mermaid, Prism, Slider
  - In progress: Chart, Paginator, Table
- Gutenberg, Beaver, and Elementor integrations
  - Ensure current post as default loop context in page builder preview, saved templates, builder-specific loops, and template shortcode
  - Remove unused styles
- HTML module: Add special tag attribute named "tag-attributes" for dynamic attributes with or without value
- HTML Lint library
  - Fork and wrap in unique namespace to improve compatibility with Customizer and other plugins that may load a different version
  - Modify core/rules/tag-pair.ts to be case-sensitive for tag names
- Import & Export
  - Clear any cached field values such as compiled CSS when overwriting an existing template
  - Export all template types with orderby=menu_order, to ensure that location rules are applied in the correct priority
  - Support templates with post status other than publish: draft, future, pending, private (skip auto-draft, inherit/revision, and trash)
- If tag: user_role condition
  - Add alias "admin" for administrator
  - Support all common comparison operators
  - Support shortcut for includes: user_role=admin
- Layout template type
  - Correctly apply rule for "Singular - All post types"
  - Improve support for block themes
  - Render page content before head to support Meta tag in block themes
- List and Loop tag: Add attribute "items" to create a list from comma-separated values
- Logic module: Improve rules
  - For subject "list", add support for all common comparisons
  - Convert subject to list as expected: any_is, any_is_not, all_is, all_is_not, any_starts_with, all_starts_with, any_ends_with, all_ends_with
  - Convert value to list: in, not_in
  - For starts_with and ends_with, if subject is list then check first/last item
- Map tag: Add "type" attribute for Key tag to specify value type: number, boolean, string, map, list
- Script and Style template type: Add location rule "Nowhere" to disable loading
- Start Comment loop type
- Start developer docs: architecture, plan, design system
- Style template type: Load earlier at wp_head action priority 9, before default (10)
- Template archive view
  - Correctly show location rules for imported templates
  - Support select and copy template ID
- Template editor
  - Disable AJAX save until following issues are resolved
    - Form nonce expiring after one day
    - Reliably save the post slug
    - Show confirmation dialog on window unload only when necessary
  - Make editor full height of template
  - Remember and restore current tab in template edit screen
