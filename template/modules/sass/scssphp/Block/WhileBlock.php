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

namespace Tangible\ScssPhp\Block;

use Tangible\ScssPhp\Block;
use Tangible\ScssPhp\Type;

/**
 * @internal
 */
final class WhileBlock extends Block
{
    /**
     * @var array
     */
    public $cond;

    public function __construct()
    {
        $this->type = Type::T_WHILE;
    }
}
