<?php

/**
 * User tag is a shortcut for current user field
 *
 * `<User id />` is equivalent to:
 *
 * ```html
 * <Loop type=user id=current>
 *   <Field id />
 * </Loop>
 * ```
 * 
 * @see ./field, "loop type field"
 */
$html->user_tag = function( $atts ) use ( $html ) {
  $atts['user'] = array_shift( $atts['keys'] );
  return $html->field_tag( $atts );
};

return $html->user_tag;
