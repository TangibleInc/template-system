# Tangible Loop module

## Example usage

```php
$loop = tangible_loop();

$post_loop = $loop->create_type('post');

// Nothing found
if ( ! $post_loop->has_next() ) return;

// Paginated items - all by default
$ids = $post_loop->get_items();

// All items regardless of pagination
$all_ids = $post_loop->get_all_items();

// Forward cursor to next item
$item = $post_loop->next();

// Get field value
$value = $post_loop->get_field('title');

// Classic WordPress post loop

while( $post_loop->has_next() ) {

  $item = $post_loop->next();
}

// Reset cursor
$post_loop->reset();

// Loop operations

// For each item

$post_loop->each(function($id) {

  // $this is the post loop instance

  $value = $this->get_field('field_name');
});

// Map results into an array

$results = $post_loop->map(function($id) {
  return [
    'id' => $id,
    'title' => $this->get_field('title')
  ];
});

// Reduce results into a value, such as an associative array

$init_state = [
  'ids' => []
  'count' => 0
];

$final_state = $post_loop->reduce(function($state, $id) {
  $state['ids'] []= $id;
  $state['total']++;
  return $state;
}, $init_state);// Pass initital state (optional, defaut is empty array)
```
