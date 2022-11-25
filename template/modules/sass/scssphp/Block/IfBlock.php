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
final class IfBlock extends Block
{
    /**
     * @var array
     */
    public $cond;

    /**
     * @var array<ElseifBlock|ElseBlock>
     */
    public $cases = [];

    public function __construct()
    {
        $this->type = Type::T_IF;
    }
}
