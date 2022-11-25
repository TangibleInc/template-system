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

namespace Tangible\ScssPhp\Ast\Sass\Expression;

use Tangible\ScssPhp\Ast\Sass\ArgumentInvocation;
use Tangible\ScssPhp\Ast\Sass\CallableInvocation;
use Tangible\ScssPhp\Ast\Sass\Expression;
use Tangible\ScssPhp\Ast\Sass\Interpolation;
use Tangible\ScssPhp\SourceSpan\FileSpan;
use Tangible\ScssPhp\Visitor\ExpressionVisitor;

/**
 * An interpolated function invocation.
 *
 * This is always a plain CSS function.
 *
 * @internal
 */
final class InterpolatedFunctionExpression implements Expression, CallableInvocation
{
    /**
     * The name of the function being invoked.
     *
     * @var Interpolation
     * @readonly
     */
    private $name;

    /**
     * The arguments to pass to the function.
     *
     * @var ArgumentInvocation
     * @readonly
     */
    private $arguments;

    /**
     * @var FileSpan
     * @readonly
     */
    private $span;

    public function __construct(Interpolation $name, ArgumentInvocation $arguments, FileSpan $span)
    {
        $this->span = $span;
        $this->name = $name;
        $this->arguments = $arguments;
    }

    public function getName(): Interpolation
    {
        return $this->name;
    }

    public function getArguments(): ArgumentInvocation
    {
        return $this->arguments;
    }

    public function getSpan(): FileSpan
    {
        return $this->span;
    }

    public function accept(ExpressionVisitor $visitor)
    {
        return $visitor->visitInterpolatedFunctionExpression($this);
    }

    public function __toString(): string
    {
        return $this->name . $this->arguments;
    }
}
