# Interface module

Consider moving these out of Template System into their own modules, and merge from upstream.

- Select2 development has stalled: https://github.com/select2/select2
  
  - Resolve jQuery Migrate warnings
    - jQuery.isArray is deprecated; use Array.isArray
    - jQuery.trim is deprecated; use String.prototype.trim
