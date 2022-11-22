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

use Tangible\ScssPhp\Ast\Css\ModifiableCssAtRule;
use Tangible\ScssPhp\Ast\Css\ModifiableCssComment;
use Tangible\ScssPhp\Ast\Css\ModifiableCssDeclaration;
use Tangible\ScssPhp\Ast\Css\ModifiableCssImport;
use Tangible\ScssPhp\Ast\Css\ModifiableCssKeyframeBlock;
use Tangible\ScssPhp\Ast\Css\ModifiableCssMediaRule;
use Tangible\ScssPhp\Ast\Css\ModifiableCssStyleRule;
use Tangible\ScssPhp\Ast\Css\ModifiableCssStylesheet;
use Tangible\ScssPhp\Ast\Css\ModifiableCssSupportsRule;

/**
 * An interface for visitors that traverse CSS statements.
 *
 * @internal
 *
 * @template T
 */
interface ModifiableCssVisitor
{
    /**
     * @param ModifiableCssAtRule $node
     *
     * @return T
     */
    public function visitCssAtRule($node);

    /**
     * @param ModifiableCssComment $node
     *
     * @return T
     */
    public function visitCssComment($node);

    /**
     * @param ModifiableCssDeclaration $node
     *
     * @return T
     */
    public function visitCssDeclaration($node);

    /**
     * @param ModifiableCssImport $node
     *
     * @return T
     */
    public function visitCssImport($node);

    /**
     * @param ModifiableCssKeyframeBlock $node
     *
     * @return T
     */
    public function visitCssKeyframeBlock($node);

    /**
     * @param ModifiableCssMediaRule $node
     *
     * @return T
     */
    public function visitCssMediaRule($node);

    /**
     * @param ModifiableCssStyleRule $node
     *
     * @return T
     */
    public function visitCssStyleRule($node);

    /**
     * @param ModifiableCssStylesheet $node
     *
     * @return T
     */
    public function visitCssStylesheet($node);

    /**
     * @param ModifiableCssSupportsRule $node
     *
     * @return T
     */
    public function visitCssSupportsRule($node);
}
