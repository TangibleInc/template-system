<?php
use tangible\format;
use tangible\hjson;
use tangible\template_system;

$html->evaluate_core_logic_rule = function($rule, $atts = []) use ($loop, $logic, $html) {

  $condition = true;

  $field   = isset($rule['field']) ? $rule['field'] : '';
  $value   = isset($rule['value']) ? $rule['value'] : '';
  $operand = isset($rule['operand']) ? $rule['operand'] : '';

  $current_loop = $loop->get_current();

  switch ($field) {
    case 'variable':
      $rule['field_2'] = $html->get_variable_type('variable', $rule['field_2']);
      // Fall through

    case 'check':
      $current_value = isset($rule['field_2']) ? $rule['field_2'] : '';
      // Date comparison: Returns true/false or null for unknown operand (pass through)
      $condition = $html->evaluate_date_comparison($value, $current_value, $atts);
      if (is_bool($condition)) return $condition;
      $condition = $html->evaluate_logic_comparison($operand, $value, $current_value, $atts);
    break;
    case 'logic':

      $current_value = isset($rule['field_2']) ? $rule['field_2'] : '';

      $logic = template_system\get_logic_by_name($current_value);
      if ($logic!==false) {
        $condition = template_system\evaluate_logic_by_name($current_value, function($rule) {
          return template_system::$html->if($rule);
        });
      } else {
        // Backward compatibility with <Set logic>
        $condition = !empty(
          $html->get_logic_variable($current_value)
        );
      }

    break;
    case 'query':
      $current_value = isset($rule['field_2']) ? $rule['field_2'] : '';
      $condition = !empty(
        $html->get_query_variable($current_value)
      );
    break;
    case 'list':
      $current_value = isset($rule['field_2']) ? $rule['field_2'] : '';
      if (empty($current_value)) {
        // Pass through
      } elseif ($current_value[0]==='[') {
        // JSON
        try {
          $current_value = hjson\parse($current_value);
        } catch (\Throwable $th) {
          $current_value = [];
        }
      } else {
        // List variable
        $current_value = $html->get_variable_type('list', $current_value);
      }

      $condition = $html->evaluate_logic_comparison($operand, $value, $current_value, $atts);
    break;

    // Loop state

    case 'first':
      $current_value = $current_loop->index + 1;
      $condition = $current_value === 1;
    break;
    case 'last':
      $current_value = $current_loop->index + 1;
      $total = $current_loop->get_items_count();
      $condition = $current_value === $total;
    break;
    case 'count':
      $current_value = $current_loop->index + 1;
      $condition = $html->evaluate_logic_comparison($operand, $value, $current_value);
    break;
    case 'total':
      $current_value = $current_loop->get_items_count();
      $condition = $html->evaluate_logic_comparison($operand, $value, $current_value);
    break;
    case 'previous_total':
      $previous_loop = $loop->get_previous();
      $current_value = !empty($previous_loop)
        ? $previous_loop->get_items_count()
        : 0
      ;
      $condition = $html->evaluate_logic_comparison($operand, $value, $current_value);
    break;

    // Field

    case 'field':

      $field_name = isset($rule['field_2']) ? $rule['field_2'] : '';
      $current_value = $loop->get_field($field_name);

      // Date comparison: Returns true/false or null for unknown operand (pass through)
      $condition = $html->evaluate_date_comparison($value, $current_value, $atts);
      if (is_bool($condition)) return $condition;
      $condition = $html->evaluate_logic_comparison($operand, $value, $current_value);
    break;

    // User

    case 'user':
      $current_value = $loop->get_user_field('name');
      $condition = !empty($current_value);
      if ($operand==='not_exists') $condition = !$condition;
    break;
    case 'user_field':
      $field_name = isset($rule['field_2']) ? $rule['field_2'] : '';
      $current_value = $loop->get_user_field($field_name);
      $condition = $html->evaluate_logic_comparison($operand, $value, $current_value);
    break;
    case 'user_role':
      $roles = $loop->get_user_field('roles');
      if (empty($roles)) $roles = [];

      // Syntax: If user_role=administrator
      if (!empty($rule['field_2'])) $value = $rule['field_2'];
      
      if (empty($operand)) $operand = 'includes';
      if ($operand==='excludes') $operand = 'not_includes'; // Backward compatibility

      // Multiple values
      if (is_string($value)) {
        if (strpos($value, ',')!==false) {
          $value = format\multiple_values($value);
        } elseif ($value==='admin') {
          $value = 'administrator';
        }
      }
      if (is_array($value)) {
        foreach ($value as $key => $val) {
          if ($val==='admin') $val = 'administrator';
          $value[$key] = $val;
        }
      }

      // Support all common comparison operators
      $condition = $html->evaluate_core_logic_rule([
        'field' => 'check',
        'field_2' => $roles,
        'operand' => $operand,
        'value' => $value,
      ], $atts);

// tangible\see($rule, 'check', $roles, $operand, $value, '===', $condition);
    break;

    // Route

    case 'route':
      $current_value = $html->get_route();
      if (!empty($rule['field_2'])
        && (empty($operand) || $operand==='exists')
      ) {
        $pattern = ltrim($rule['field_2'], '/');
        $condition = $html->route_matches($pattern, $current_value);
      } else {
        $condition = $html->evaluate_logic_comparison($operand, $value, $current_value);
      }
    break;

    // Main query conditions - https://developer.wordpress.org/themes/basics/conditional-tags/

    case 'archive':

      // category, tag, taxonomy, post (default), author, and date
      $archive_type = isset($rule['field_2']) ? $rule['field_2'] : 'post';

      switch ($archive_type) {

        // https://developer.wordpress.org/reference/functions/is_category/
        case 'category':

          $categories = isset($atts['category'])
            ? format\multiple_values($atts['category'])
            : []
          ;

          if (empty($categories)) $categories = ''; // Any

          $condition = is_category( $categories );
        break;

        // https://developer.wordpress.org/reference/functions/is_tag/
        case 'tag':

          $tags = isset($atts['tag'])
            ? format\multiple_values($atts['tag'])
            : []
          ;

          if (empty($tags)) $tags = ''; // Any

          $condition = is_tag( $tags );
        break;

        // https://developer.wordpress.org/reference/functions/is_tax/
        case 'taxonomy':

          $taxonomies = isset($atts['taxonomy'])
            ? format\multiple_values($atts['taxonomy'])
            : []
          ;

          if (empty($taxonomies)) $taxonomies = ''; // Any

          $condition = is_tax( $taxonomies );
        break;

        // https://developer.wordpress.org/reference/functions/is_author
        case 'author':

          $authors = isset($atts['author'])
            ? format\multiple_values($atts['author'])
            : []
          ;

          if (empty($authors)) $authors = ''; // Any

          $condition = is_author( $authors );
        break;

        // https://developer.wordpress.org/reference/functions/is_date
        case 'date':

          $condition = is_date();
        break;

        // https://developer.wordpress.org/reference/functions/is_post_type_archive
        case 'post':
        default:

          $types = isset($atts['type'])
            ? format\multiple_values($atts['type'])
            : []
          ;

          if (empty($types)) {
            $types = ''; // Any
          } else {

            // Convert loop types that alias post type name
            foreach ($types as $index => $type) {
              $types[ $index ] = $loop->get_post_type( $type );
            }
          }

          $condition = is_post_type_archive( $types );
          break;
      }
    break;

    // https://developer.wordpress.org/reference/functions/is_singular/
    case 'singular':

      $types = isset($atts['type'])
        ? format\multiple_values($atts['type'])
        : []
      ;

      if (empty($types)) {
        $types = ''; // Any
      } else {

        // Convert loop types that alias post type name
        foreach ($types as $index => $type) {
          $types[ $index ] = $loop->get_post_type( $type );
        }
      }

      $condition = is_singular( $types );
    break;

    case 'file':
      $file = isset($rule['field_2']) ? $rule['field_2'] : '';
      $condition = !empty($file) && file_exists($file);
    break;
  }

  return $condition;
};
