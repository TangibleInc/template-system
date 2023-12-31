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

namespace Tangible\ScssPhp\Exception;

/**
 * Parser Exception
 *
 * @author Oleksandr Savchenko <traveltino@gmail.com>
 *
 * @internal
 */
final class ParserException extends \Exception implements SassException
{
    /**
     * @var array|null
     * @phpstan-var array{string, int, int}|null
     */
    private $sourcePosition;

    /**
     * Get source position
     *
     * @phpstan-return array{string, int, int}|null
     */
    public function getSourcePosition(): ?array
    {
        return $this->sourcePosition;
    }

    /**
     * Set source position
     *
     * @param array $sourcePosition
     *
     * @return void
     *
     * @phpstan-param array{string, int, int} $sourcePosition
     */
    public function setSourcePosition(array $sourcePosition): void
    {
        $this->sourcePosition = $sourcePosition;
    }
}
