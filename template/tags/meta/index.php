<?php
/*
The `Meta` tag provides a shortcut for generating SEO meta tags. It is meant to be used with the Tangible Views theme.

For example, the following:

```html
<Meta title><Site title /> | <Field title /></Meta>
```

..will generate:

```html
<title>..</title>
<meta property="og:title" content="..">
<meta name="twitter:title" content=".. ">
```

Meta properties

- title, author, description, image

Meta boilerplate

<title></title>
<meta name="description" content="{content words=50 format=attribute}">
<meta name="author" content="">

<meta property="og:title" content="{field title}">
<meta property="og:description" content="{content words=50 format=attribute}">
<meta property="og:image" content="{field image-url}">
<meta property="og:site_name" content="{site name}" />


Optional:
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="European Travel Destinations ">
<meta name="twitter:description" content=" Offering tour packages for individuals or groups.">
<meta name="twitter:image" content=" http://euro-travel-example.com/thumbnail.jpg">

*/

$html->scheduled_meta_tags = [];

$html->meta_head_done = false;

add_action('wp_head', function() use ( $html ) {

  $html->render_scheduled_meta();

  $html->meta_head_done = true;

}, 1); // Set aside 0 for scheduling meta

$html->render_scheduled_meta = function( $buffer = false ) use ( $html ) {

  $rendered = '';

  // Render gathered meta tags

  $metas = $html->scheduled_meta_tags;

  // Fill in defaults for og: and twitter: properties

  foreach ( [
    'title',
    'description',
    'image',
  ] as $key ) {

    if ( ! isset( $metas[ $key ] )) continue;

    if ( $key === 'title' && ! isset( $metas['twitter:card'] ) ) {
      $metas['twitter:card'] = [
        'content' => 'summary_large_image',
      ];
    }

    if ( ! isset( $metas[ "og:{$key}" ] ) ) {
      $metas[ "og:{$key}" ] = $metas[ $key ];
    }

    if ( ! isset( $metas[ "twitter:{$key}" ] ) ) {
      $metas[ "twitter:{$key}" ] = $metas[ $key ];
    }

    if ( $key === 'title' && ! isset( $metas['og:site_name'] ) ) {
      $metas['og:site_name'] = [
        'content' => $html->get_variable_type( 'site', 'name' ),
      ];
    }
  }

  foreach ( $metas as $key => $atts ) {

    if ( substr( $key, 0, 3 ) === 'og:' ) {

      // og:* properties use "property" instead of "name"

      unset( $atts['name'] );
      $atts = array_merge( [ 'property' => $key ], $atts );

    } elseif ( $key !== 'raw' ) {
      $atts = array_merge( [ 'name' => $key ], $atts );
    }

    // Escape content as HTML attribute

    $content = '';

    if ( isset( $atts['content'] ) ) {
      $content = $atts['content'] = esc_attr( $atts['content'] );
    }

    switch ( $key ) {
      case 'title':
        if ( ! isset( $metas['browser_tab_title'] ) ) {
          $rendered .= $html->render_raw_tag( 'title', [], $content );
        }
          break;
      case 'browser_tab_title':
        // <title> overrides <Meta title>
        $rendered .= $html->render_raw_tag( 'title', [], $content );
          break;
      case 'content_type':
        unset( $atts['name'] );

        $rendered .= $html->render_raw_tag('meta', array_merge([
          'http-equiv' => 'Content-Type',
        ], $atts));

          break;
      case 'image':
        // There's no native equivalent - only og:image, twitter:image

          break;
      case 'raw':
        foreach ( $atts as $each_atts ) {
          if ( isset( $each_atts['content'] ) ) {
            $each_atts['content'] = esc_attr( $each_atts['content'] );
          }

          $rendered .= $html->render_raw_tag( 'meta', $each_atts, [] );
        }
          break;
      default:
        // author, og:*, twitter:*, or unknown

        $rendered .= $html->render_raw_tag( 'meta', $atts );
    }
  }

  // Clear schedule
  $html->scheduled_meta_tags = [];

  // tangible\see($metas, $rendered);

  if ($buffer) return $rendered;

  echo $rendered;
};

$html->schedule_meta = function( $name, $atts = [], $overwrite = true ) use ( $html ) {

  if ( is_array( $name ) ) {
    $atts = $name;
    $name = isset( $atts['name'] ) ? $atts['name'] : null;
  }

  if ( is_string( $atts ) ) {
    $atts = [
      'content' => $atts,
    ];
  }

  if ( empty( $name ) ) {
    if ( ! isset( $html->scheduled_meta_tags['raw'] ) ) {
      $html->scheduled_meta_tags['raw'] = [];
    }

    $html->scheduled_meta_tags['raw'] [] = $atts;
  } elseif (
    ! isset( $html->scheduled_meta_tags[ $name ] )
    || $overwrite
  ) {
    $html->scheduled_meta_tags[ $name ] = $atts;
  }

  if ( $html->meta_head_done ) {
    // Return rendered content to be output, because wp_head already ran
    return $html->render_scheduled_meta( true );
  }
};

// Override default <title> tag
$html->add_open_tag('title', function( $atts, $nodes ) use ( $html ) {

  $atts['content'] = $html->render( $nodes );

  // As <title> for browser tab
  $html->schedule_meta( 'browser_tab_title', $atts );

  // As og:title, twitter:title default
  return $html->schedule_meta( 'title', $atts );
});

$html->meta_tag = function( $atts, $nodes ) use ( $html ) {

  $name = isset( $atts['name'] ) ? $atts['name'] : array_shift( $atts['keys'] );

  if ( empty( $name ) ) {

    // Shortcuts like <Meta title="Title" />

    foreach ( [
      'title',
      'description',
      'image',
      'viewport',
    ] as $key ) {
      if ( ! isset( $atts[ $key ] )) continue;
      $name            = $key;
      $atts['content'] = $atts[ $key ];
      unset( $atts[ $key ] );
      break;
    }
  }

  if ( ! isset( $atts['content'] ) ) {
    $atts['content'] = $html->render( $nodes );
  }

  return $html->schedule_meta( $name, $atts );
};

require_once __DIR__.'/json-ld.php';

return $html->meta_tag;
