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
use Tangible\ScssPhp\Ast\Css\CssNode;
use Tangible\ScssPhp\Ast\Css\CssStyleRule;
use Tangible\ScssPhp\Ast\Css\CssStylesheet;
use Tangible\ScssPhp\Ast\Css\CssSupportsRule;
use Tangible\ScssPhp\Util\IterableUtil;

/**
 * A visitor that visits each statement in a CSS AST and returns `true` if all
 * of the individual methods return `true`.
 *
 * Each method returns `false` by default.
 *
 * @template-implements CssVisitor<bool>
 * @internal
 */
abstract class EveryCssVisitor implements CssVisitor
{
    public function visitCssAtRule(CssAtRule $node): bool
    {
        return IterableUtil::every($node->getChildren(), fn (CssNode $child) => $child->accept($this));
    }

    public function visitCssComment(CssComment $node): bool
    {
        return false;
    }

    public function visitCssDeclaration(CssDeclaration $node): bool
    {
        return false;
    }

    public function visitCssImport(CssImport $node): bool
    {
        return false;
    }

    public function visitCssKeyframeBlock(CssKeyframeBlock $node): bool
    {
        return IterableUtil::every($node->getChildren(), fn (CssNode $child) => $child->accept($this));
    }

    public function visitCssMediaRule(CssMediaRule $node): bool
    {
        return IterableUtil::every($node->getChildren(), fn (CssNode $child) => $child->accept($this));
    }

    public function visitCssStyleRule(CssStyleRule $node): bool
    {
        return IterableUtil::every($node->getChildren(), fn (CssNode $child) => $child->accept($this));
    }

    public function visitCssStylesheet(CssStylesheet $node): bool
    {
        return IterableUtil::every($node->getChildren(), fn (CssNode $child) => $child->accept($this));
    }

    public function visitCssSupportsRule(CssSupportsRule $node): bool
    {
        return IterableUtil::every($node->getChildren(), fn (CssNode $child) => $child->accept($this));
    }
}
