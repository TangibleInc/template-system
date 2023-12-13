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

namespace Tangible\ScssPhp\Ast\Selector;

use Tangible\ScssPhp\Extend\ExtendUtil;
use Tangible\ScssPhp\Visitor\SelectorVisitor;

/**
 * A type selector.
 *
 * This selects elements whose name equals the given name.
 */
final class TypeSelector extends SimpleSelector
{
    /**
     * The element name being selected.
     *
     * @var QualifiedName
     * @readonly
     */
    private $name;

    public function __construct(QualifiedName $name)
    {
        $this->name = $name;
    }

    public function getName(): QualifiedName
    {
        return $this->name;
    }

    public function getSpecificity(): int
    {
        return 1;
    }

    public function accept(SelectorVisitor $visitor)
    {
        return $visitor->visitTypeSelector($this);
    }

    public function addSuffix(string $suffix): SimpleSelector
    {
        return new TypeSelector(new QualifiedName($this->name->getName() . $suffix, $this->name->getNamespace()));
    }

    public function unify(array $compound): ?array
    {
        $first = $compound[0] ?? null;

        if ($first instanceof UniversalSelector || $first instanceof TypeSelector) {
            $unified = ExtendUtil::unifyUniversalAndElement($this, $first);

            if ($unified === null) {
                return null;
            }

            $compound[0] = $unified;

            return $compound;
        }

        return array_merge([$this], $compound);
    }

    public function isSuperselector(SimpleSelector $other): bool
    {
        return parent::isSuperselector($other) || ($other instanceof TypeSelector && $this->name->getName() === $other->getName()->getName() && ($this->name->getNamespace() === '*' || $this->name->getNamespace() === $other->getName()->getNamespace()));
    }

    public function equals(object $other): bool
    {
        return $other instanceof TypeSelector && $other->name->equals($this->name);
    }
}
