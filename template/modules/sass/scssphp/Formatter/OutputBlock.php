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

namespace Tangible\ScssPhp\Formatter;

/**
 * Output block
 *
 * @author Anthon Pang <anthon.pang@gmail.com>
 */
class OutputBlock
{
    /**
     * @var string
     */
    public $type;

    /**
     * @var integer
     */
    public $depth;

    /**
     * @var array
     */
    public $selectors;

    /**
     * @var array
     */
    public $lines;

    /**
     * @var array
     */
    public $children;

    /**
     * @var \Tangible\ScssPhp\Formatter\OutputBlock
     */
    public $parent;

    /**
     * @var string
     */
    public $sourceName;

    /**
     * @var integer
     */
    public $sourceLine;

    /**
     * @var integer
     */
    public $sourceColumn;
}
