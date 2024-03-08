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

namespace Tangible\ScssPhp\Extend;

use Tangible\ScssPhp\Ast\Css\CssMediaQuery;
use Tangible\ScssPhp\Ast\Selector\ComplexSelector;
use Tangible\ScssPhp\Ast\Selector\SimpleSelector;
use Tangible\ScssPhp\SourceSpan\FileSpan;

/**
 * The state of an extension for a given extender.
 *
 * The target of the extension is represented externally, in the map that
 * contains this extender.
 *
 * @internal
 */
class Extension
{
    /**
     * The extender (such as `A` in `A {@extend B}`).
     */
    public readonly Extender $extender;

    /**
     * The selector that's being extended.
     */
    public readonly SimpleSelector $target;

    /**
     * The media query context to which this extension is restricted, or `null`
     * if it can apply within any context.
     *
     * @var list<CssMediaQuery>|null
     */
    public readonly ?array $mediaContext;

    public readonly bool $isOptional;

    public readonly FileSpan $span;

    /**
     * @param list<CssMediaQuery>|null $mediaContext
     */
    public function __construct(ComplexSelector $extender, SimpleSelector $target, FileSpan $span, ?array $mediaContext = null, bool $optional = false)
    {
        $this->extender = Extender::forExtension($extender, $this);
        $this->target = $target;
        $this->mediaContext = $mediaContext;
        $this->isOptional = $optional;
        $this->span = $span;
    }

    public function withExtender(ComplexSelector $newExtender): Extension
    {
        return new Extension($newExtender, $this->target, $this->span, $this->mediaContext, $this->isOptional);
    }
}
