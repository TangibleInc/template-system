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

namespace Tangible\ScssPhp\Importer;

use League\Uri\Contracts\UriInterface;
use Tangible\ScssPhp\Syntax;
use Tangible\ScssPhp\Util\Path;

/**
 * An importer that loads files from a load path on the filesystem.
 */
final class FilesystemImporter extends Importer
{
    /**
     * The path relative to which this importer looks for files.
     */
    private readonly string $loadPath;

    public function __construct(string $loadPath)
    {
        $this->loadPath = Path::absolute($loadPath);
    }

    public function canonicalize(UriInterface $url): ?UriInterface
    {
        if ($url->getScheme() !== 'file' && $url->getScheme() !== null) {
            return null;
        }

        $path = ImportUtil::resolveImportPath(Path::join($this->loadPath, Path::fromUri($url)));

        if ($path === null) {
            return null;
        }

        return Path::toUri(Path::canonicalize($path));
    }

    public function load(UriInterface $url): ?ImporterResult
    {
        $path = Path::fromUri($url);
        $content = file_get_contents($path);

        if ($content === false) {
            throw new \Exception("Could not read file $path");
        }

        return new ImporterResult($content, Syntax::forPath($path), $url);
    }

    public function couldCanonicalize(UriInterface $url, UriInterface $canonicalUrl): bool
    {
        if ($url->getScheme() !== 'file' && $url->getScheme() !== null) {
            return false;
        }

        if ($canonicalUrl->getScheme() !== 'file') {
            return false;
        }

        $basename = basename((string) $url);
        $canonicalBasename = basename((string) $canonicalUrl);

        if (!str_starts_with($basename, '_') && str_starts_with($canonicalBasename, '_')) {
            $canonicalBasename = substr($canonicalBasename, 1);
        }

        return $basename === $canonicalBasename || $basename === Path::withoutExtension($canonicalBasename);
    }

    public function __toString(): string
    {
        return $this->loadPath;
    }
}
