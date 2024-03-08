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
use Tangible\ScssPhp\Ast\Sass\Statement\ExtendRule;
use Tangible\ScssPhp\Ast\Selector\SelectorList;
use Tangible\ScssPhp\Ast\Selector\SimpleSelector;
use Tangible\ScssPhp\Util\Box;

/**
 * Tracks selectors and extensions, and applies the latter to the former.
 *
 * @internal
 */
interface ExtensionStore
{
    public function isEmpty(): bool;

    /**
     * @return SimpleSelector[]
     */
    public function getSimpleSelectors(): array; // TODO check the right representation for this

    /**
     * @param callable(SimpleSelector): bool $callback
     * @return iterable<Extension>
     */
    public function extensionsWhereTarget(callable $callback): iterable;

    /**
     * @param list<CssMediaQuery>|null $mediaContext
     * @return Box<SelectorList>
     */
    public function addSelector(SelectorList $selector, ?array $mediaContext): Box;

    /**
     * @param list<CssMediaQuery>|null $mediaContext
     */
    public function addExtension(SelectorList $extender, SimpleSelector $target, ExtendRule $extend, ?array $mediaContext): void;

    /**
     * @param iterable<ExtensionStore> $extensionStores
     */
    public function addExtensions(iterable $extensionStores): void;

    /**
     * @return array{ExtensionStore, \SplObjectStorage<SelectorList, Box<SelectorList>>}
     */
    public function clone(): array;
}
