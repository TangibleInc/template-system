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
use Tangible\ScssPhp\Ast\Sass\SassReference;
use Tangible\ScssPhp\SourceSpan\FileSpan;
use Tangible\ScssPhp\Util\SpanUtil;
use Tangible\ScssPhp\Visitor\ExpressionVisitor;

/**
 * A function invocation.
 *
 * This may be a plain CSS function or a Sass function,  but may not include
 * interpolation.
 *
 * @internal
 */
final class FunctionExpression implements Expression, CallableInvocation, SassReference
{
    /**
     * The name of the function being invoked, with underscores left as-is.
     *
     * @var string
     * @readonly
     */
    private $originalName;

    /**
     * The arguments to pass to the function.
     *
     * @var ArgumentInvocation
     * @readonly
     */
    private $arguments;

    /**
     * The namespace of the function being invoked, or `null` if it's invoked
     * without a namespace.
     *
     * @var string|null
     * @readonly
     */
    private $namespace;

    /**
     * @var FileSpan
     * @readonly
     */
    private $span;

    public function __construct(string $originalName, ArgumentInvocation $arguments, FileSpan $span, ?string $namespace = null)
    {
        $this->span = $span;
        $this->originalName = $originalName;
        $this->arguments = $arguments;
        $this->namespace = $namespace;
    }

    /**
     * @return string
     */
    public function getOriginalName(): string
    {
        return $this->originalName;
    }

    /**
     * The name of the function being invoked, with underscores converted to
     * hyphens.
     *
     * If this function is a plain CSS function, use {@see getOriginalName} instead.
     */
    public function getName(): string
    {
        return str_replace('_', '-', $this->originalName);
    }

    public function getArguments(): ArgumentInvocation
    {
        return $this->arguments;
    }

    public function getNamespace(): ?string
    {
        return $this->namespace;
    }

    public function getSpan(): FileSpan
    {
        return $this->span;
    }

    public function getNameSpan(): FileSpan
    {
        if ($this->namespace === null) {
            return SpanUtil::initialIdentifier($this->span);
        }

        return SpanUtil::initialIdentifier(SpanUtil::withoutNamespace($this->span));
    }

    public function getNamespaceSpan(): ?FileSpan
    {
        if ($this->namespace === null) {
            return null;
        }

        return SpanUtil::initialIdentifier($this->span);
    }

    public function accept(ExpressionVisitor $visitor)
    {
        return $visitor->visitFunctionExpression($this);
    }

    public function __toString(): string
    {
        $buffer = '';

        if ($this->namespace !== null) {
            $buffer .= $this->namespace . '.';
        }

        $buffer .= $this->originalName . $this->arguments;

        return $buffer;
    }
}
