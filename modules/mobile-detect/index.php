<?php
/**
 * Mobile Detect
 * https://github.com/serbanghita/Mobile-Detect/wiki/Code-examples
 */
namespace tangible;

function mobile_detect() {
  static $detect;
  if ( ! $detect ) {
    if ( ! class_exists( 'Tangible\Mobile_Detect' ) ) {
      require_once __DIR__ . '/Mobile_Detect.php';
    }
    $detect = new \Tangible\Mobile_Detect;
  }
  return $detect;
};

/**
 * Variable type "device"
 */
$html->register_variable_type('device', [
  'set' => function( $name, $atts, $content, &$memory ) {
    // Do nothing
  },
  'get' => function( $name, $atts, &$memory ) {

    $detect = \tangible\mobile_detect();

    $condition = false;

    switch ( $name ) {
      case 'type':
        // Device type
        if ($detect->isMobile()) return 'mobile';
        if ($detect->isTablet()) return 'tablet';
          return 'desktop';
      break;
      case 'agent':
          return $detect->getUserAgent();
      case 'mobile':
            $condition = $detect->isMobile();
          break;
      case 'tablet':
            $condition = $detect->isTablet();
          break;
      case 'desktop':
        $condition = ! $detect->isMobile() && ! $detect->isTablet();
          break;
      default:
        /**
         * Match rule for device/browser/OS
         * For all rule names, see $detect->getMobileDetectionRulesExtended()
         */
        $condition = $detect->is( $name );
          break;
    }

    if ($condition) return 'TRUE';
  },
]);


/**
 * Integrate with If tag
 */
$logic->extend_rules_by_category(
  'mobile',
  [
    [
'name'           => 'device',
      'label'    => 'Device variable type',
      'field_2'  => [ 'type' => 'string' ],
      'operands' => [],
      'values'   => [],
    ],
  ],
  function( $rule, $atts = [] ) use ( $html ) {

    $condition = true;

    $field   = isset( $rule['field'] ) ? $rule['field'] : '';
    $value   = isset( $rule['value'] ) ? $rule['value'] : '';
    $operand = isset( $rule['operand'] ) ? $rule['operand'] : '';

    switch ( $field ) {
      case 'device':
        $current_value = $html->get_variable_type( 'device', $rule['field_2'] );
        $condition     = $html->evaluate_logic_comparison( $operand, $value, $current_value, $atts );
          break;
    }

    return $condition;
  }
);
