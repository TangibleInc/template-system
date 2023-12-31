<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitb1bab72b1e03b6d835f16700243e8004
{
    public static $files = array (
        '0e6d7bf4a5811bfa5cf40c5ccd6fae6a' => __DIR__ . '/..' . '/symfony/polyfill-mbstring/bootstrap.php',
        'a4a119a56e50fbb293281d9a48007e0e' => __DIR__ . '/..' . '/symfony/polyfill-php80/bootstrap.php',
    );

    public static $prefixLengthsPsr4 = array (
        'S' => 
        array (
            'Tangible\\Symfony\\Polyfill\\Php80\\' => 23,
            'Tangible\\Symfony\\Polyfill\\Mbstring\\' => 26,
            'Tangible\\Symfony\\Contracts\\Translation\\' => 30,
            'Tangible\\Symfony\\Component\\Translation\\' => 30,
        ),
        'T' => 
        array (
            'Tangible\\Carbon\\' => 16,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Tangible\\Symfony\\Polyfill\\Php80\\' => 
        array (
            0 => __DIR__ . '/..' . '/symfony/polyfill-php80',
        ),
        'Tangible\\Symfony\\Polyfill\\Mbstring\\' => 
        array (
            0 => __DIR__ . '/..' . '/symfony/polyfill-mbstring',
        ),
        'Tangible\\Symfony\\Contracts\\Translation\\' => 
        array (
            0 => __DIR__ . '/..' . '/symfony/translation-contracts',
        ),
        'Tangible\\Symfony\\Component\\Translation\\' => 
        array (
            0 => __DIR__ . '/..' . '/symfony/translation',
        ),
        'Tangible\\Carbon\\' => 
        array (
            0 => __DIR__ . '/../..' . '/src/Carbon',
        ),
    );

    public static $classMap = array (
        'Attribute' => __DIR__ . '/..' . '/symfony/polyfill-php80/Resources/stubs/Attribute.php',
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
        'PhpToken' => __DIR__ . '/..' . '/symfony/polyfill-php80/Resources/stubs/PhpToken.php',
        'Stringable' => __DIR__ . '/..' . '/symfony/polyfill-php80/Resources/stubs/Stringable.php',
        'UnhandledMatchError' => __DIR__ . '/..' . '/symfony/polyfill-php80/Resources/stubs/UnhandledMatchError.php',
        'ValueError' => __DIR__ . '/..' . '/symfony/polyfill-php80/Resources/stubs/ValueError.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitb1bab72b1e03b6d835f16700243e8004::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitb1bab72b1e03b6d835f16700243e8004::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInitb1bab72b1e03b6d835f16700243e8004::$classMap;

        }, null, ClassLoader::class);
    }
}
