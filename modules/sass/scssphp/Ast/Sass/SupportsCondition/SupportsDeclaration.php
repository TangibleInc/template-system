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

namespace Tangible\ScssPhp\Ast\Sass\SupportsCondition;

use Tangible\ScssPhp\Ast\Sass\Expression;
use Tangible\ScssPhp\Ast\Sass\Expression\StringExpression;
use Tangible\ScssPhp\Ast\Sass\SupportsCondition;
use Tangible\ScssPhp\SourceSpan\FileSpan;
use Tangible\ScssPhp\Util\StringUtil;

/**
 * A condition that selects for browsers where a given declaration is
 * supported.
 *
 * @internal
 */
final class SupportsDeclaration implements SupportsCondition
{
    /**
     * The name of the declaration being tested.
     *
     * @var Expression
     * @readonly
     */
    private $name;

    /**
     * The value of the declaration being tested.
     *
     * @var Expression
     * @readonly
     */
    private $value;

    /**
     * @var FileSpan
     * @readonly
     */
    private $span;

    public function __construct(Expression $name, Expression $value, FileSpan $span)
    {
        $this->name = $name;
        $this->value = $value;
        $this->span = $span;
    }

    public function getName(): Expression
    {
        return $this->name;
    }

    public function getValue(): Expression
    {
        return $this->value;
    }

    public function getSpan(): FileSpan
    {
        return $this->span;
    }

    /**
     * Returns whether this is a CSS Custom Property declaration.
     *
     * Note that this can return `false` for declarations that will ultimately be
     * serialized as custom properties if they aren't *parsed as* custom
     * properties, such as `#{--foo}: ...`.
     *
     * If this is `true`, then `value` will be a {@see StringExpression}.
     */
    public function isCustomProperty(): bool
    {
        return $this->name instanceof StringExpression && !$this->name->hasQuotes() && StringUtil::startsWith($this->name->getText()->getInitialPlain(), '--');
    }

    public function __toString(): string
    {
        return "($this->name: $this->value)";
    }
}
