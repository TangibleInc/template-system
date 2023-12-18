# Object

Create an object with dynamic properties and methods.

This is here for backward compatibility. The codebase is migrating away from using such dynamic objects, in favor of a new pattern based on feature state and actions under the namespace `tangible`.

Old way with dynamic object:

```php
$result = tangible_template()->render_template_post( $post_id );
$state = tangible_template()->state;
```

New way with namespace:

```php
use tangible\template_system;

$result = template_system\render_template_post( $post_id );
$state = template_system::$state;
```

With a small difference in syntax, it removes the need for a function call to access the feature.
