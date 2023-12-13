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

namespace Tangible\ScssPhp\Ast\Sass\Statement;

use Tangible\ScssPhp\Ast\Sass\Interpolation;
use Tangible\ScssPhp\Ast\Sass\Statement;
use Tangible\ScssPhp\SourceSpan\FileSpan;
use Tangible\ScssPhp\Visitor\StatementVisitor;

/**
 * A `@media` rule.
 *
 * @extends ParentStatement<Statement[]>
 *
 * @internal
 */
final class MediaRule extends ParentStatement
{
    /**
     * @var Interpolation
     * @readonly
     */
    private $query;

    /**
     * @var FileSpan
     * @readonly
     */
    private $span;

    /**
     * @param Statement[] $children
     */
    public function __construct(Interpolation $query, array $children, FileSpan $span)
    {
        $this->query = $query;
        $this->span = $span;
        parent::__construct($children);
    }

    /**
     * The query that determines on which platforms the styles will be in effect.
     *
     * This is only parsed after the interpolation has been resolved.
     */
    public function getQuery(): Interpolation
    {
        return $this->query;
    }

    public function getSpan(): FileSpan
    {
        return $this->span;
    }

    public function accept(StatementVisitor $visitor)
    {
        return $visitor->visitMediaRule($this);
    }

    public function __toString(): string
    {
        return '@media ' . $this->query . ' {' . implode(' ', $this->getChildren()) . '}';
    }
}
