Versions correspond to plugin release of Loops & Logic and Tangible Blocks.


# 3.2.8

- Date module: Upgrade Carbon date library to 2.68.1
- Format tag
  - Add list and string format methods
    - index, offset, length, words - Cut a piece of string by position
    - split, join - Split string to list, and back
    - trim, trim_left, trim_right - Remove whitespace or given characters from start/end 
    - prefix, suffix - Add string before or after
    - reverse - Reverse a list
  - Regular expressions - replace_pattern, match_pattern
  - Multibyte string: uppercase, lowercase, capital, capital_words
  - Format list
    - Format every item in a list
    - Nested list formats
- If tag
  - Add comparison "match_pattern" to match value to regular expression
  - Improve comparison "includes" to support a List loop instance, for example: `<If acf_checkbox=checkbox_field includes value=field_value>`

# 3.2.5

- Elementor integration: Improve dynamic module loader by removing AJAX library from dependency list of Template Editor script
- Post loop
  - Improve handling when called directly without "type" or "post_type" parameter
  - For loop types that inherit from post loop, such as attachment, ensure backward compatibility with deprecated query parameter "type"

# 3.2.2

- Elementor integration: Enqueue dynamic module loader only when inside preview iframe
- Gutenberg integration: Remove do_shortcode filter workaround from WP 6.2.1
- List and Map tag
  - Add Item/Key tag attribute "type" for value type: number, boolean, list, map
  - Improve Item/Key tag to treat single List or Map inside as direct value, instead of converting it to string
- Loop tag
  - Add attribute "post_type" as the recommended way to create a post loop with custom post type
    This makes it distinct from attribute "type", which creates an instance of a loop type (such as "post" or "user") and only falls back to post loop if there's no loop type with the same name
  - Fix pagination issue when attribute "tag" is used

# 3.2.1

- Elementor integration: Ensure dynamic modules are activated inside preview iframe
- Format tag: Add attribute "remove_html" to remove HTML and make plain text
- Post loop: Improve sticky posts - Ensure "orderby" is only applied to non-sticky posts

# 3.2.0

- Add JSON-LD tag: Create a map and generate script tag for [JSON Linked Data](https://json-ld.org/)
- Add Raw tag: Prevents parsing its inner content; Useful for passing literal text, such as HTML, to other tags and tag attributes
- Format tag
  - Add attributes "start_slash" and "end_slash" to add slash to URL or any string; Use "start_slash=false" and "end_slash=false" to remove slash; These can be combined in one tag
  - Improve support for replace/with text that includes HTML
- HTML module: Improve "tag-attributes" feature to support dynamic tags
- Layout template type
  - Add theme position "Document Head" for adding Meta tags, JSON-LD schema, or link tag to load CSS files
  - Add theme position "Document Foot" for adding script tag to load JavaScript files
- Loop tag
  - Add attribute "sticky" for improved sticky posts support
    - Without sticky set, treat sticky posts as normal posts; this is the default behavior (backward compatible)
    - With sticky=true, put sticky posts at the top
    - With sticky=false, exclude sticky posts
    - With sticky=only, include sticky posts only
  - Deprecate "ignore_sticky_posts" due to WP_Query applying it only on home page
- Query variable type: Support passing loop attributes via AJAX, such as for pagination
- Url tag
  - Add attribute "query=true" to include all query parameters in current URL
  - Add attributes "include" and "exclude" to selectively pass query parameters by name; Accepts comma-separated list for multiple names
