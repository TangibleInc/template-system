<?php
namespace Tangible\Loop;

use tangible\format;
use tangible\hjson;

/**
 * Post loop wrapping WP_Query
 *
 * Custom post type loops should extend this class, and register its type(s).
 *
 * Override get_item_field() to add fields specific to post type.
 */

require_once __DIR__ . '/field.php';

class PostLoop extends BaseLoop {

  static $config = [
    'name'        => 'post',
    'title'       => 'Post',
    'category'   => 'core',
    'description' => 'Post loop for posts, pages and custom post types',
    'query_args'  => [

      // @see https://developer.wordpress.org/reference/classes/wp_query/

      'post_type'          => [
        'description' => 'Post type(s)',
        'type'        => [ 'string', 'array' ],
      ],

      // For backward compatibility - Use post_type instead
      'type'          => [
        'target_name' => 'post_type',
        'internal'    => true,
        'type'        => [ 'string', 'array' ],
      ],

      'id'         => [
        'target_name' => 'include',
        'description' => 'ID',
        'type'        => ['string', 'array'],
      ],

      'name'         => [
        'target_name' => 'include',
        'description' => 'Name/slug',
        'type'        => ['string', 'array'],
      ],

      'status'        => [
        'target_name' => 'post_status',
        'description' => 'Post status: publish (default), pending, draft, future, private, trash',
        'type'        => [ 'string', 'array' ],
        'default'     => 'publish',
      ],

      // Include/exclude

      'include'         => [
        'description' => 'Include by ID or name',
        'type'        => ['string', 'array'],
      ],

      'exclude'         => [
        'description' => 'Exclude by ID or name',
        'type'        => ['string', 'array'],
      ],

      // Sticky
      'sticky' => [
        'description' => 'Sticky posts: true (stick to top), false (exclude them), only (exclude normal posts) - By default, they are treated the same as normal posts',
        'type' => 'string',
      ],

      // Parents and children

      'parent' => [
        'target_name' => 'post_parent__in',
        'description' => 'Include by parent ID or name',
        'type'        => ['string', 'array'],
      ],

      'exclude_parent' => [
        'target_name' => 'post_parent__not_in',
        'description' => 'Exclude by parent ID or name',
        'type'        => ['string', 'array'],
      ],

      'include_children' => [
        'description' => 'Include children',
        'type'        => 'boolean',
        'default'     => false,
      ],

      // Author

      'author' => [
        'target_name' => 'author__in',
        'description' => 'Include by author ID, login name, or "current"',
        'type'        => ['string', 'array'],
      ],
      'exclude_author' => [
        'target_name' => 'author__not_in',
        'description' => 'Exclude by author ID, login name, or "current"',
        'type'        => ['string', 'array'],
      ],

      // Category, tag

      'category' => [
        'target_name' => 'category__in',
        'description' => 'Include by category ID, slug, or "current"',
        'type'        => ['string', 'array'],
      ],
      'exclude_category' => [
        'target_name' => 'category__not_in',
        'description' => 'Exclude by category ID, slug, or "current"',
        'type'        => ['string', 'array'],
      ],

      'tag' => [
        'target_name' => 'tag__in',
        'description' => 'Include by tag ID, slug, or "current"',
        'type'        => ['string', 'array'],
      ],
      'exclude_tag' => [
        'target_name' => 'tag__not_in',
        'description' => 'Exclude by tag ID, slug, or "current"',
        'type'        => ['string', 'array'],
      ],

      // Taxonomy

      'taxonomy' => [
        'description' => 'Include by taxonomy ID, slug, or "current" for taxonomy archive<br>Use with "term" and "taxonomy_compare" attributes',
        'type'        => ['string', 'number'],
      ],
      'terms' => [
        'description' => 'Include by taxonomy term ID, slug, or "current"<br>Use with "taxonomy" attribute',
        'type'        => ['string', 'number', 'array'],
      ],
      'child_terms' => [
        'description' => 'Set "true" to include child terms for hierarchical taxonomies',
        'type'        => ['string'],
      ],

      'taxonomy_compare' => [
        'description' => 'One of "in" (default), "not", "and", "exists", and "not exists"<br>Use with "taxonomy" attribute',
        'type'        => ['string'],
      ],

      'taxonomy_relation' => [
        'description' => 'When using more than one "taxonomy" queries, can specify "and" or "or"',
        'type'        => 'string',
      ],

      // TODO: Maybe generate these programmatically
      'taxonomy_2' => [
        'description' => 'See attribute "taxonomy"',
        'type'        => ['string', 'number'],
      ],
      'terms_2' => [
        'description' => 'See attribute "terms"',
        'type'        => ['string', 'number', 'array'],
      ],
      'taxonomy_compare_2' => [
        'description' => 'See attribute "taxonomy_compare"',
        'type'        => ['string'],
      ],
      'taxonomy_3' => [
        'description' => 'See attribute "taxonomy"',
        'type'        => ['string', 'number'],
      ],
      'terms_3' => [
        'description' => 'See attribute "terms"',
        'type'        => ['string', 'number', 'array'],
      ],
      'taxonomy_compare_3' => [
        'description' => 'See attribute "taxonomy_compare"',
        'type'        => ['string'],
      ],

      // Search
      'search' => [
        'target_name' => 's',
        'description' => 'Search by given keyword - Prepending a keyword with a hyphen "-" will exclude posts matching it',
        'type'        => 'string',
      ],

      // Published date

      'publish_date' => [
        'description' => 'Filter by publish date in Y-M-D format, "today", "X days ago" and other values compatible with strtotime() - Optionally use "publish_compare" attribute',
        'type'        => 'string',
      ],

      'publish_compare' => [
        'description' => 'Publish date comparison - One of: "before", "before_inclusive", "after", "after_inclusive"',
        'type'        => 'string',
      ],

      'publish_year' => [
        'target_name' => 'year',
        'description' => 'Filter by given publish year, or "current"',
        'type'        => 'number',
      ],
      'publish_month' => [
        'target_name' => 'monthnum',
        'description' => 'Filter by given publish month, from 1 to 12, or "current"',
        'type'        => 'number',
      ],
      'publish_week' => [
        'target_name' => 'w',
        'description' => 'Filter by given publish week, from 1 to 54, or "current" - Note: the "publish_compare" attribute is not supported for this field',
        'type'        => 'number',
      ],
      'publish_day' => [
        'target_name' => 'day',
        'description' => 'Filter by given publish day of the month, from 1 to 31, or "current"',
        'type'        => 'number',
      ],


      /**
       * Custom field query - Passed to WP_Query
       */

      'custom_field' => [
        'description' => 'Filter by given custom field - Faster than using "field", this queries raw field values in the database',
        'type'        => 'string',
      ],
      'custom_field_value' => [
        'description' => 'Filter by given custom field value',
        'type'        => 'string',
      ],
      'custom_field_compare' => [
        'description' => 'Compare using one of: "equal" (default), "not", "before", "before_inclusive", "after", "after_inclusive"',
        'type'        => 'string',
      ],
      'custom_field_type' => [
        'description' => 'For custom field query, one of: string (default), number, date, time, datetime',
        'type'        => 'string',
      ],

      // TODO: Maybe generate these programmatically
      'custom_field_2' => [
        'description' => 'See attribute "custom_field"',
        'type'        => ['string'],
      ],
      'custom_field_value_2' => [
        'description' => 'See attribute "custom_field_value"',
        'type'        => ['string'],
      ],
      'custom_field_compare_2' => [
        'description' => 'See attribute "custom_field_compare"',
        'type'        => ['string'],
      ],
      'custom_field_type_2' => [
        'description' => 'See attribute "custom_field_type"',
        'type'        => 'string',
      ],
      'custom_field_3' => [
        'description' => 'See attribute "custom_field"',
        'type'        => ['string'],
      ],
      'custom_field_value_3' => [
        'description' => 'See attribute "custom_field_value"',
        'type'        => ['string'],
      ],
      'custom_field_compare_3' => [
        'description' => 'See attribute "custom_field_compare"',
        'type'        => ['string'],
      ],
      'custom_field_type_3' => [
        'description' => 'See attribute "custom_field_type"',
        'type'        => 'string',
      ],

      /**
       * WP Grid Builder facet integration
       * @see https://docs.wpgridbuilder.com/resources/guide-filter-custom-queries/
       */
      'wp_grid_builder' => [
        'description' => 'WP Grid Builder identifier for filtering content',
        'type'        => 'string',
      ],

      // Date field query

      'custom_date_field' => [
        'description' => 'Filter by given custom date field - Faster than using "field", this queries raw field values in the database',
        'type'        => 'string',
      ],
      'custom_date_field_value' => [
        'description' => 'Filter by given custom date field value, or "current"',
        'type'        => 'string',
      ],
      'custom_date_field_compare' => [
        'description' => 'Compare using one of: "equal" (default), "not", "before", "before_inclusive", "after", "after_inclusive"',
        'type'        => 'string',
      ],
      'custom_date_field_format' => [
        'description' => 'For custom date field query, specify the date format of the field value - Default is "Ymd"; For date-time field, set "Y-m-d H:i:s". If it\'s a timestamp, use "timestamp". For custom field plugins other than ACF, you may need to use a different format.',
        'type'        => 'string',
      ],
      'custom_date_field_type' => [
        'description' => 'For custom date field query, one of: date (default), time, datetime, number',
        'type'        => 'string',
      ],


      // Order by, order

      'orderby'             => [
        'description' => 'Order by one of: id, author, title, name, type, date, modified, random, comment_count, relevance, menu',
        'type'        => 'string',
        'default'     => 'title',
      ],
      'order'         => [
        'description' => 'Order: asc (ascending) or desc (descending)',
        'type'        => 'string',
        'default'     => 'asc',
        'accepts'     => ['asc', 'desc'],
      ],

      'orderby_field' => [
        'description' => 'Order by custom field',
        'type'        => 'string',
      ],

      'orderby_field_number' => [
        'description' => 'Order by custom field whose value is a number',
        'type'        => 'string',
      ],

      // Pagination

      'paged'      => [
        'target_name' => 'posts_per_page',
        'description' => 'Posts per page',
        'type'        => 'number',
        'default'     => -1,
      ],
      // Standard WP_Query posts per page parameter (currently only used for WPGB facet pagination)
      'posts_per_page' => [
        'target_name' => 'posts_per_page',
        'description' => 'Posts per page',
        'type'        => 'number',
      ],
      'page'      => [
        'target_name' => 'paged',
        'description' => 'Page number',
        'type'        => 'number',
        'default'     => 1,
      ],

      // Important for handling large number of posts
      'fields'         => [
        'value' => 'ids',
        'internal' => true, // Don't show in documentation
      ],

    ], // End: Query parameters

    'fields'      => [
      'id'      => [ 'description' => 'ID' ],
      'name'    => [ 'description' => 'name/slug' ],
      'url'     => [ 'description' => 'URL' ],
      'title'   => [ 'description' => 'Title' ],
      'content' => [ 'description' => 'Content' ],
      'excerpt' => [ 'description' => 'Excerpt' ],
      'status'  => [ 'description' => 'Status' ],
      'edit_url' => [ 'description' => 'Edit URL' ],

      'publish_date'  => [ 'description' => 'Publish date' ],
      'modify_date'   => [ 'description' => 'Modify date' ],

      'post_class'  => [ 'description' => 'Post classes' ],
      'menu_order'  => [ 'description' => 'Menu order' ],

      /**
       * Currently queried object of an archive: implemented in /type/index.php,
       * since it can exist for queries that return empty.
       */
      'archive_author' => [
        'description' => 'On an author archive page: Current author as a user loop'
      ],
      'archive_term' => [
        'description' => 'On a taxonomy archive page: Current taxonomy term as a loop'
      ],
      'archive_post_type' => [
        'description' => 'On a post type archive page: Current post type as a loop'
      ],

      'author'  => [ 'type' => 'user', 'description' => 'Author' ],
      'author_*'  => [ 'type' => 'user', 'description' => 'Author\'s user field' ],

      'modified_author'  => [ 'type' => 'user', 'description' => 'Modified author' ],
      'author_*'  => [ 'type' => 'user', 'description' => 'Modified author\'s user field' ],

      'parent'  => [ 'type' => 'current', 'description' => 'Parent' ],
      'parent_*'  => [ 'type' => 'current', 'description' => 'Parent field' ],
      'parent_ids' => [ 'description' => 'All parent IDs from current to top' ],

      'children'  => [ 'type' => 'current', 'description' => 'Children' ],
      'children_ids' => [ 'type' => 'current', 'description' => 'Children IDs' ],

      'ancestors' => [ 'type' => 'current', 'description' => 'Ancestor posts from lowest to highest level; Set reverse=true to go from top-level down' ],

      'image'   => [ 'type' => 'attachment', 'description' => 'Featured image' ],
      'image_*' => [ 'type' => 'attachment', 'description' => 'Featured image field' ],

      'all'     => [
        'description' => 'Show all custom fields (for development purpose)',
      ],
    ],
  ];

  public $original_post;

  function __construct( $args = [] ) {

    global $post;
    $this->original_post = $post;

    // Alias and backward compatibility
    if (isset($args['type'])) {
      if (!isset($args['post_type'])) {
        $args['post_type'] = $args['type'];
      }
      unset($args['type']);
    } elseif (!isset($args['post_type'])) {
      $args['post_type'] = 'post';
    }

    parent::__construct( $args );

    return $this;
  }

  // Loop type name
  function get_name() {

    // Current item's post type
    $name = $this->get_field('type');

    // From loop class definition
    if (empty($name)) {
      $name = $this::$config['name'];
    }

    return $name;
  }

  // Query

  function create_query( $query_args = [] ) {

    // WP_Query instance can be passed directly - Handled by base loop's run_query()
    // if (isset($query_args['query'])) return $query_args['query'];

    if (isset($query_args['type'])) {
      $type_name = is_array($query_args['type'])
        ? implode('_', $query_args['type'])
        : $query_args['type'];
      $this->page_query_var = "{$type_name}_page";
    }

    // Top-level parents
    if (isset($query_args['include_children'])) {
      if (!$query_args['include_children']) {
        $query_args['post_parent'] = 0;
      }
      unset($query_args['include_children']); // Not a native WP_Query parameter
    }

    /**
     * Include/exclude
     *
     * Convert ID or slug to set corresponding queries
     */
    foreach ([
      'include' => [
        'id' => 'post__in',
        'slug' => 'post_name__in',
      ],
      'exclude' => [
        'id' => 'post__not_in',
        // Not supported by WP core: Converted to IDs below as "extended query parameters"
        'slug' => 'post_name__not_in',
      ],
    ] as $args_key => $target_keys) {

      $key_for_id = $target_keys['id'];
      $key_for_slug = $target_keys['slug'];

      if ( ! isset($query_args[ $args_key ]) ) continue;

      // Override default parent setting
      unset( $query_args['post_parent'] );

      $values = $query_args[ $args_key ];
      unset($query_args[ $args_key ]);

      if (!is_array($values)) {
        $values = format\multiple_values($values);
      }

      foreach ($values as $value) {

        // Current post
        if ( $value==='current' ) {
          $value = get_the_ID();
        }

        if (is_numeric( $value )) {

          // Post ID

          if (!isset($query_args[ $key_for_id ])) {
            $query_args[ $key_for_id ] = [];
          }

          $query_args[ $key_for_id ] []= $value;

        } else {

          // Post slug

          if (!isset($query_args[ $key_for_slug ])) {
            $query_args[ $key_for_slug ] = [];
          }

          $query_args[ $key_for_slug ] []= $value;
        }
      }
    }

    /**
     * Sticky posts
     * 
     * WP_Query's parameter "ignore_sticky_posts" only works on the
     * home page: https://github.com/WordPress/wordpress-develop/blob/0f28f4cf1a38291664c238b6143fe68931787997/src/wp-includes/class-wp-query.php#L3442-L3443
     * 
     * For improved support, manually control sticky posts behavior.
     */

    // Backward compatiblity
    if ( isset($this->args['ignore_sticky_posts'])) {
      if ($this->args['ignore_sticky_posts']==='false') {
        $query_args['sticky'] = 'true';
      }
      unset($this->args['ignore_sticky_posts']);
    }

    // Disable WP_Query's implementation
    $query_args['ignore_sticky_posts'] = true;

    if ( ! empty( $query_args['sticky'] ) ) {
      switch ( $query_args['sticky'] ) {
        case 'true':
          // Include sticky posts at the top
          $stick_post_ids = get_option( 'sticky_posts' ) ?: [];
          if (!empty($stick_post_ids)) {

            // Get a list of post IDs with all other query parameters applied

            $args = $this->args;
            $args['sticky'] = 'false';

            $post_loop = new PostLoop($args);
            $post_ids = $post_loop->get_total_items();

            $query_args['post__in'] = array_merge(
              $stick_post_ids,
              $post_ids
            );

            // Ensure post order: non-sticky posts are already ordered
            $query_args['orderby'] = 'post__in';
          }
          break;
        case 'false':
          // Exclude sticky posts
          $stick_post_ids = get_option( 'sticky_posts' ) ?: [];
          $query_args['post__not_in'] = isset($query_args['post__not_in'])
            ? array_merge($query_args['post__not_in'], $stick_post_ids)
            : $stick_post_ids
          ;
          break;
        case 'only':
          $stick_post_ids = get_option( 'sticky_posts' ) ?: [];
          $query_args['post__in'] = $stick_post_ids;
          break;
        case 'default':
        default:
          // Include sticky posts but treat them as normal posts, not on top
          break;
      }
      unset( $query_args['sticky'] );
    }

    // If no orderby set in original arguments
    if (!isset($this->args['orderby'])) {

      // Set default orderby for these queries

      if (isset($query_args['post__in'])) {
        $query_args['orderby'] = 'post__in';
      } elseif (isset($query_args['post_name__in'])) {
        $query_args['orderby'] = 'post_name__in';
      }
    }

    /**
     * Extended query parameters
     *
     * For the following queries, convert post/user/category/tag slug to ID, because there are
     * no corresponding query parameters for WP_Query.
     */

    $post_type = $query_args['post_type'];

    $author_query_fields = ['author__in', 'author__not_in'];
    $category_query_fields = ['category__in', 'category__not_in'];
    $tag_query_fields = ['tag__in', 'tag__not_in'];

    foreach ([
      'post_name__not_in' => 'post__not_in',
      'post_parent__in' => '',
      'post_parent__not_in' => '',
      'author__in' => '',
      'author__not_in' => '',
      'category__in' => '',
      'category__not_in' => '',
      'tag__in' => '',
      'tag__not_in' => '',
    ] as $key => $target_key) {

      if (empty($target_key)) $target_key = $key;

      if ( ! isset($query_args[ $key ]) ) continue;

      $is_author_query = in_array($key, $author_query_fields);
      $is_category_query = in_array($key, $category_query_fields);
      $is_tag_query = in_array($key, $tag_query_fields);

      // Clear default that gets only top-level posts
      unset( $query_args['post_parent'] );

      $slugs = $query_args[ $key ];
      unset($query_args[ $key ]);

      if (!isset($query_args[ $target_key ])) {
        $query_args[ $target_key ] = [];
      }

      if (!is_array($slugs)) {
        $slugs = [$slugs];
      }

      foreach ($slugs as $slug) {

        // ID

        if (is_integer($slug) || is_numeric($slug)) {
          $query_args[ $target_key ] []= $slug;
          continue;
        }

        $object = null;

        // Author

        if ( $is_author_query ) {

          if ($slug==='current') {
            $object = wp_get_current_user();
          } else {
            $object = get_user_by('login', $slug);
          }

          if (!empty($object)) {
            $query_args[ $target_key ] []= $object->ID;
          }

          continue;
        }

        // Category

        if ( $is_category_query ) {

          if ($slug==='current') {

            // Array of WP_Term objects
            $categories = get_the_category();

            if (!empty($categories)) {
              foreach ($categories as $category) {
                $query_args[ $target_key ] []= $category->term_id;
              }
            } else {
              // Current post has no categories - Force empty
              $query_args[ $target_key ] []= -1;
            }

          } else {

            // Category slug to ID

            $category = get_category_by_slug( $slug );

            if ($category) {
              $query_args[ $target_key ] []= $category->term_id;
            }
          }

          continue;
        }

        // Tag

        if ( $is_tag_query ) {

          if ($slug==='current') {

            // Array of WP_Term objects
            $tags = get_the_tags();

            if (!empty($tags)) {

              foreach ($tags as $tag) {
                $query_args[ $target_key ] []= $tag->term_id;
              }
            } else {
              // Current post has no tags - Force empty
              $query_args[ $target_key ] []= -1;
            }

          } else {

            // Term slug to ID

            $tag = get_term_by('slug', $slug, 'post_tag');
            if ($tag) {
              $query_args[ $target_key ] []= $tag->term_id;
            }
          }

          continue;
        }

        // Post

        $object = get_post([
          'name' => $slug,
          'post_type' => $post_type,
          'posts_per_page' => 1,
        ]);

        if (!empty($object)) {
          $query_args[ $target_key ] []= $object->ID;
        }
      }
    } // Extended query parameters

    /**
     * Support use of `exclude` and `include` together. By this point,
     * any post slugs have been converted to IDs.
     * 
     * "You cannot combine post__in and post__not_in in the same query."
     * @see https://developer.wordpress.org/reference/classes/wp_query/#post-page-parameters
     */

    if (isset($query_args['post__not_in']) && isset($query_args['post__in'])) {
      $query_args['post__in'] = array_values( // Reindex
        array_diff(
          $query_args['post__in'],
          $query_args['post__not_in'] // Remove
        )
      );

    }

    // Taxonomy

    for ($i=0; $i <= 3; $i++) {

      $postfix = $i > 0 ? "_{$i}" : '';

      $key = 'taxonomy' . $postfix;
      $terms_key = 'terms' . $postfix;
      $compare_key = 'taxonomy_compare' . $postfix;
      $include_child_terms_key = 'child_terms' . $postfix;

      if (!isset($query_args[ $key ])) continue;

      $taxonomy = $query_args[ $key ];
      $terms = isset($query_args[ $terms_key ])
        ? $query_args[ $terms_key ]
        : []
      ;
      if (empty($terms)) {
        /**
         * Alias "term" with single value
         *
         * Using $this->args instead of $query_args because this key is
         * not in query parameters definition.
         */
        $terms_key = 'term' . $postfix;
        $terms = isset($this->args[ $terms_key ])
          ? [ $this->args[ $terms_key ] ]
          : []
        ;
      }

      if ($taxonomy==='tag') {
        
        // Alias
        $taxonomy = 'post_tag';

      } elseif ($taxonomy==='current') {

        // Loop context inside taxonomy term loop or archive

        $context = self::$loop->get_context('taxonomy_term');
        $taxonomy_loop = !empty($context)
          ? $context->get_field('taxonomy')
          : '' // Force empty
        ;
        $taxonomy = !empty($taxonomy_loop)
          ? $taxonomy_loop->get_field('name')
          : ''
        ;
      }

      // Compare - one of 'in' (default), 'not in', 'and', 'exists' and 'not exists'.

      $compare = strtoupper(
        isset($query_args[ $compare_key ])
          ? $query_args[ $compare_key ]
          : 'in'
      );

      // Alias
      if ($compare==='NOT') $compare = 'NOT IN';

      // Include child terms - false by default
      $include_child_terms = isset($query_args[ $include_child_terms_key ]) &&
        $query_args[ $include_child_terms_key ]==='true'
      ;

      // Don't pass to WP_Query
      unset( $query_args[ $key ] );
      unset( $query_args[ $terms_key ] );
      unset( $query_args[ $compare_key ] );
      unset( $query_args[ $include_child_terms_key ] );

      // Separate IDs and slugs

      $value_types = [
        'id' => [],
        'slug' => []
      ];

      foreach ($terms as $value) {
        if (is_integer($value) || is_numeric($value)) {
          $value_types['id'] []= $value;
        } elseif (is_string($value)) {

          if ($value==='current') {

            // Current term inside taxonomy term loop or archive

            $context = self::$loop->get_context('taxonomy_term');

            $value_types['id'] []= !empty($context)
              ? $context->get_field('id')
              : 0 // Force empty
            ;

          } else {
            $value_types['slug'] []= $value;
          }
        }
      }

      foreach ($value_types as $key => $values) {

        if (empty($values)) continue;

        $tax_query = [
          'taxonomy' => $taxonomy,

          /**
           * Taxonomy term by field
           *
           * Possible values are 'term_id', 'name', 'slug' or 'term_taxonomy_id'. Default value is 'term_id'
           */
          'field' => $key==='id' ? 'term_id' : 'slug',

          'terms' => $values,
          'include_children' => $include_child_terms,
          'operator' => $compare,
        ];

        if (!isset($query_args['tax_query'])) {
          $query_args['tax_query'] = [];
        }

        $query_args['tax_query'][] = $tax_query;
      }
    }

    if (isset($query_args['taxonomy_relation'])) {
      // Must be used with multiple taxonomy queries
      if (count($query_args['tax_query']) > 1) {
        $query_args['tax_query']['relation'] = strtoupper(
          $query_args['taxonomy_relation']
        );
      }
      unset($query_args['taxonomy_relation']);
    }

    // Order by: id, author, title, name, type, date, modified, random, comments, relevance, menu

    if (isset($query_args['s']) && !isset($this->args['orderby'])) {

      // Default orderby for search query

      $query_args['orderby'] = 'relevance';

    /**
     * Order by custom field, higher priority than normal "orderby" parameter
     * which has default value "title"
     */

    } elseif (isset($query_args['orderby_field'])) {

      $field = $query_args['orderby_field'];
      unset($query_args['orderby_field']);

      $query_args['meta_key'] = $field;
      $query_args['orderby'] = 'meta_value';

    } elseif (isset($query_args['orderby_field_number'])) {

      /**
       * Order by custom field whose value is number or date in format "yyyymmdd"
       * Otherwise, use sort_field and sort_type=date, supported in BaseLoop
       */

      $field = $query_args['orderby_field_number'];
      unset($query_args['orderby_field_number']);

      $query_args['meta_key'] = $field;
      $query_args['orderby'] = 'meta_value_num';

    } elseif (isset($query_args['orderby'])) {

      $translate = [
        'id' => 'ID',
        'random' => 'rand',
        'menu' => 'menu_order',
        'comments' => 'comment_count'
      ];

      if (isset($translate[ $query_args['orderby'] ])) {
        $query_args['orderby'] = $translate[ $query_args['orderby'] ];
      }

      if (!isset($this->args['order'])) {

        // Default order for some orderby values

        if ($query_args['orderby']==='menu_order') {
          $query_args['order'] = 'DESC'; // Needs to be descending for correct menu order
        }
      }
    }

    if (isset($query_args['order'])) {
      $query_args['order'] = strtoupper( $query_args['order'] ); // Ensure "ASC" or "DESC"
    }

    /**
     * Date query - Published date
     *
     * @see https://developer.wordpress.org/reference/classes/wp_query/#date-parameters
     */

    // Handle custom value "current"
    foreach ([
      'year' => 'year',
      'month' => 'monthnum',
      'day' => 'day'
    ] as $key => $internal_key) {

      $full_key = 'publish_' . $key;

      // Check original arguments
      if (!isset($this->args[ $full_key ])
        || $this->args[ $full_key ]!=='current'
      ) continue;

      $value = 0;

      switch ($key) {
        case 'year': $value = date('Y'); break;
        case 'month': $value = date('m'); break;
        case 'day': $value = date('d'); break;
      }

      $query_args[ $internal_key ] = $this->args[ $full_key ] = $value;
    }

    if (isset($query_args['w'])) {

      if ($query_args['w']==='current') {
        // @see https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
        $query_args['w'] = date('W');
      }

      // Week number - Expected 0 to 53, but for user it's 1 to 54
      $query_args['w']--;

    } elseif (isset($query_args['publish_date']) || isset($query_args['publish_compare'])) {

      // Support published date comparison: "before", "before_inclusive", "after", "after_inclusive"

      $query_args['date_query'] = [];

      if (isset($query_args['publish_date'])) {

        $ymd = explode('-', date('Y-m-d', strtotime( $query_args['publish_date'] )));

        $query_args['date_query']['year'] = $ymd[0];
        $query_args['date_query']['month'] = $ymd[1];
        $query_args['date_query']['day'] = $ymd[2];

        unset($query_args['publish_date']);

      } else {

        // Check these fields
        foreach ([
          'year' => 'year',
          'month' => 'monthnum',
          'day' => 'day'
        ] as $key => $internal_key) {

          $full_key = 'publish_' . $key;

          // Check original arguments
          if (!isset($this->args[ $full_key ])) continue;

          $query_args['date_query'][ $key ] = $this->args[ $full_key ];
          unset($query_args[ $internal_key ]);
        }
      }

      if (!empty($query_args['date_query']) && isset($query_args['publish_compare'])) {

        $compare = $query_args['publish_compare'];

        unset($query_args['publish_compare']);

        switch ($compare) {
          case 'before':
          case 'before_inclusive':
            $query_args['date_query'] = [
              'before' => $query_args['date_query'], // year, month, day
            ];
            if ($compare==='before_inclusive') {
              $query_args['date_query']['inclusive'] = true;
              $query_args['date_query']['compare'] = '<=';
            } else {
              $query_args['date_query']['compare'] = '<';
            }
          break;
          case 'after':
          case 'after_inclusive':
            $query_args['date_query'] = [
              'after' => $query_args['date_query'], // year, month, day
            ];
            if ($compare==='after_inclusive') {
              $query_args['date_query']['inclusive'] = true;
              $query_args['date_query']['compare'] = '>=';
            } else {
              $query_args['date_query']['compare'] = '>';
            }
          break;

          // TODO: '=', '!=', '>', '>=', '<', '<=', 'IN', 'NOT IN', 'BETWEEN', 'NOT BETWEEN'
        }
      }
    }


    // Date field value compare

    if (isset($query_args['custom_date_field']) && isset($query_args['custom_date_field_value'])) {

      $field = $query_args['custom_date_field'];
      $value = $query_args['custom_date_field_value'] === 'current' ? 'today' : $query_args['custom_date_field_value'];

      unset($query_args['custom_date_field']);
      unset($query_args['custom_date_field_value']);

      // Date format of field value

      $date_format = 'Ymd'; // For date-time field, set 'Y-m-d H:i:s'

      if (isset($query_args['custom_date_field_format'])) {

        $date_format = $query_args['custom_date_field_format'];
        unset($query_args['custom_date_field_format']);

        // Alias
        if ($date_format==='timestamp') {
          $date_format = 'U';
        }
      }


      $value = date( $date_format, strtotime($value) );

      $compare = '=';

      if (isset($query_args['custom_date_field_compare'])) {
        $compare = $query_args['custom_date_field_compare'];
        unset($query_args['custom_date_field_compare']);
      }

      /**
       * Default Date/time type based on date format
       * User needs to manually set it if using different format
       */
      $type = $date_format==='Y-m-d H:i:s' ? 'DATETIME' : 'DATE';

      if (isset($query_args['custom_date_field_type'])) {
        $type = $query_args['custom_date_field_type'];
        unset($query_args['custom_date_field_type']);
      }

      // Convert to custom field query

      $query_args['custom_field'] = $field;
      $query_args['custom_field_value'] = $value;
      $query_args['custom_field_compare'] = $compare;
      $query_args['custom_field_type'] = $type;
    }


    /**
     * Custom field value
     */

    for ($i=1; $i <= 3; $i++) {

      $postfix = $i===1 ? '' : '_'.$i;

      if (!isset($query_args['custom_field' . $postfix])) break;
      $field = $query_args['custom_field' . $postfix];

      unset($query_args['custom_field' . $postfix]);

      $compare = '=';

      if (isset($query_args['custom_field_compare' . $postfix])) {

        $compare = $query_args['custom_field_compare' . $postfix];
        unset($query_args['custom_field_compare' . $postfix]);

        switch ($compare) {
          // @see https://developer.wordpress.org/reference/classes/wp_meta_query/#usage
          case 'equal': $compare = '='; break;
          case 'not': $compare = '!='; break;
          case 'before': $compare = '<'; break;
          case 'before_inclusive': $compare = '<='; break;
          case 'after': $compare = '>'; break;
          case 'after_inclusive': $compare = '>='; break;
          case 'exists':
          case 'not exists':
            $compare = strtoupper($compare);
          break;
          case 'in':
          case 'not in':
          case 'between':
          case 'not between':
            $compare = strtoupper($compare);
            $value = format\multiple_values($value);
          break;
        }
      }

      if (!isset($query_args['meta_query'])) {
        $query_args['meta_query'] = [];
      }

      if ( ! isset($query_args['custom_field_value' . $postfix]) ) {

        // Just check that the field is not empty

        if ($compare==='=') $compare = 'EXISTS';
        elseif ($compare==='!=') $compare = 'NOT EXISTS';

        $query_args['meta_query'] []= [
          'key' => $field,
          'compare' => $compare
        ];

        continue;
      }

      $value = $query_args['custom_field_value' . $postfix];
      $type = 'CHAR';

      unset($query_args['custom_field_value' . $postfix]);

      if (isset($query_args['custom_field_type' . $postfix])) {

        $type = strtoupper( $query_args['custom_field_type' . $postfix] );
        unset($query_args['custom_field_type' . $postfix]);

        switch ($type) {
          // @see https://developer.wordpress.org/reference/classes/wp_meta_query/#usage
          case 'string': $compare = 'CHAR'; break;
          case 'number': $compare = 'NUMERIC'; break;
          // date, datetime, decimal, signed, time, unsigned
        }
      }

      $query_args['meta_query'] []= [
        'key' => $field,
        'value' => $value,
        'compare' => $compare,
        'type' => $type,
      ];

    } // End query by custom field

    // WP Grid Builder facet integration
    if (isset($this->args['wp_grid_builder'])) {
      $query_args['wp_grid_builder'] = $this->args['wp_grid_builder'];
    }
    
    /**
     * Custom query parameters
     */
    if (isset($this->args['custom_query'])) {

      $custom_query = $this->args['custom_query'];

      if (is_string($custom_query)) {
        $custom_query = hjson\parse( $custom_query );
      }

      if (is_array($custom_query)) {
        $query_args = array_merge($query_args, $custom_query);
      }
    }

    // if (isset($this->args['debug'])) system\see( $query_args );

    return new \WP_Query( $query_args );
  }

  function get_items_from_query( $query ) {

    // if (isset($this->args['debug'])) system\see( $query );

    $this->items = $query->posts;

    return $this->items;
  }

  // Cursor

  function set_current( $id = false ) {

    if (empty( $id )) return;

    global $wp_query, $post;

    $wp_query->setup_postdata( $id );
    $post = $id instanceof \WP_Post ? $id : get_post( $id );

    if (empty( $post )) {
      $this->current = $post;
    } else {
      $this->current = &$post;
    }

    return $post;
  }

  function reset() {

    parent::reset();

    $this->query->rewind_posts();

    wp_reset_query();

    global $post;
    $post = $this->original_post;
  }

  /**
   * Field
   *
   * Inherited `get_field` method runs a filter for extended fields, then
   * calls `get_item_field` as needed.
   */
  function get_item_field( $item, $field_name, $args = [] ) {
    if (empty($item)) return;
    return self::$loop->get_post_field( $item, $field_name, $args );
  }

  /**
   * Loop type action: get, create, update, delete
   */
  static function action($action, $data) {
    return [
      'error' => false,
      'result' => [],
    ];
  }
};

$loop->register_type( PostLoop::class );
