Versions correspond to plugin release of Loops & Logic and Tangible Blocks.

# 3.1.3

- Add WP Grid Builder integration with Tangible Template widget
- Embed module: Use CSS feature for aspect-ratio, and remove padding-top workaround
- Gutenberg integration
  - Improve compatibility with Full-Site Editor, which is still in beta stage
  - Solve issue with shortcode inside pagination loop - Protect template HTML result from Gutenberg applying content filters, such as wptexturize and do_shortcode, after all blocks have been rendered
- Sass module: Solve issue with first style rule selector - Prevent compiler from adding @charset rule or "byte-order mark", which are only valid for CSS stylesheet as a file, when it detects a multibyte character within the Sass source code
- Table module: Make column filter case-insensitive, and add support for multibyte characters
- Template post types
  - Add support for user option "Disable the visual editor when writing" by preventing it from filtering template content
  - Improve generating template slug from title, including converting em dash to regular dash

# 3.1.2

- Improve compatibility with PHP 8.2
- Loop: Improve logic to set current post as loop context for templates loaded inside shortcodes and builder-specific post loops, such as Elementor Loop Grid widget and Beaver Post Loop
- Plugin framework: Fix invalid hook name of ready action specific to module and version
- Post Loop: Add alias "current" (same as "today") for parameter "custom_date_field_value"
- Taxonomy Term Loop: Support multiple IDs for parameter "post"

# 3.1.1

- Loop: Improve getting default loop context for search results archive
- Sass module
  - Upgrade compiler library to ScssPhp 1.11.0
    - Improve compatibility with newer CSS features such as variables, functions, selectors, media queries
    - Improve compatibility with PHP 7 and 8
    - Improve error handling
  - Remove Autoprefixer and its dependency CSS Parser; Internet Explorer no longer supported
  - Improve passing Sass variables - Handle all known value types to be compatible with new compiler
  - Convert any compiler error message to CSS comment
- JavaScript and Sass variable types: Make default value type "raw" (unquoted) instead of "string" (quoted)
- Template post types
  - Support any database table prefix including `wp_`
  - Remove default slug metabox in edit screen to support AJAX save; Related issue in WP core: [Can't change page permalink if slug metabox is removed](https://core.trac.wordpress.org/ticket/18523)

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
