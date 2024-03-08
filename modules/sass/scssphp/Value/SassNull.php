<?php

/**
 * SCSSPHP
 *
 * @copyright 2012-2020 Leaf Corcoran
 *
 * @license http://opensource.org/licenses/MIT MIT
 *
 * @link http://scssphp.github.io/scssphp
 */

namespace Tangible\ScssPhp\Value;

use Tangible\ScssPhp\Visitor\ValueVisitor;

/**
 * The SassScript `null` value.
 */
final class SassNull extends Value
{
    private static SassNull $instance;

    public static function create(): SassNull
    {
        return self::$instance ??= new self();
    }

    private function __construct()
    {
    }

    public function isTruthy(): bool
    {
        return false;
    }

    public function isBlank(): bool
    {
        return true;
    }

    public function accept(ValueVisitor $visitor)
    {
        return $visitor->visitNull();
    }

    public function equals(object $other): bool
    {
        return $other instanceof SassNull;
    }

    public function unaryNot(): Value
    {
        return SassBoolean::create(true);
    }
}
