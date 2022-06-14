<?php
/**
 * SCSSPHP
 *
 * @copyright 2012-2018 Leaf Corcoran
 *
 * @license http://opensource.org/licenses/MIT MIT
 *
 * @link http://leafo.github.io/scssphp
 */

namespace Tangible\ScssPhp\Compiler;

/**
 * Compiler environment
 *
 * @author Anthon Pang <anthon.pang@gmail.com>
 */
class Environment
{
    /**
     * @var \Tangible\ScssPhp\Block
     */
    public $block;

    /**
     * @var \Tangible\ScssPhp\Compiler\Environment
     */
    public $parent;

    /**
     * @var array
     */
    public $store;

    /**
     * @var integer
     */
    public $depth;
}
