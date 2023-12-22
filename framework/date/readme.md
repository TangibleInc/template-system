# Date

Examples

```php
// Get interface

$tdate = tangible\date();

// Set language

$tdate->setLocale('fr');

$date = $tdate('3 days ago');

echo $date->ago();                   // => il y a 3 jours
echo $date->format('l j F Y');       // => mardi 7 avril 2020

// Create from date and time

$date = $tdate('2000-01-31');
$date = $tdate->create(2000, 1, 31);
$date = $tdate->create(2000, 1, 31, 12, 0, 0);

// Add/subtract

$yesterday = $tdate->now()->sub('1 day');
$tomorrow  = $tdate->now()->add('1 day');

// Duration

echo $tdate->now()->timespan(
  $tdate('+1000 days')
);
// 2 years, 8 months, 3 weeks, 5 days

// Get/set date attributes

$date->year = 2013;
$date->month = 1;
$date->day = 31;

$date->hour = 12;
$date->minute = 0;
$date->second = 0;
```


## Updating the Carbon library

Steps to update:

- Download latest version of Carbon from: https://github.com/briannesbitt/Carbon/releases
- Run: `composer install --no-dev`

  Workaround to maintain compatibility with PHP 7.4 - The dependency `symfony/translation` version 6 requires PHP 8.1, so we must manually install v5 which is still compatible with both PHP 7 and 8.

    ```
    rm composer.lock
    composer require symfony/translation:5 symfony/translation-contracts:2 --ignore-platform-reqs
    composer install --ignore-platform-reqs --no-dev
    ```

- Copy and replace folders src, vendor, lazy to ./Carbon
- Run script to convert namespace, from this folder: ./namespace
- Edit Carbon/vendor/composer/autoload_static.php, replace:

```php
'C' => 
array (
    'Tangible\\Carbon\\' => 7,
),
```

..with..

```php
'T' => 
array (
    'Tangible\\Carbon\\' => 16,
),
```
