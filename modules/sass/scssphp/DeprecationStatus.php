<?php

namespace Tangible\ScssPhp;

enum DeprecationStatus
{
    case active;
    case user;
    case future;
    case obsolete;
}
