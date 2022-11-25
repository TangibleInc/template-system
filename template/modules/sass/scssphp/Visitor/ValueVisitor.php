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

namespace Tangible\ScssPhp\Visitor;

use Tangible\ScssPhp\Value\SassBoolean;
use Tangible\ScssPhp\Value\SassCalculation;
use Tangible\ScssPhp\Value\SassColor;
use Tangible\ScssPhp\Value\SassFunction;
use Tangible\ScssPhp\Value\SassList;
use Tangible\ScssPhp\Value\SassMap;
use Tangible\ScssPhp\Value\SassNumber;
use Tangible\ScssPhp\Value\SassString;

/**
 * An interface for visitors that traverse SassScript $values.
 *
 * @internal
 *
 * @template T
 */
interface ValueVisitor
{
    /**
     * @return T
     */
    public function visitBoolean(SassBoolean $value);

    /**
     * @return T
     */
    public function visitCalculation(SassCalculation $value);

    /**
     * @return T
     */
    public function visitColor(SassColor $value);

    /**
     * @return T
     */
    public function visitFunction(SassFunction $value);

    /**
     * @return T
     */
    public function visitList(SassList $value);

    /**
     * @return T
     */
    public function visitMap(SassMap $value);

    /**
     * @return T
     */
    public function visitNull();

    /**
     * @return T
     */
    public function visitNumber(SassNumber $value);

    /**
     * @return T
     */
    public function visitString(SassString $value);
}
