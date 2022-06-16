# Roadmap

## Goals

Allow building template features:

- [x] Conditional: if user **has/doesn't have tag**

- [x]  Allowing for partial matches (starts with/ends with/contains) could be handy

- [x] Conditional: if user **has/doesn't have permission to access** current post.

- [x] Loop query: show-hide items that user can't access due to any missing/specific tag


## Current

- [x] Get associated tags/fields from a user

  https://wpfusion.com/documentation/advanced-developer-tutorials/wp-fusion-user-class/  

  ```php
  wp_fusion()->user->get_tags( $user_id, $force_update = false );
  wp_fusion()->user->has_tag( $tag, $user_id = false );
  ```

- [x] Check if a user has permission to access current post

  https://wpfusion.com/documentation/functions/user_can_access/

- [x] Extend core **user loop type** to provide fields related to WP Fusion
