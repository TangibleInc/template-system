Versions correspond to plugin release of Loops & Logic and Tangible Blocks.

# 3.1.9

- Format: Improve handling of spaces for kebab and snake case
- If tag
  - Deprecate "is_not" in favor of "not", which supports all condition types and operators including "is"
  - Convert "is_not" to "not" and "is" for backward compatibility
- Improve PHP 8.2 compatibility
- Template post types: Fix drag-and-drop sort in post archive

# 3.1.7

- Gutenberg integration
  - Improve getting current post ID when inside builder
  - Improve content filter logic to protect template HTML
    - Support block themes
    - Ensure it applies only when inside do_blocks before do_shortcode

# 3.1.5

- Calendar loop types
  - For week number, use Carbon method isoWeek() instead of format('W') which adds unnecessary prefix "0" (zero)
  - Month loop type: Ensure the "year" attribute is taken into consideration; Organize how the attributes "year", "quarter", "from" and "to" are handled
- Format tag: Add support for replace/with string that includes HTML
- Gutenberg integration
  - Improve content filter logic
  - Improve getting current post ID when inside builder
  - Improve workaround for Full-Site Editor bug
    https://github.com/WordPress/gutenberg/issues/46702
- Redirect tag: Disable when inside page builder, AJAX, or REST API
- Switch tag: Improve converting non-default "When" to "Else if"
- Template post types: Remove max-width to let editor take up the full available width
- WP Grid Builder integration: Improve compatibility for PHP version before 7.3
