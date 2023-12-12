<?php

/**
 * Thanks to https://github.com/flaushi for his suggestion:
 * https://github.com/doctrine/dbal/issues/2873#issuecomment-534956358
 */
namespace Tangible\Carbon\Doctrine;

use Tangible\Carbon\Carbon;
use Doctrine\DBAL\Types\VarDateTimeType;

class DateTimeType extends VarDateTimeType implements CarbonDoctrineType
{
    /** @use Tangible\CarbonTypeConverter<Carbon> */
    use Tangible\CarbonTypeConverter;
}
