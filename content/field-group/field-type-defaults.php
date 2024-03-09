<?php

$html->field_type_defaults = [

  // Basic

  'text'             => [

    // (string) Appears within the input. Defaults to ''
    'placeholder' => '',

    // (string) Appears before the input. Defaults to ''
    'prepend'     => '',

    // (string) Appears after the input. Defaults to ''
    'append'      => '',

    // (string) Restricts the character limit. Defaults to ''
    'maxlength'   => '',

    // (bool) Makes the input readonly. Defaults to 0
    'readonly'    => 0,

    // (bool) Makes the input disabled. Defaults to 0
    'disabled'    => 0,

  ],
  'textarea'         => [

    // (string) Appears within the input. Defaults to ''
    'placeholder' => '',

    // (string) Restricts the character limit. Defaults to ''
    'maxlength'   => '',

    // (int) Restricts the number of rows and height. Defaults to ''
    'rows'        => '',

    // (new_lines) Decides how to render new lines.
    // Choices of 'wpautop' (Automatically add paragraphs), 'br' (Automatically add <br>) or '' (No Formatting)
    'new_lines'   => '',

    // (bool) Makes the input readonly. Defaults to 0
    'readonly'    => 0,

    // (bool) Makes the input disabled. Defaults to 0
    'disabled'    => 0,

  ],
  'number'           => [

    // (string) Appears within the input. Defaults to ''
    'placeholder'   => '',

    // (string) Appears before the input. Defaults to ''
    'prepend'       => '',

    // (string) Appears after the input. Defaults to ''
    'append'        => '',

    // (int) Minimum number value. Defaults to ''
    'min'           => '',

    // (int) Maximum number value. Defaults to ''
    'max'           => '',

    // (int) Step size increments. Defaults to ''
    'step'          => '',

    'default_value' => 0,
  ],
  'email'            => [

    // (string) Appears within the input. Defaults to ''
    'placeholder' => '',

    // (string) Appears before the input. Defaults to ''
    'prepend'     => '',

    // (string) Appears after the input. Defaults to ''
    'append'      => '',

  ],
  'url'              => [

    // (string) Appears within the input. Defaults to ''
    'placeholder' => '',

  ],
  'password'         => [

    // (string) Appears within the input. Defaults to ''
    'placeholder' => '',

    // (string) Appears before the input. Defaults to ''
    'prepend'     => '',

    // (string) Appears after the input. Defaults to ''
    'append'      => '',

  ],

  'wysiwyg'          => [

    // (string) Specify which tabs are available. Defaults to 'all'.
    // Choices of 'all' (Visual & Text), 'visual' (Visual Only) or text (Text Only)
    'tabs'         => 'all',

    // (string) Specify the editor's toolbar. Defaults to 'full'.
    // Choices of 'full' (Full), 'basic' (Basic) or a custom toolbar (https://www.advancedcustomfields.com/resources/customize-the-wysiwyg-toolbars/)
    'toolbar'      => 'full',

    // (bool) Show the media upload button.
    'media_upload' => true,

  ],

  'tangible_message' => [

    // (string) Template for message
    'message' => '',

  ],

  'oembed'           => [

    // (int) Specify the width of the oEmbed element. Can be overridden by CSS
    'width'  => '',

    // (int) Specify the height of the oEmbed element. Can be overridden by CSS
    'height' => '',

  ],

  'date_picker'      => [

    // Value is always saved as Ymd (YYYYMMDD) in the database

    // Format that is displayed when selecting a date
    'display_format' => 'Y-m-d', // 'd/m/Y',

    // Format that is returned when loading the value.
    'return_format'  => 'Y-m-d', // 'd/m/Y',

    // (int) The day to start the week on
    'first_day'      => 1,
  ],

  'date_time_picker' => [
    'display_format' => 'Y-m-d H:i:s', // 'd/m/Y g:i a',
    'return_format'  => 'Y-m-d H:i:s', // 'd/m/Y g:i a',

    // (int) The day to start the week on
    'first_day'      => 1,
  ],

  'time_picker' => [
    'display_format' => 'H:i:s',
    'return_format'  => 'H:i:s',
  ],

  'image'            => [

    // (string) Specify the type of value returned by get_field(). Defaults to 'array'.
    // Choices of 'array' (Image Array), 'url' (Image URL) or 'id' (Image ID)
    'return_format' => 'array',

    // (string) Specify the image size shown when editing. Defaults to 'thumbnail'.
    'preview_size'  => 'thumbnail',

    // (string) Restrict the image library. Defaults to 'all'.
    // Choices of 'all' (All Images) or 'uploadedTo' (Uploaded to post)
    'library'       => 'all',

    // (int) Specify the minimum width in px required when uploading. Defaults to 0
    'min_width'     => 0,

    // (int) Specify the minimum height in px required when uploading. Defaults to 0
    'min_height'    => 0,

    // (int) Specify the minimum filesize in MB required when uploading. Defaults to 0
    // The unit may also be included. eg. '256KB'
    'min_size'      => 0,

    // (int) Specify the maximum width in px allowed when uploading. Defaults to 0
    'max_width'     => 0,

    // (int) Specify the maximum height in px allowed when uploading. Defaults to 0
    'max_height'    => 0,

    // (int) Specify the maximum filesize in MB in px allowed when uploading. Defaults to 0
    // The unit may also be included. eg. '256KB'
    'max_size'      => 0,

    // (string) Comma separated list of file type extensions allowed when uploading. Defaults to ''
    'mime_types'    => '',

  ],
  'file'             => [

    // (string) Specify the type of value returned by get_field(). Defaults to 'array'.
    // Choices of 'array' (File Array), 'url' (File URL) or 'id' (File ID)
    'return_format' => 'array',

    // (string) Specify the file size shown when editing. Defaults to 'thumbnail'.
    'preview_size'  => 'thumbnail',

    // (string) Restrict the file library. Defaults to 'all'.
    // Choices of 'all' (All Files) or 'uploadedTo' (Uploaded to post)
    'library'       => 'all',

    // (int) Specify the minimum filesize in MB required when uploading. Defaults to 0
    // The unit may also be included. eg. '256KB'
    'min_size'      => 0,

    // (int) Specify the maximum filesize in MB in px allowed when uploading. Defaults to 0
    // The unit may also be included. eg. '256KB'
    'max_size'      => 0,

    // (string) Comma separated list of file type extensions allowed when uploading. Defaults to ''
    'mime_types'    => '',

  ],
  'gallery'          => [

    // (int) Specify the minimum attachments required to be selected. Defaults to 0
    'min'          => 0,

    // (int) Specify the maximum attachments allowed to be selected. Defaults to 0
    'max'          => 0,

    // (string) Specify the image size shown when editing. Defaults to 'thumbnail'.
    'preview_size' => 'thumbnail',

    // (string) Restrict the image library. Defaults to 'all'.
    // Choices of 'all' (All Images) or 'uploadedTo' (Uploaded to post)
    'library'      => 'all',

    // (int) Specify the minimum width in px required when uploading. Defaults to 0
    'min_width'    => 0,

    // (int) Specify the minimum height in px required when uploading. Defaults to 0
    'min_height'   => 0,

    // (int) Specify the minimum filesize in MB required when uploading. Defaults to 0
    // The unit may also be included. eg. '256KB'
    'min_size'     => 0,

    // (int) Specify the maximum width in px allowed when uploading. Defaults to 0
    'max_width'    => 0,

    // (int) Specify the maximum height in px allowed when uploading. Defaults to 0
    'max_height'   => 0,

    // (int) Specify the maximum filesize in MB in px allowed when uploading. Defaults to 0
    // The unit may also be included. eg. '256KB'
    'max_size'     => 0,

    // (string) Comma separated list of file type extensions allowed when uploading. Defaults to ''
    'mime_types'   => '',

  ],

  // Choice

  'select'           => [

    // (array) Array of choices where the key ('red') is used as value and the value ('Red') is used as label
    'choices'     => [
      'red' => 'Red',
    ],

    // (bool) Allow a null (blank) value to be selected. Defaults to 0
    'allow_null'  => false,

    // (bool) Allow mulitple choices to be selected. Defaults to 0
    'multiple'    => false,

    // (bool) Use the select2 interfacte. Defaults to 0
    'ui'          => false,

    // (bool) Load choices via AJAX. The ui setting must also be true for this to work. Defaults to 0
    'ajax'        => false,

    // (string) Appears within the select2 input. Defaults to ''
    'placeholder' => '',

  ],
  'checkbox'         => [

    // (array) Array of choices where the key ('red') is used as value and the value ('Red') is used as label
    'choices'       => [
      'red' => 'Red',
    ],

    // (string) Specify the layout of the checkbox inputs. Defaults to 'vertical'.
    // Choices of 'vertical' or 'horizontal'
    'layout'        => 'vertical',

    // (bool) Whether to allow custom options to be added by the user. Default false.
    'allow_custom'  => false,

    // (bool) Whether to allow custom options to be saved to the field choices. Default false.
    'save_custom'   => false,

    // (bool) Adds a "Toggle all" checkbox to the list. Default false.
    'toggle'        => false,

    // (string) Specify how the value is formatted when loaded. Default 'value'.
    // Choices of 'value', 'label' or 'array'
    'return_format' => 'value',

  ],
  'radio'            => [

    // (array) Array of choices where the key ('red') is used as value and the value ('Red') is used as label
    'choices'           => [
      'red' => 'Red',
    ],

    // (bool) Allow a custom choice to be entered via a text input
    'other_choice'      => false,

    // (bool) Allow the custom value to be added to this field's choices. Defaults to 0.
    // Will not work with PHP registered fields, only DB fields
    'save_other_choice' => false,

    // (string) Specify the layout of the checkbox inputs. Defaults to 'vertical'.
    // Choices of 'vertical' or 'horizontal'
    'layout'            => 'vertical',

  ],
  'true_false'       => [

    // (string) Text shown along side the checkbox
    'message' => '',

  ],

  // Relational

  'post_object'      => [

    // (mixed) Specify an array of post types to filter the available choices. Defaults to ''
    'post_type'     => '',

    // (mixed) Specify an array of taxonomies to filter the available choices. Defaults to ''
    'taxonomy'      => '',

    // (bool) Allow a null (blank) value to be selected. Defaults to 0
    'allow_null'    => false,

    // (bool) Allow mulitple choices to be selected. Defaults to 0
    'multiple'      => false,

    // (string) Specify the type of value returned by get_field(). Defaults to 'object'.
    // Choices of 'object' (Post object) or 'id' (Post ID)
    'return_format' => 'object',

  ],
  'page_link'        => [

    // (mixed) Specify an array of post types to filter the available choices. Defaults to ''
    'post_type'  => '',

    // (mixed) Specify an array of taxonomies to filter the available choices. Defaults to ''
    'taxonomy'   => '',

    // (bool) Allow a null (blank) value to be selected. Defaults to 0
    'allow_null' => false,

    // (bool) Allow mulitple choices to be selected. Defaults to 0
    'multiple'   => false,

  ],
  'relationship'     => [

    // (mixed) Specify an array of post types to filter the available choices. Defaults to ''
    'post_type'     => '',

    // (mixed) Specify an array of taxonomies to filter the available choices. Defaults to ''
    'taxonomy'      => '',

    // (array) Specify the available filters used to search for posts.
    // Choices of 'search' (Search input), 'post_type' (Post type select) and 'taxonomy' (Taxonomy select)
    'filters'       => [ 'search', 'post_type', 'taxonomy' ],

    // (array) Specify the visual elements for each post.
    // Choices of 'featured_image' (Featured image icon)
    'elements'      => [],

    // (int) Specify the minimum posts required to be selected. Defaults to 0
    'min'           => 0,

    // (int) Specify the maximum posts allowed to be selected. Defaults to 0
    'max'           => 0,

    // (string) Specify the type of value returned by get_field(). Defaults to 'object'.
    // Choices of 'object' (Post object) or 'id' (Post ID)
    'return_format' => 'object',

  ],
  'taxonomy'         => [

    // (string) Specify the taxonomy to select terms from. Defaults to 'category'
    'taxonomy'        => '',

    // (array) Specify the appearance of the taxonomy field. Defaults to 'checkbox'
    // Choices of 'checkbox' (Checkbox inputs), 'multi_select' (Select field - multiple), 'radio' (Radio inputs) or 'select' (Select field)
    'field_type'      => 'checkbox',

    // (bool) Allow a null (blank) value to be selected. Defaults to 0
    'allow_null'      => false,

    // (bool) Allow selected terms to be saved as relatinoships to the post
    'load_save_terms' => false,

    // (string) Specify the type of value returned by get_field(). Defaults to 'id'.
    // Choices of 'object' (Term object) or 'id' (Term ID)
    'return_format'   => 'id',

    // (bool) Allow new terms to be added via a popup window
    'add_term'        => true,

  ],
  'user'             => [

    // (array) Array of roles to limit the users available for selection
    'role'       => [],

    // (bool) Allow a null (blank) value to be selected. Defaults to 0
    'allow_null' => false,

    // (bool) Allow mulitple choices to be selected. Defaults to 0
    'multiple'   => false,

  ],

  // Nested

  'repeater'         => [
    'layout'       => 'table', // row, block, table
    'button_label' => 'Add New',
    'sub_fields'   => [],
  ],

  'flexible_layout'  => [
    'layout'       => 'block', // row, block, table
    'button_label' => 'Add Row',
    'min'          => '',
    'max'          => '',
    'layouts'      => [],
  ],

];
