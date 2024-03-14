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

use Tangible\ScssPhp\Ast\Css\CssAtRule;
use Tangible\ScssPhp\Ast\Css\CssComment;
use Tangible\ScssPhp\Ast\Css\CssDeclaration;
use Tangible\ScssPhp\Ast\Css\CssImport;
use Tangible\ScssPhp\Ast\Css\CssKeyframeBlock;
use Tangible\ScssPhp\Ast\Css\CssMediaRule;
use Tangible\ScssPhp\Ast\Css\CssStyleRule;
use Tangible\ScssPhp\Ast\Css\CssStylesheet;
use Tangible\ScssPhp\Ast\Css\CssSupportsRule;

/**
 * An interface for visitors that traverse CSS statements.
 *
 * @internal
 *
 * @template T
 * @template-extends ModifiableCssVisitor<T>
 */
interface CssVisitor extends ModifiableCssVisitor
{
    /**
     * @param CssAtRule $node
     *
     * @return T
     */
    public function visitCssAtRule($node);

    /**
     * @param CssComment $node
     *
     * @return T
     */
    public function visitCssComment($node);

    /**
     * @param CssDeclaration $node
     *
     * @return T
     */
    public function visitCssDeclaration($node);

    /**
     * @param CssImport $node
     *
     * @return T
     */
    public function visitCssImport($node);

    /**
     * @param CssKeyframeBlock $node
     *
     * @return T
     */
    public function visitCssKeyframeBlock($node);

    /**
     * @param CssMediaRule $node
     *
     * @return T
     */
    public function visitCssMediaRule($node);

    /**
     * @param CssStyleRule $node
     *
     * @return T
     */
    public function visitCssStyleRule($node);

    /**
     * @param CssStylesheet $node
     *
     * @return T
     */
    public function visitCssStylesheet($node);

    /**
     * @param CssSupportsRule $node
     *
     * @return T
     */
    public function visitCssSupportsRule($node);

}
