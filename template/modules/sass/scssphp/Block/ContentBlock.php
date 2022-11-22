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
use Tangible\ScssPhp\Compiler\Environment;
use Tangible\ScssPhp\Type;

/**
 * @internal
 */
final class ContentBlock extends Block
{
    /**
     * @var array|null
     */
    public $child;

    /**
     * @var Environment|null
     */
    public $scope;

    public function __construct()
    {
        $this->type = Type::T_INCLUDE;
    }
}
